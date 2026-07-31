import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Goa Beach Stays. Learn how we collect, use, and protect your personal information when you enquire about a stay in Goa.",
  path: "/privacy-policy",
  noIndex: true,
})

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-foreground">
        <p>
          This Privacy Policy describes how <strong>Goa Beach Stays</strong>, operated by{" "}
          <strong>{siteConfig.ownerName}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;),
          collects, uses, and protects the information you provide when you visit{" "}
          <span className="font-medium">{siteConfig.domain.replace("https://", "")}</span> or contact us for a
          villa or resort enquiry in Goa.
        </p>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">1. Information We Collect</h2>
          <p className="mt-2">When you interact with our website or contact us for a stay enquiry, we may collect:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Your name and contact details (phone number, WhatsApp number, email)</li>
            <li>Preferred travel dates, group size, and property preferences submitted via our enquiry form</li>
            <li>Any additional information you voluntarily share via WhatsApp, call, or email</li>
            <li>Basic website usage data collected automatically, such as page views and general traffic patterns</li>
          </ul>
          <p className="mt-2">
            We do <strong>not</strong> collect payment information directly through the website — all payments are
            arranged with the respective property owner or handled offline once a booking is confirmed.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
          <p className="mt-2">The information we collect is used solely to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Respond to your enquiry and share availability, pricing, and property details</li>
            <li>Coordinate your booking with the relevant property owner or caretaker</li>
            <li>Provide support before, during, and after your stay</li>
            <li>Improve our website and listings based on general usage patterns</li>
          </ul>
          <p className="mt-2">
            We will never use your personal information for unsolicited marketing or sell it to third parties for
            advertising purposes.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">3. WhatsApp Communication</h2>
          <p className="mt-2">
            WhatsApp is our primary channel for enquiries. When you message us on WhatsApp, your contact details and
            messages are visible to our team for the purpose of handling your enquiry. WhatsApp&rsquo;s own privacy
            policy governs how messages are secured on their platform — we recommend reviewing{" "}
            
            <a  href="https://www.whatsapp.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              WhatsApp&rsquo;s Privacy Policy
            </a>{" "}
            for more information.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">4. Cookies and Analytics</h2>
          <p className="mt-2">
            Our website uses privacy-friendly analytics to understand aggregate traffic and improve performance.
            This data does not personally identify you. We do not use third-party advertising trackers such as
            Facebook Pixel. You may disable cookies through your browser settings at any time without affecting your
            ability to browse the website.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">5. Data Sharing and Third Parties</h2>
          <p className="mt-2">
            We do not sell, trade, or rent your personal information. As a booking broker, we may share limited
            details in these circumstances only:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>With the property owner or caretaker of the villa/resort you enquire about, strictly to arrange your stay</li>
            <li>With our website hosting and analytics infrastructure, which processes basic traffic data</li>
            <li>When required by law or legal process</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">6. Data Security</h2>
          <p className="mt-2">
            We take reasonable steps to protect the information you share with us. Our website is served over HTTPS.
            However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee
            absolute security.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">7. Your Rights</h2>
          <p className="mt-2">You have the right to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Request access to the personal information we hold about you</li>
            <li>Request correction of any inaccurate information</li>
            <li>Request deletion of your personal data from our records</li>
            <li>Opt out of any future communications from us</li>
          </ul>
          <p className="mt-2">To exercise any of these rights, please contact us using the details below.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">8. Children&rsquo;s Privacy</h2>
          <p className="mt-2">
            Our website and services are not directed at children under the age of 13. We do not knowingly collect
            personal information from children. If you believe a child has provided us with personal information,
            please contact us and we will delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">9. Changes to This Policy</h2>
          <p className="mt-2">
            We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an
            updated &ldquo;Last updated&rdquo; date.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">10. Contact Us</h2>
          <p className="mt-2">If you have any questions about this Privacy Policy, please contact us:</p>
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