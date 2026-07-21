import { useState, useEffect } from "react";

export default function BioCard({ member }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsModalOpen(true);
    }
  };

  // Update header height for positioning
  useEffect(() => {
    const updateHeaderHeight = () => {
      const height = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
      setHeaderHeight(height);
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Compact Team Member Card */}
      <article 
        className="soft-panel flex flex-col items-center p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View profile of ${member.name}`}
      >
        {/* Profile image - cropped circle */}
        <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-brand-rose/20 shadow-xl shadow-slate-900/20 sm:h-36 sm:w-36">
          <img
            src={member.image}
            alt={`${member.name} portrait`}
            className="h-full w-full object-cover object-top"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        </div>

        <div className="mt-4 text-center">
          <h3 className="font-heading text-xl text-slate-900 sm:text-2xl">{member.name}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{member.role}</p>
        </div>
      </article>

      {/* Modal for Detailed Profile */}
      {isModalOpen && (
        <div 
          className="fixed inset-x-0 z-[9999] flex justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in"
          style={{ top: `${headerHeight}px`, height: `calc(100vh - ${headerHeight}px)` }}
          onClick={handleCloseModal}
        >
          <div 
            className="soft-panel max-w-2xl w-full max-h-full overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Close profile"
            >
              <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row gap-6 p-6 sm:p-8">
              {/* Profile image */}
              <div className="relative flex-shrink-0">
                <div className="h-48 w-48 sm:h-56 sm:w-56 overflow-hidden rounded-full border-4 border-white bg-brand-rose/20 shadow-xl shadow-slate-900/20">
                  <img
                    src={member.image}
                    alt={`${member.name} portrait`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={() => setImgError(true)}
                  />
                </div>
              </div>

              {/* Profile details */}
              <div className="flex-1 pt-2 md:pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{member.role}</p>
                <h2 className="mt-2 font-heading text-2xl text-slate-900 sm:text-3xl">{member.name}</h2>
                <div className="mt-2 h-0.5 w-12 rounded-full bg-brand-rose/40" />
                <p className="mt-3 text-sm leading-relaxed text-slate-600 font-medium">{member.focus}</p>
                
                <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
                  {member.bio.map((paragraph, i) => (
                    <p key={`${member.name}-bio-${i}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}