import SectionHeading from "../components/SectionHeading";
import BookingForm from "../components/BookingForm";
import { useSiteData } from "../context/SiteDataContext";

export default function BookPage() {
  const { siteData } = useSiteData();
  const booking = siteData?.booking ?? {};

  return (
    <section className="bg-brand-rose/10 pb-20">
      <SectionHeading
        label="Booking"
        title={booking.title ?? "Book an Appointment"}
        description={booking.description}
      />
      <div className="section-shell">
        <BookingForm booking={booking} />
      </div>
    </section>
  );
}