// Generates data/semantic-pages.json — all 60 SEO landing pages.
import { writeFileSync } from "node:fs"

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const BRAND = "Goa Beach Stays"

// ---- Location data ----
const northAreas = ["Calangute", "Baga", "Anjuna", "Vagator", "Morjim", "Mandrem", "Candolim", "Arambol", "Assagao"]
const southAreas = ["Palolem", "Agonda", "Cavelossim", "Colva", "Benaulim", "Varca"]

const areaDistrict = {
  Calangute: "North Goa", Baga: "North Goa", Anjuna: "North Goa", Vagator: "North Goa",
  Morjim: "North Goa", Mandrem: "North Goa", Candolim: "North Goa", Arambol: "North Goa", Assagao: "North Goa",
  Palolem: "South Goa", Agonda: "South Goa", Cavelossim: "South Goa", Colva: "South Goa",
  Benaulim: "South Goa", Varca: "South Goa",
}

const areaVibe = {
  Calangute: "the buzzing 'Queen of Beaches' with its lively shacks, water sports and walkable markets",
  Baga: "Goa's nightlife epicentre, famous for Tito's Lane, beach clubs and weekend energy",
  Anjuna: "the bohemian heart of North Goa, known for its Wednesday flea market and clifftop sunsets",
  Vagator: "dramatic red cliffs, the iconic Chapora Fort and some of Goa's best sunset views",
  Morjim: "a serene, turtle-nesting stretch loved for its calm, upscale and uncrowded beachfront",
  Mandrem: "a tranquil, palm-fringed escape with quiet sands and a yoga-retreat atmosphere",
  Candolim: "a relaxed, family-friendly belt with wide beaches and easy access to Fort Aguada",
  Arambol: "a free-spirited cove with drum circles, the sweet-water lagoon and live-music cafes",
  Assagao: "a leafy, village-chic enclave of designer villas, boutique cafes and quiet lanes",
  Palolem: "a crescent-shaped, palm-lined bay considered South Goa's most beautiful beach",
  Agonda: "a peaceful, wide and pristine beach perfect for slow mornings and turtle spotting",
  Cavelossim: "a luxury South Goa stretch with the Mobor sandbar and the River Sal nearby",
  Colva: "one of South Goa's largest, most accessible beaches with a classic seaside-town feel",
  Benaulim: "a quiet fishing-village beach known for dolphin trips and golden, gentle sands",
  Varca: "an exclusive, clean and uncrowded white-sand beach ideal for unwinding in privacy",
}

const faqBase = (label, kind) => [
  {
    question: `What is the best area in Goa for ${kind}?`,
    answer: `It depends on the vibe you want. North Goa areas like Calangute, Baga and Anjuna suit guests who want nightlife and buzz, while South Goa spots like Palolem and Cavelossim are better for quiet, luxury stays. Our team at ${BRAND} matches you to the right ${kind} based on your group and plans.`,
  },
  {
    question: `How do I book a ${label.toLowerCase()} with ${BRAND}?`,
    answer: `Simply browse the options on this page, then message us on WhatsApp or call us. We confirm real-time availability, share full details and lock in your dates — there is no online payment gateway, every booking is personally handled.`,
  },
  {
    question: `Are these properties verified?`,
    answer: `Yes. Every property is personally inspected and verified by our team. With 8+ years in Goa hospitality, we only list stays we would recommend to our own family.`,
  },
  {
    question: `What is the typical price range?`,
    answer: `Prices vary by season, size and location. Peak season (December–January) is higher, while monsoon and shoulder months offer excellent value. Message us for an exact quote for your dates.`,
  },
]

const pages = []

function addPage(p) {
  pages.push(p)
}

