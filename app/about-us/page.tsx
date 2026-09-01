import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  MessageSquareText,
  Sparkles,
  PartyPopper,
  Home,
  Users,
  HeartHandshake,
  Briefcase,
  Gem,
  ShieldCheck,
  Compass,
  Award,
} from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import { breadcrumbSchema, organizationSchema } from "@/lib/schema"
import { siteConfig, stats, whatsappUrl } from "@/lib/site-config"
import { getTopReviews } from "@/lib/stays"

export const metadata: Metadata = buildMetadata({
  title: "About Us — Your Goa Travel Expert & Destination Consultant",
  description:
    "Meet Rajesh Garela and Goa Beach Stays — 8+ years as a Goa destination consultant, personally matching travellers with villas, resorts, honeymoons, group trips and corporate retreats across North & South Goa.",
  path: "/about-us",
})

const PROCESS_STEPS = [
  {
    icon: MessageSquareText,
    title: "You Share Your Trip",
    description:
      "Tell us your dates, budget, group size, and the kind of trip you're picturing — WhatsApp, call, or the enquiry form all work.",
  },
  {
    icon: Compass,
    title: "We Understand the Occasion",
    description:
      "Before we shortlist anything, we talk through what the trip is actually for — a honeymoon, a family reunion, a corporate offsite — and which part of Goa and season genuinely suit it.",
  },
  {
    icon: Sparkles,
    title: "We Curate & Confirm",
    description:
      "We shortlist verified villas and resorts that match your brief, and lock in pricing and details directly with the property — no surprises later.",
  },
  {
    icon: PartyPopper,
    title: "You Arrive, We Stay On Call",
    description:
      "We coordinate the handover with the property, so you can just show up and enjoy Goa — and we're still reachable on WhatsApp for the length of your stay.",
  },
]

const SERVICES = [
  {
    icon: Home,
    title: "Villas, Resorts & Cottages",
    description:
      "Private-pool villas, beachfront resorts and cosy cottages across North and South Goa, from budget-friendly to luxury — matched to your trip, not just your dates.",
  },
  {
    icon: HeartHandshake,
    title: "Couples & Honeymoons",
    description:
      "Romantic stays and quiet, well-chosen properties for honeymoons, anniversaries and couple getaways.",
  },
  {
    icon: Users,
    title: "Family & Friends Trips",
    description:
      "Family holidays, friends' getaways, bachelor and bachelorette trips, and reunions for school, college or extended family.",
  },
  {
    icon: Briefcase,
    title: "Corporate & Group Travel",
    description:
      "Team outings, offsites, leadership retreats, workshops, conferences and incentive trips — with a single point of contact handling accommodation and logistics for the whole group.",
  },
  {
    icon: Gem,
    title: "Celebrations & Events",
    description:
      "Birthday and anniversary trips, small celebrations and picnic planning, matched to the mood you're going for.",
  },
  {
    icon: Compass,
    title: "Weddings & Guest Stays",
    description:
      "For destination weddings in Goa, we help guests find suitable accommodation, coordinate stay logistics, and connect you with trusted local service providers.",
  },
]

const TRUST_POINTS = [
  "Every property is personally visited and vetted before it's listed — not just approved from photos.",
  "Pricing is shown upfront, standard and peak season, with no bait-and-switch once you arrive.",
  "One point of contact throughout — the person who replies on WhatsApp is the same person who knows the property.",
  "Independent and unbiased: we recommend what fits your trip, not whichever property pays the highest commission.",
  "Season-by-season local knowledge — when North Goa gets crowded, when South Goa is quieter, and what a given month actually feels like on the ground.",
  "No generic packages — recommendations are shaped around your group size, budget and occasion, not a one-size-fits-all itinerary.",
  "No pressure to decide on the spot — we'd rather you take a day to think than book something that isn't right.",
]

const TRIP_TYPES = [
  "Family Holidays",
  "Couple Vacations",
  "Honeymoons",
  "Friends Trips",
  "Bachelor Trips",
  "Bachelorette Trips",
  "School & College Reunions",
  "Corporate Retreats",
  "Team Outings",
  "Workshops & Conferences",
  "Incentive Trips",
  "Weekend Getaways",
  "Birthday & Anniversary Trips",
  "Wedding Guest Stays",
]

