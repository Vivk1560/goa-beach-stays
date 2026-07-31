import { writeFileSync, mkdirSync } from "node:fs"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = `${__dirname}/../data/blogs.json`

const coverFor = {
  "Beach Guides": "/images/blogs/beaches/cover.png",
  Itineraries: "/images/blogs/itinerary/cover.png",
  "Travel Tips": "/images/blogs/itinerary/cover.png",
  Seasonal: "/images/blogs/seasonal/cover.png",
  Couples: "/images/blogs/villa-tips/cover.png",
  Families: "/images/blogs/villa-tips/cover.png",
  Groups: "/images/blogs/seasonal/cover.png",
  "Villa Tips": "/images/blogs/villa-tips/cover.png",
  Food: "/images/blogs/food/cover.png",
  Nightlife: "/images/blogs/seasonal/cover.png",
  Activities: "/images/blogs/itinerary/cover.png",
  Culture: "/images/blogs/culture/cover.png",
  "Budget Tips": "/images/blogs/itinerary/cover.png",
}

const posts = [
  ["best-beaches-in-north-goa", "10 Best Beaches in North Goa You Must Visit in 2025", "Beach Guides"],
  ["best-beaches-in-south-goa", "8 Hidden Beaches in South Goa That Tourists Miss", "Beach Guides"],
  ["goa-itinerary-3-days", "The Perfect 3-Day Goa Itinerary for First-Time Visitors", "Itineraries"],
  ["goa-itinerary-5-days", "5 Days in Goa: The Ultimate Travel Itinerary", "Itineraries"],
  ["goa-itinerary-7-days", "7 Days in Goa: A Week-Long Complete Guide", "Itineraries"],
  ["best-time-to-visit-goa", "Best Time to Visit Goa — Month by Month Guide", "Travel Tips"],
  ["goa-in-monsoon", "Visiting Goa in Monsoon Season: What You Need to Know", "Seasonal"],
  ["goa-for-couples", "Romantic Goa: Best Spots & Stays for Couples", "Couples"],
  ["goa-for-families", "Family-Friendly Goa: Top Activities & Where to Stay", "Families"],
  ["goa-bachelorette-guide", "Bachelorette Party in Goa: Complete Planning Guide", "Groups"],
  ["private-pool-villas-goa-guide", "Why Rent a Private Pool Villa in Goa? Complete Guide", "Villa Tips"],
  ["beachfront-villas-goa", "Beachfront Villas in Goa: What to Expect & How to Book", "Villa Tips"],
  ["north-goa-vs-south-goa", "North Goa vs South Goa: Which Side Should You Stay On?", "Travel Tips"],
  ["goa-food-guide", "The Ultimate Goa Food Guide: What to Eat & Where", "Food"],
  ["goa-seafood-restaurants", "12 Best Seafood Restaurants in Goa Locals Actually Love", "Food"],
  ["goa-nightlife-guide", "Goa Nightlife Guide: Best Clubs, Beach Shacks & Bars", "Nightlife"],
  ["things-to-do-north-goa", "20 Best Things to Do in North Goa in 2025", "Activities"],
  ["things-to-do-south-goa", "15 Best Things to Do in South Goa", "Activities"],
  ["goa-water-sports-guide", "Goa Water Sports: Complete Guide to Activities & Prices", "Activities"],
  ["how-to-reach-goa", "How to Reach Goa: Flight, Train, Bus & Road Guide", "Travel Tips"],
  ["goa-december-guide", "Goa in December: Weather, Events, Tips & Best Stays", "Seasonal"],
  ["goa-new-year-guide", "New Year's Eve in Goa: Everything You Need to Know", "Seasonal"],
  ["goa-christmas-guide", "Christmas in Goa: Traditions, Events & Where to Stay", "Seasonal"],
  ["calangute-beach-guide", "Calangute Beach Complete Guide: Stay, Eat & Explore", "Beach Guides"],
  ["palolem-beach-guide", "Palolem Beach Guide: South Goa's Most Beautiful Beach", "Beach Guides"],
  ["anjuna-beach-guide", "Anjuna Beach Guide: Flea Markets, Parties & More", "Beach Guides"],
  ["goa-heritage-architecture", "Portuguese Heritage Architecture in Goa: A Visual Guide", "Culture"],
  ["budget-tips-goa", "15 Ways to Save Money on Your Goa Trip", "Budget Tips"],
  ["goa-travel-checklist", "Goa Packing List: Everything You Need for Your Trip", "Travel Tips"],
  ["why-book-goa-villa-vs-hotel", "Villa vs Hotel in Goa: Which Should You Book?", "Villa Tips"],
]