// ---- Tier 1: Type pages ----
const typePages = [
  {
    slug: "private-pool-villas-in-goa", h1: "Private Pool Villas in Goa", kw: "private pool villas in goa",
    filter: { type: "villa", tag: "private pool" }, kind: "private pool villas",
    blurb: "Wake up to your own turquoise pool, sun-drenched decks and total privacy. Our private pool villas are the most-requested stays in Goa — ideal for families, friends and couples who want space to themselves.",
  },
  {
    slug: "beachfront-villas-goa", h1: "Beachfront Villas in Goa", kw: "beachfront villas goa",
    filter: { type: "villa", tag: "beachfront" }, kind: "beachfront villas",
    blurb: "Step from your veranda straight onto the sand. These beachfront villas put the Arabian Sea at your doorstep, with sunrise swims, sunset walks and the sound of waves all night.",
  },
  {
    slug: "heritage-villas-goa", h1: "Heritage Villas in Goa", kw: "heritage villas goa",
    filter: { type: "villa", tag: "heritage" }, kind: "heritage villas",
    blurb: "Restored Portuguese-era homes full of character — oyster-shell windows, terracotta roofs, antique furniture and shaded courtyards. Stay inside a piece of Goan history.",
  },
  {
    slug: "family-villas-goa", h1: "Family Villas in Goa", kw: "family villas goa",
    filter: { type: "villa", tag: "family-friendly" }, kind: "family villas",
    blurb: "Spacious, safe and full of room to play. Our family villas come with multiple bedrooms, fenced pools, kitchens and gardens — everything you need for a multi-generational Goa holiday.",
  },
  {
    slug: "couple-villas-goa", h1: "Villas for Couples in Goa", kw: "couple villas goa",
    filter: { type: "villa", tag: "couple-friendly" }, kind: "romantic villas for couples",
    blurb: "Intimate, romantic and private. These couple-friendly villas are made for honeymoons and anniversaries — think plunge pools, candlelit decks and total seclusion.",
  },
  {
    slug: "jungle-villas-goa", h1: "Jungle Villas in Goa", kw: "jungle villas goa",
    filter: { type: "villa", tag: "jungle" }, kind: "jungle villas",
    blurb: "Tucked into tropical green, these jungle villas trade the crowds for birdsong, dappled light and pools that mirror the canopy. Pure, private nature.",
  },
  {
    slug: "sea-view-villas-goa", h1: "Sea View Villas in Goa", kw: "sea view villas goa",
    filter: { type: "villa", tag: "sea view" }, kind: "sea view villas",
    blurb: "Perched on cliffs and slopes with sweeping ocean panoramas. Sip your morning coffee watching the Arabian Sea stretch to the horizon.",
  },
  {
    slug: "corporate-villas-goa", h1: "Corporate & Group Villas in Goa", kw: "corporate villas goa",
    filter: { type: "villa", tag: "large group" }, kind: "corporate and large-group villas",
    blurb: "Large villas built for offsites, reunions and big celebrations — generous common areas, multiple bedrooms, fast Wi-Fi and space to host everyone under one roof.",
  },
  {
    slug: "boutique-resorts-goa", h1: "Boutique Resorts in Goa", kw: "boutique resorts goa",
    filter: { type: "resort" }, kind: "boutique resorts",
    blurb: "Small, characterful resorts where service is personal and design is everything. Enjoy pools, dining and on-site hospitality without the scale of a chain hotel.",
  },
  {
    slug: "luxury-resorts-goa", h1: "Luxury Resorts in Goa", kw: "luxury resorts goa",
    filter: { type: "resort", tag: "luxury" }, kind: "luxury resorts",
    blurb: "Premium resorts with full amenities — pools, dining, gardens and attentive staff. Ideal when you want the freedom of a resort with a refined, upscale feel.",
  },
  {
    slug: "pool-resorts-goa", h1: "Pool Resorts in Goa", kw: "pool resorts goa",
    filter: { type: "resort", tag: "private pool" }, kind: "pool resorts",
    blurb: "Resorts built around beautiful swimming pools, palm-fringed loungers and easy poolside days. Perfect for families and groups who want to stay in and relax.",
  },
]

