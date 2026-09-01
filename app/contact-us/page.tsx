import type { Metadata } from "next"
import Link from "next/link"
import { MessageCircle, Phone, Mail, Clock } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import { breadcrumbSchema, faqSchema } from "@/lib/schema"
import { siteConfig, whatsappUrl, callUrl } from "@/lib/site-config"
import { getAllStays } from "@/lib/stays"
import { EnquiryForm } from "@/components/contact/EnquiryForm"

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Get in Touch",
  description:
    "Get in touch with Goa Beach Stays for enquiries on villas, resorts and beach stays across North & South Goa. WhatsApp, call, or send us a message.",
  path: "/contact-us",
})

const CONTACT_FAQS = [
  {
    question: "Do you have a physical office in Goa?",
    answer:
      "We operate as a property brokerage connecting travellers directly with verified villas and resorts across Goa, so most enquiries are handled over WhatsApp and call for the fastest response. We can arrange an in-person meeting near your property of interest if needed.",
  },
  {
    question: "How quickly do you respond to enquiries?",
    answer:
      "We typically reply within 30 minutes during operating hours (8 AM – 10 PM IST), and often much sooner on WhatsApp.",
  },
  {
    question: "Can I visit a property before booking?",
    answer:
      "Yes, property visits can be arranged for select stays subject to availability — just mention this in your enquiry and we'll coordinate a time with the property caretaker.",
  },
  {
    question: "What is your booking process?",
    answer:
      "Share your dates, guest count and preferred property type with us, we'll confirm availability and pricing, and once you're happy we'll guide you through payment directly with the property to lock in your stay.",
  },
]

export default function ContactUsPage() {
  const properties = getAllStays().map((s) => ({ name: s.name, slug: s.slug }))

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact-us" },
  ])
  const faqJsonLd = faqSchema(CONTACT_FAQS)

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-accent hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-foreground">
            Contact Us
          </li>
        </ol>
      </nav>

      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">
          Get in Touch — We&apos;ll Find You the Perfect Goa Stay
        </h1>
        <p className="mt-3 text-muted-foreground">
          Whether it&apos;s a beachfront villa or a family resort, our team replies fast and helps you book with
          confidence.
        </p>
      </header>

      {/* Contact option cards */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        
        <a  href={whatsappUrl("Hi! I'd like to enquire about a stay in Goa.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-8 text-center transition-transform hover:scale-[1.02]"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-accent/10">
            <MessageCircle className="size-6 text-accent" aria-hidden="true" />
          </span>
          <span className="mt-4 font-heading text-lg font-semibold text-foreground">WhatsApp</span>
          <span className="mt-1 text-sm text-muted-foreground">Fastest response</span>
          <span className="mt-4 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground">
            Chat Now
          </span>
        </a>

        
        <a  href={callUrl()}
          className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-8 text-center transition-transform hover:scale-[1.02]"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Phone className="size-6 text-primary" aria-hidden="true" />
          </span>
          <span className="mt-4 font-heading text-lg font-semibold text-foreground">Call Us</span>
          <span className="mt-1 text-sm text-muted-foreground">{siteConfig.contact.callNumber}</span>
          <span className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
            Call Now
          </span>
        </a>

        
        <a  href={`mailto:${siteConfig.contact.email}`}
          className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-8 text-center transition-transform hover:scale-[1.02]"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Mail className="size-6 text-foreground" aria-hidden="true" />
          </span>
          <span className="mt-4 font-heading text-lg font-semibold text-foreground">Email Us</span>
          <span className="mt-1 truncate text-sm text-muted-foreground">{siteConfig.contact.email}</span>
          <span className="mt-4 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background">
            Send Email
          </span>
        </a>
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Clock className="size-4" aria-hidden="true" />
        {siteConfig.contact.operatingHours}
      </p>

      {/* Enquiry form */}
      <section className="mt-14 rounded-2xl border border-border bg-card p-6 md:p-10">
        <h2 className="font-heading text-2xl font-semibold text-foreground">Send Us an Enquiry</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Fill in a few details and we&apos;ll open WhatsApp with your enquiry ready to send.
        </p>
        <div className="mt-6">
          <EnquiryForm properties={properties} />
        </div>
      </section>

      {/* Map */}
      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold text-foreground">Where We Operate</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Goa Beach Stays service area map"
            src="https://www.google.com/maps?q=Goa,India&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold text-foreground">Frequently Asked Questions</h2>
        <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
          {CONTACT_FAQS.map((faq) => (
            <details key={faq.question} className="group px-6 py-4">
              <summary className="cursor-pointer list-none font-medium text-foreground marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-accent transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  )
}