const relatedPool = [
  "azure-pool-villa-calangute",
  "palm-haven-resort-baga",
  "terra-rossa-resort-palolem",
  "serenity-villa-vagator",
  "ocean-breeze-villa-cavelossim",
  "jungle-nest-villa-mandrem",
]

function content(title) {
  return [
    { type: "p", text: `Goa is one of India's most loved holiday destinations, and this guide to "${title}" is here to help you make the most of your trip. Whether it is your first visit or your tenth, there is always something new to discover along this sun-soaked coastline. In the sections below we cover everything you need to plan with confidence.` },
    { type: "h2", text: "Why This Matters for Your Goa Trip" },
    { type: "p", text: "Planning ahead is the secret to a stress-free Goa holiday. From choosing the right beach to picking a stay that suits your group, the small decisions add up to a much better experience. We have spent years helping travellers find the perfect base for their visit, and the advice here reflects what genuinely works on the ground." },
    { type: "p", text: "Goa is compact but surprisingly varied. The north is lively and social, while the south is calmer and greener. Understanding these differences early helps you spend your days exactly the way you want to — whether that is dancing at a beach club or reading a book by a quiet pool." },
    { type: "h2", text: "What to Keep in Mind" },
    { type: "ul", items: [
      "Book your stay early during the peak season (November to January).",
      "Rent a scooter or car to explore beaches at your own pace.",
      "Carry light, breathable clothing and reef-safe sunscreen.",
      "Try the local Goan cuisine — fresh seafood is a highlight.",
      "Respect local customs and the natural environment.",
    ] },
    { type: "h3", text: "Getting the Timing Right" },
    { type: "p", text: "The weather plays a big role in how your trip unfolds. The dry season from November to February offers the best beach weather, while the monsoon (June to September) brings lush greenery and dramatic skies at a fraction of the price. Each season has its own charm, so choose based on the experience you are after." },
    { type: "h2", text: "Where to Stay" },
    { type: "p", text: "Your choice of accommodation shapes the entire holiday. A private villa offers space and seclusion for families and groups, while a boutique resort or cottage is perfect for couples and solo travellers who want service and a social atmosphere. Across Goa Beach Stays we hand-pick properties that deliver on both comfort and location." },
    { type: "quote", text: "The best Goa trips are the ones where your stay feels like a destination in itself — not just a place to sleep." },
    { type: "h2", text: "Final Tips" },
    { type: "p", text: "However you choose to spend your time, give yourself room to slow down. Goa rewards travellers who linger — over a long lunch, a sunset swim, or an unhurried evening by the water. If you would like a hand finding the right stay for your dates, our team is just a WhatsApp message away and happy to help you plan." },
    { type: "p", text: "We hope this guide makes your planning easier. Browse our curated villas, resorts and cottages to find a base that matches your travel style, and reach out any time for personalised recommendations." },
  ]
}

const blogs = posts.map(([slug, title, category], i) => ({
  slug,
  title,
  category,
  excerpt: `${title.replace(/^[0-9]+ /, "")} — our complete, locally-informed guide to help you plan the perfect Goa trip with confidence.`,
  coverImage: coverFor[category] || "/images/blogs/beaches/cover.png",
  publishDate: new Date(2025, 0, 28 - i).toISOString().slice(0, 10),
  readTime: `${7 + (i % 5)} min`,
  content: content(title),
  tags: [category, "Goa", "Travel Guide"],
  relatedStays: [relatedPool[i % relatedPool.length], relatedPool[(i + 2) % relatedPool.length]],
  seo: {
    metaTitle: `${title} | Goa Beach Stays`.slice(0, 60),
    metaDescription: `${title}. Read our complete Goa guide with local tips, the best stays and everything you need to plan your trip.`.slice(0, 160),
  },
}))

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(blogs, null, 2))
console.log(`Wrote ${blogs.length} blogs to ${OUT}`)