for (const t of typePages) {
  const district = t.filter.district
  addPage({
    slug: t.slug, h1: t.h1, metaTitle: `${t.h1} | Verified & Handpicked | ${BRAND}`,
    metaDescription: `Discover handpicked ${t.kind} in Goa with ${BRAND}. Verified properties, personal service & 8+ years of local expertise. WhatsApp us to book.`,
    intro: t.blurb,
    sections: [
      { heading: `Why Choose Our ${t.h1.replace(" in Goa", "")}`, body: `At ${BRAND}, every property is personally inspected before we list it. We have spent 8+ years building relationships with the best owners in Goa, which means honest descriptions, fair prices and stays that look exactly like their photos. When you book ${t.kind} with us, you get a real human on WhatsApp who knows the property, the neighbourhood and the best time to visit.` },
      { heading: "What to Expect", body: `Most of our ${t.kind} include essentials like high-speed Wi-Fi, daily housekeeping, backup power and 24/7 guest support. Many add private pools, fully-equipped kitchens, in-villa chefs on request and curated experiences — from sunset cruises to local food trails. Tell us your plans and we will tailor the stay to your group.` },
      { heading: "Local Tips", body: `North Goa (Calangute, Baga, Anjuna, Vagator) is best for nightlife, markets and a lively scene, while South Goa (Palolem, Agonda, Cavelossim) is quieter, cleaner and more luxurious. December–January is peak season and books out fast, so reserve early. For value and fewer crowds, consider October–November or February–March.` },
    ],
    faqs: faqBase(t.h1, t.kind),
    filter: t.filter,
    parent: { name: "All Stays", url: "/all-stays" },
    related: typePages.filter((x) => x.slug !== t.slug).slice(0, 5).map((x) => ({ name: x.h1, url: `/${x.slug}` })),
    relatedBlogs: ["best-beaches-in-north-goa", "private-pool-villa-guide-goa"],
  })
}

// ---- Tier 2: Region pages ----
const regionPages = [
  { slug: "north-goa-stays", h1: "North Goa Stays", district: "North Goa", filter: { district: "North Goa" }, kind: "stays in North Goa" },
  { slug: "south-goa-stays", h1: "South Goa Stays", district: "South Goa", filter: { district: "South Goa" }, kind: "stays in South Goa" },
  { slug: "north-goa-resorts", h1: "North Goa Resorts", district: "North Goa", filter: { district: "North Goa", type: "resort" }, kind: "resorts in North Goa" },
  { slug: "south-goa-resorts", h1: "South Goa Resorts", district: "South Goa", filter: { district: "South Goa", type: "resort" }, kind: "resorts in South Goa" },
  { slug: "north-goa-villas", h1: "North Goa Villas", district: "North Goa", filter: { district: "North Goa", type: "villa" }, kind: "villas in North Goa" },
  { slug: "south-goa-villas", h1: "South Goa Villas", district: "South Goa", filter: { district: "South Goa", type: "villa" }, kind: "villas in South Goa" },
]

for (const r of regionPages) {
  const isNorth = r.district === "North Goa"
  addPage({
    slug: r.slug, h1: r.h1, metaTitle: `${r.h1} | Verified Villas & Resorts | ${BRAND}`,
    metaDescription: `Browse handpicked ${r.kind} with ${BRAND}. Verified, inspected properties across ${r.district}. Personal service, local expertise — WhatsApp us to book.`,
    intro: isNorth
      ? `North Goa is where the energy is — lively beaches, legendary nightlife, buzzing markets and a shack on every shore. Our ${r.kind} put you close to Calangute, Baga, Anjuna and Vagator while keeping a private retreat to come home to.`
      : `South Goa is the calmer, more luxurious side of the coast — wide clean beaches, swaying palms and a slower pace. Our ${r.kind} are set around Palolem, Agonda, Cavelossim and Colva, perfect for unwinding in style.`,
    sections: [
      { heading: `Why Stay in ${r.district}`, body: isNorth
        ? `North Goa packs the most variety into the smallest area: world-famous beaches, the Saturday Night Market, Fontainhas heritage quarter nearby, water sports, and dining for every budget. It is ideal for first-timers, friend groups and anyone who wants the action a short ride away.`
        : `South Goa is for travellers who want space and serenity. The beaches are wider and cleaner, the resorts more refined, and the pace unhurried. It suits honeymooners, families with young children and anyone seeking a digital detox.` },
      { heading: "What to Expect", body: `Our ${r.kind} range from intimate couple retreats to large group villas and full-service resorts. Expect verified listings, honest pricing, private pools on many properties, and 24/7 support from a team that lives and works in Goa.` },
      { heading: "Getting Around", body: isNorth
        ? `North Goa is roughly 45 minutes from Dabolim Airport and 30 minutes from the new Mopa (Manohar International) Airport. Renting a scooter or hiring a car-and-driver is the easiest way to hop between beaches.`
        : `South Goa is about 30–60 minutes from Dabolim Airport depending on the beach. It is more spread out than the north, so a hired car or self-drive is recommended for exploring.` },
    ],
    faqs: faqBase(r.h1, r.kind),
    filter: r.filter,
    parent: { name: "All Stays", url: "/all-stays" },
    related: regionPages.filter((x) => x.slug !== r.slug).map((x) => ({ name: x.h1, url: `/${x.slug}` })),
    relatedBlogs: isNorth ? ["best-beaches-in-north-goa", "north-goa-3-day-itinerary"] : ["best-beaches-in-south-goa", "south-goa-quiet-beaches"],
  })
}

