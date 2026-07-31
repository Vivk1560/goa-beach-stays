import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for Goa Beach Stays. Read our booking process, cancellation terms, and guest responsibilities before enquiring about a stay.",
  path: "/terms-of-service",
  noIndex: true,
})

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-foreground">
        <p>
          Welcome to <strong>Goa Beach Stays</strong>, operated by <strong>{siteConfig.ownerName}</strong>. By
          accessing this website or making a stay enquiry, you agree to be bound by these Terms of Service. Please
          read them carefully.
        </p>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading text-xl font-semibold text-foreground">1. About Goa Beach Stays</h2>
          <p className="mt-2">
            Goa Beach Stays is an independent property broker/agent — <strong>we are not the owner of the villas,
            resorts, or cottages listed on this website</strong>. We facilitate enquiries and bookings on behalf of
            property owners across Goa. This site does not offer instant or direct online bookings; every stay is
            confirmed through a personal enquiry via WhatsApp, call, or email.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">2. Booking and Enquiries</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>All bookings are subject to property availability and confirmation by our team</li>
            <li>A booking is only confirmed once you receive explicit written confirmation from us</li>
            <li>We reserve the right to decline any enquiry at our discretion</li>
            <li>Guest details provided during enquiry must be accurate and complete</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">3. Payment Terms</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Payment terms, advance amounts, and due dates are communicated at the time of booking confirmation</li>
            <li>An unconfirmed booking may be cancelled if payment is not received within the agreed timeframe</li>
            <li>Pricing shown on the website is indicative and may vary seasonally; the agreed price at confirmation will be honored</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">4. Cancellation Policy</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Cancellation terms vary by property and will be communicated at the time of booking</li>
            <li>Cancellations must be communicated in writing via WhatsApp or email</li>
            <li>Refunds, if applicable, are processed within 7–14 business days</li>
            <li>No-shows or late cancellations may result in forfeiture of the advance payment</li>
            <li>We are not liable for cancellations due to natural disasters, government restrictions, or other force majeure events</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">5. Check-In and Check-Out</h2>
          <p className="mt-2">
            Standard check-in is 12:00 PM and check-out is 11:00 AM unless otherwise agreed with the property owner.
            Early check-in or late check-out may be available subject to availability and may incur additional
            charges. Guests must present valid government-issued photo ID at check-in.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">6. Guest Responsibilities</h2>
          <p className="mt-2">As a guest, you agree to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Treat the property and its contents with care and respect</li>
            <li>Not exceed the maximum occupancy stated for the property</li>
            <li>Not conduct any illegal activities on the premises</li>
            <li>Keep noise levels reasonable, especially between 10:00 PM and 8:00 AM</li>
            <li>Report any damage or issues to the caretaker or our team immediately</li>
            <li>Leave the property in a reasonably clean condition at check-out</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">7. Damage and Liability</h2>
          <p className="mt-2">
            Guests are financially responsible for any damage caused to the property, furniture, or equipment during
            their stay. As a broker, Goa Beach Stays is not liable for loss, theft, injury, or accident occurring
            during your stay — such matters rest with the property owner. We strongly recommend guests obtain travel
            insurance. Use of amenities such as pools and outdoor areas is at the guest&rsquo;s own risk.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">8. Website Use</h2>
          <p className="mt-2">
            All content on this website — including text, images, and property descriptions — is the property of
            Goa Beach Stays or its listed property owners and may not be reproduced without permission. Images and
            descriptions are provided for informational purposes; actual property appearance may vary slightly. We
            do not guarantee the website will always be available or error-free.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">9. Governing Law</h2>
          <p className="mt-2">
            These Terms of Service are governed by the laws of India. Any disputes arising from these terms or your
            use of our services shall be subject to the jurisdiction of courts in Goa, India.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">10. Changes to These Terms</h2>
          <p className="mt-2">
            We reserve the right to update these Terms of Service at any time. Changes will be posted on this page
            with an updated date. Continued use of this website after changes constitutes acceptance of the updated
            terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">11. Contact Us</h2>
          <ul className="mt-2 space-y-1">
            <li>
              <strong>Business:</strong> {siteConfig.name}
            </li>
            <li>
              <strong>Owner:</strong> {siteConfig.ownerName}
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-accent hover:underline">
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${siteConfig.contact.callNumber}`} className="text-accent hover:underline">
                {siteConfig.contact.callNumber}
              </a>
            </li>
            <li>
              <strong>Location:</strong> Goa, India
            </li>
          </ul>
        </section>
      </div>

      <Link href="/contact-us" className="mt-10 inline-block text-sm font-medium text-accent hover:underline">
        ← Have a question? Contact us
      </Link>
    </main>
  )
}