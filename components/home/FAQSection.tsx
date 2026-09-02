import { FAQAccordion } from '@/components/stays/FAQAccordion'
import type { StayFAQ } from '@/types/stay'

export const HOMEPAGE_FAQS: StayFAQ[] = [
  {
    question: 'What types of stays does Goa Beach Stays offer?',
    answer:
      "We list villas, resorts and cottages across North and South Goa, from private-pool villas built for a group to smaller cottages suited to a couple's trip. You can browse everything by type or by region from the menu above.",
  },
  {
    question: 'How is North Goa different from South Goa?',
    answer:
      'North Goa is where Goa parties \u2014 busier beaches, beach shacks and nightlife around Anjuna, Baga and Calangute. South Goa is quieter and more spread out, with longer, emptier beaches around places like Cavelossim and Benaulim, better suited to a relaxed retreat than a lively night out.',
  },
  {
    question: "What's the best time of year to visit Goa?",
    answer:
      'December through February is peak season, with the most reliable weather \u2014 warm days, cool evenings and minimal rain. October\u2013November and March\u2013April are quieter shoulder months with fewer crowds, and June\u2013September brings the monsoon, which some travellers actively seek out for the lush, green landscape.',
  },
  {
    question: 'Are villas in Goa suitable for families and multi-generational trips?',
    answer:
      "Yes \u2014 many of our villas have several bedrooms and shared common spaces, which tends to work better for a family group than splitting everyone across separate resort rooms. Tell us your group size and we'll point you to villas with an appropriate bedroom and bathroom count.",
  },
  {
    question: 'Do you offer private pool villas in Goa?',
    answer:
      "Yes, private pool villas are one of our most popular categories \u2014 the pool is reserved exclusively for your booking, not shared with other guests. Availability for the December\u2013January window tends to book out first, so an early enquiry helps.",
  },
  {
    question: 'How do I book a stay through Goa Beach Stays?',
    answer:
      "Share your dates, guest count and the type of property you're after over WhatsApp or our contact form. We'll confirm availability and pricing, then guide you through payment directly with the property to lock in your stay.",
  },
  {
    question: 'Are your properties personally verified?',
    answer:
      "Yes. Every villa, resort and cottage on the site is personally checked before we list it, rather than pulled from an unverified database, so what you see is a fair reflection of what you'll actually get.",
  },
  {
    question: 'Can you arrange corporate offsites or larger group stays?',
    answer:
      "Yes \u2014 we work with larger villas and resort-style properties that can comfortably host teams of 15\u201330+, and can arrange proper invoicing for corporate bookings. Let us know your group size and requirements when you enquire.",
  },
  {
    question: 'Are beachfront stays available?',
    answer:
      'Yes. We only label a property \u201cbeachfront\u201d once we\u2019ve personally confirmed there\u2019s direct access onto the sand, rather than relying on a listing description \u2014 genuinely beachfront stays are limited, so it\u2019s worth enquiring early for your dates.',
  },
  {
    question: 'Is Goa a good fit for a couple\u2019s trip or honeymoon?',
    answer:
      'Very much so. Smaller villas and cottages with a private pool and a quieter setting \u2014 areas like Agonda, Mandrem or South Goa generally \u2014 tend to suit couples better than a large group villa built for a bigger party.',
  },
  {
    question: "How far are your properties from Goa's airports?",
    answer:
      'Goa has two airports \u2014 Manohar International Airport (Mopa) in the north and Dabolim in the south \u2014 and which one is more convenient depends on where your stay is located. We\u2019ll confirm the realistic transfer time for your specific property when you enquire, since it varies across North and South Goa.',
  },
  {
    question: 'What is peak season, and does it affect pricing or availability?',
    answer:
      'Peak season runs roughly December through February. It\u2019s when Goa sees its busiest crowds and highest demand, so prices are typically higher and popular villas \u2014 especially private-pool ones \u2014 get booked out weeks in advance. Booking 6\u20138 weeks ahead for this window is a safe bet.',
  },
  {
    question: 'Are there more affordable options alongside the luxury villas?',
    answer:
      "Yes \u2014 alongside larger private-pool villas, we also list smaller cottages and stays at a range of price points, so there's usually something to fit different budgets, not only high-end properties.",
  },
  {
    question: "What's the advantage of booking directly with Goa Beach Stays instead of an OTA?",
    answer:
      "You're dealing with a real person over WhatsApp rather than a call centre, and our rates don't carry the extra markups some OTA listings add. Because every property is personally verified, you're also less likely to run into a listing that doesn't match reality.",
  },
  {
    question: 'What are the standard check-in and check-out times?',
    answer:
      'Check-in is generally from 12:00 PM and check-out by 11:00 AM, though some properties can offer flexibility \u2014 worth asking about early check-in or late check-out when you enquire, especially for staggered group arrivals.',
  },
]

export function FAQSection() {
  return (
    <div className="bg-warm-tint py-16">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <FAQAccordion faqs={HOMEPAGE_FAQS} />
      </div>
    </div>
  )
}