// ---- Tier 3: Location (area) pages ----
const allAreas = [...northAreas, ...southAreas]
for (const area of allAreas) {
  const slug = `stays-in-${area.toLowerCase()}`
  const district = areaDistrict[area]
  addPage({
    slug, h1: `Stays in ${area}, Goa`, metaTitle: `Stays in ${area} | Villas & Resorts | ${BRAND}`,
    metaDescription: `Find verified villas, resorts & beach stays in ${area}, Goa with ${BRAND}. Handpicked properties near ${area} beach. WhatsApp us for availability & best rates.`,
    intro: `${area} is ${areaVibe[area]}. Our handpicked stays in ${area} let you enjoy all of it — with a private, verified base to return to each evening. Whether you want a pool villa, a boutique resort or a cosy cottage, we will match you to the right one.`,
    sections: [
      { heading: `Why Stay in ${area}`, body: `${area} sits in ${district} and is ${areaVibe[area]}. Staying right here means you are minutes from the beach, the best local restaurants and the area's signature experiences — no long commutes eating into your holiday.` },
      { heading: "What to Expect", body: `Our ${area} properties are personally inspected and range from intimate couple retreats to large family villas. Most include Wi-Fi, housekeeping, backup power and private pools, with in-villa chefs and curated experiences available on request.` },
      { heading: `Things to Do Near ${area}`, body: `Spend your days on ${area} beach, explore nearby markets and cafes, book a sunset cruise or dolphin trip, and end the evening with fresh Goan seafood. Our team shares a personalised local guide with every booking so you never miss the best spots.` },
    ],
    faqs: faqBase(`Stays in ${area}`, `stays in ${area}`),
    filter: { area, district },
    parent: { name: `${district} Stays`, url: district === "North Goa" ? "/north-goa-stays" : "/south-goa-stays" },
    related: allAreas.filter((a) => a !== area && areaDistrict[a] === district).slice(0, 5).map((a) => ({ name: `Stays in ${a}`, url: `/stays-in-${a.toLowerCase()}` })),
    relatedBlogs: district === "North Goa" ? ["best-beaches-in-north-goa"] : ["best-beaches-in-south-goa"],
  })
}