export default function AboutUsPage() {
  const testimonials = getTopReviews(3)
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" },
  ])
  const organizationJsonLd = organizationSchema()

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-accent hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-foreground">
            About Us
          </li>
        </ol>
      </nav>

      {/* Owner bio */}
      <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/homepage/about-owner.png"
            alt={`${siteConfig.ownerName}, founder of ${siteConfig.name}`}
            width={640}
            height={720}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Meet {siteConfig.ownerName}</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground md:text-4xl">
            Your Goa Travel Expert &amp; Destination Consultant
          </h1>
          <p className="mt-1 text-muted-foreground">8+ Years Planning Trips Across North &amp; South Goa</p>
          <p className="mt-5 leading-relaxed text-foreground">
            Born and raised near the beaches he now helps travellers discover, {siteConfig.ownerName} has spent
            over eight years working closely with villa owners and resorts across North and South Goa —
            learning which areas suit which kind of trip, how each season actually feels on the ground, and
            which properties hold up to their photos. What started as helping friends find honest, well-kept
            places to stay has grown into {siteConfig.name} — a trusted destination consultant for anyone
            planning a trip to Goa, from a quiet weekend for two to a hundred-guest wedding party.
          </p>
          <p className="mt-4 leading-relaxed text-foreground">
            Ask {siteConfig.ownerName} where to stay, when to visit, or how to plan a group trip, and you'll get
            a considered answer from someone who has actually walked the property and knows the season — not a
            script, and not whatever has availability this week.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="mt-16 rounded-2xl border border-border bg-card p-6 md:p-10">
        <h2 className="font-heading text-2xl font-semibold text-foreground">Our Story</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          Too many travellers were booking Goa stays off outdated photos and vague listings, only to arrive
          disappointed. We started {siteConfig.name} to fix that — every property on this site is personally
          verified, every price is shown upfront in both standard and peak season, and every guest gets a real
          person to talk to on WhatsApp, not a chatbot. Our goal is simple: match you with a stay you'll actually
          want to come back to.
        </p>
      </section>

      {/* Every Trip Starts Differently */}
      <section className="mt-16">
        <h2 className="text-center font-heading text-2xl font-semibold text-foreground md:text-3xl">
          Every Trip to Goa Starts Differently
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-muted-foreground">
          Some guests write in already knowing exactly which beach they want. Others are just starting to
          think about a honeymoon, a family reunion, or the first company offsite they've ever had to plan, and
          aren't sure where to begin. Both conversations get the same thing from us: time, honest advice, and a
          shortlist built around what the trip is actually for — not whichever property happens to be free.
        </p>
      </section>

      {/* What We Do */}
      <section className="mt-16">
        <h2 className="text-center font-heading text-2xl font-semibold text-foreground md:text-3xl">
          How We Help Plan Your Trip
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          {siteConfig.name} covers the full arc of a Goa trip — from your first "where should we even stay?"
          message, through choosing between North and South Goa, to the day you check in.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div key={service.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex size-12 items-center justify-center rounded-full bg-accent/10">
                <service.icon className="size-6 text-accent" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Planned Trips */}
      <section className="mt-16 rounded-2xl border border-border bg-warm-tint p-6 md:p-10">
        <h2 className="font-heading text-2xl font-semibold text-foreground">Frequently Planned Trips</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          Whatever the occasion, chances are we've helped plan something similar before — often more than once. A
          few of the trips guests most often ask us to put together:
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {TRIP_TYPES.map((trip) => (
            <span
              key={trip}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
            >
              {trip}
            </span>
          ))}
        </div>
      </section>

      {/* Why Thousands Trust Us */}
      <section className="mt-16">
        <h2 className="text-center font-heading text-2xl font-semibold text-foreground md:text-3xl">
          Why Thousands Trust {siteConfig.name} With Their Goa Trip
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card px-4 py-6 text-center"
            >
              <p className="font-heading text-2xl font-semibold text-accent md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        <ul className="mx-auto mt-8 max-w-2xl space-y-4">
          {TRUST_POINTS.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Our Process */}
      <section className="mt-16">
        <h2 className="text-center font-heading text-2xl font-semibold text-foreground md:text-3xl">Our Process</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.title} className="relative rounded-2xl border border-border bg-card p-6 text-center">
              <span className="absolute -top-3 left-1/2 flex size-7 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <span className="mx-auto mt-3 flex size-12 items-center justify-center rounded-full bg-accent/10">
                <step.icon className="size-6 text-accent" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Promise */}
      <section className="mt-16 rounded-2xl border border-border bg-card p-6 md:p-10">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
            <Award className="size-6 text-accent" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-heading text-2xl font-semibold text-foreground">Our Promise</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
              We won't list a property we wouldn't put our own family in, we won't quote a price we can't honour,
              and we won't disappear after you've paid. Whether you're a couple planning a first trip together
              or a company coordinating forty people, the same standard applies: honest advice, upfront pricing,
              and a person who's actually reachable. Whatever stage your planning is at — even if you're still
              deciding between North and South Goa — {siteConfig.ownerName} and the {siteConfig.name} team are a
              message away.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="mt-16">
          <h2 className="text-center font-heading text-2xl font-semibold text-foreground md:text-3xl">
            What Our Guests Say
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((review) => (
              <div key={`${review.staySlug}-${review.id}`} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-sm leading-relaxed text-foreground">&ldquo;{review.review}&rdquo;</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-foreground">{review.name}</p>
                    <p className="text-muted-foreground">{review.location}</p>
                  </div>
                  {review.staySlug && (
                    <Link href={`/stays/${review.staySlug}`} className="text-accent hover:underline">
                      {review.stayName}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WhatsApp CTA */}
      <section className="mt-16 rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground">
        <h2 className="font-heading text-2xl font-semibold md:text-3xl">Let&apos;s Plan Your Goa Trip Together</h2>
        <p className="mx-auto mt-2 max-w-xl text-primary-foreground/80">
          Message {siteConfig.ownerName} directly on WhatsApp — tell him what the trip is for, and he&apos;ll help
          you find the villa or resort that actually fits it.
        </p>
        
         <a href={whatsappUrl(`Hi ${siteConfig.ownerName}! I'd like to talk through a trip to Goa.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
        >
          Chat With Us on WhatsApp
        </a>
      </section>
    </main>
  )
}