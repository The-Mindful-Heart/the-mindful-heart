export default function SectionHeading({ label, title, description, className = "" }) {
  if (!label && !title && !description) return null;

  return (
    <div className={`section-shell mb-4 ${className}`}>
      {label ? (
        <p className="section-label">{label}</p>
      ) : null}
      {title ? (
        <h2 className="section-title mt-3 font-heading text-2xl text-slate-900 sm:text-3xl md:text-4xl">{title}</h2>
      ) : null}
      {description ? (
        <p className="section-description mt-3 max-w-2xl text-base leading-8 text-slate-700">{description}</p>
      ) : null}
    </div>
  );
}