// ---- Tier 4: Intent / long-tail pages ----
const intentPages = [
  { slug: "goa-beach-stays-near-me", h1: "Goa Beach Stays Near You", kind: "beach stays", filter: { tag: "beachfront" },
    blurb: "Looking for a beach stay in Goa right now? We have verified villas, cottages and resorts steps from the sand across both North and South Goa — message us with your dates and we will send live options." },
  { slug: "stays-in-panjim", h1: "Stays & Homestays in Panjim", kind: "stays in Panjim", filter: { type: "homestay", area: "Panjim" },
    blurb: "Stay in the heart of Goa's capital — the colourful Fontainhas heritage quarter, riverside promenades and the best of old-world Goan charm. Our Panjim homestays put culture on your doorstep." },
  { slug: "luxury-villas-goa", h1: "Luxury Villas in Goa", kind: "luxury villas", filter: { type: "villa", tag: "luxury" },
    blurb: "The very best of Goa — designer villas with infinity pools, sea views, chefs and concierge service. For travellers who expect nothing but the finest." },
  { slug: "budget-stays-goa", h1: "Budget-Friendly Stays in Goa", kind: "affordable stays", filter: { tag: "value" },
    blurb: "Great Goa holidays do not have to cost a fortune. These verified, value-for-money stays give you comfort, location and honest pricing without the luxury markup." },
  { slug: "monsoon-stays-goa", h1: "Monsoon Stays in Goa", kind: "monsoon stays", filter: { tag: "jungle" },
    blurb: "Goa in the monsoon is lush, green and magical — and far quieter. These rain-ready stays are perfect for slow, scenic, great-value getaways from June to September." },
  { slug: "new-year-stays-goa", h1: "New Year & Christmas Stays in Goa", kind: "festive-season stays", filter: { tag: "private pool" },
    blurb: "Goa is India's favourite New Year destination. Book early for the festive season — these party-ready villas and resorts are perfect for ringing in the new year with your group." },
  { slug: "honeymoon-stays-goa", h1: "Honeymoon Stays in Goa", kind: "honeymoon stays", filter: { tag: "couple-friendly" },
    blurb: "Romantic, private and unforgettable. Our handpicked honeymoon villas and resorts come with plunge pools, sea views and the kind of seclusion newlyweds dream of." },
  { slug: "group-stays-goa", h1: "Group & Party Stays in Goa", kind: "group stays", filter: { tag: "large group" },
    blurb: "Big group? No problem. These large villas and resorts have the bedrooms, common areas and pools to host friends, families and celebrations of every size." },
  { slug: "pet-friendly-stays-goa", h1: "Pet-Friendly Stays in Goa", kind: "pet-friendly stays", filter: { tag: "pet-friendly" },
    blurb: "Bring the whole family — including the four-legged members. These pet-friendly villas welcome your dogs with gardens, space and a warm Goan welcome." },
  { slug: "workation-stays-goa", h1: "Workation Stays in Goa", kind: "workation stays", filter: { tag: "wifi" },
    blurb: "Trade your desk for a sea view. With fast Wi-Fi, quiet workspaces and backup power, these stays are built for remote workers who want to live the Goa life while staying productive." },
]

for (const i of intentPages) {
  addPage({
    slug: i.slug, h1: i.h1, metaTitle: `${i.h1} | Verified & Handpicked | ${BRAND}`,
    metaDescription: `${i.blurb.slice(0, 150)}`,
    intro: i.blurb,
    sections: [
      { heading: `Why Book ${i.h1} with ${BRAND}`, body: `We are not a faceless booking site. With 8+ years in Goa hospitality, we personally inspect every property and stay on WhatsApp from enquiry to checkout. That means honest advice on ${i.kind}, fair pricing and a stay that delivers exactly what we promise.` },
      { heading: "What to Expect", body: `Each option is verified and curated for ${i.kind}. Expect reliable Wi-Fi, housekeeping, backup power and 24/7 support, with extras like private pools, in-villa chefs and curated local experiences available on request.` },
      { heading: "Local Tips", body: `Tell us your group size, budget and the vibe you are after, and we will shortlist the best matches and share live availability. Book early for peak dates (December–January and long weekends), and ask us about value seasons for the same quality at lower prices.` },
    ],
    faqs: faqBase(i.h1, i.kind),
    filter: i.filter,
    parent: { name: "All Stays", url: "/all-stays" },
    related: intentPages.filter((x) => x.slug !== i.slug).slice(0, 5).map((x) => ({ name: x.h1, url: `/${x.slug}` })),
    relatedBlogs: ["private-pool-villa-guide-goa", "best-time-to-visit-goa"],
  })
}

writeFileSync(new URL("../data/semantic-pages.json", import.meta.url), JSON.stringify(pages, null, 2))
console.log("Generated", pages.length, "semantic pages")
