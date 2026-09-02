export interface NavChild {
  label: string
  href: string
}

export interface NavGroup {
  label: string
  children: NavChild[]
}

export interface NavItem {
  label: string
  href?: string
  /** Grouped dropdown sections */
  groups?: NavGroup[]
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "All Stays",
    groups: [
      {
        label: "Browse by Region",
        children: [
          { label: "North Goa Stays", href: "/north-goa-stays" },
          { label: "South Goa Stays", href: "/south-goa-stays" },
        ],
      },
      {
        label: "Browse by Type",
        children: [
          { label: "Private Villas", href: "/villas" },
          { label: "Resorts", href: "/resorts" },
          { label: "Cottages", href: "/all-stays?type=cottage" },
        ],
      },
      {
        label: "Everything",
        children: [{ label: "View All Stays", href: "/all-stays" }],
      },
    ],
  },
  {
    label: "Resorts",
    groups: [
      {
        label: "Resorts in Goa",
        children: [
          { label: "Boutique Resorts", href: "/boutique-resorts-goa" },
          { label: "North Goa Resorts", href: "/north-goa-resorts" },
          { label: "South Goa Resorts", href: "/south-goa-resorts" },
          { label: "Pool Resorts", href: "/pool-resorts-goa" },
          { label: "Luxury Resorts", href: "/luxury-resorts-goa" },
        ],
      },
    ],
  },
  {
    label: "Villas",
    groups: [
      {
        label: "Villas in Goa",
        children: [
          { label: "Private Pool Villas", href: "/private-pool-villas-in-goa" },
          { label: "Beachfront Villas", href: "/beachfront-villas-goa" },
          { label: "Heritage Villas", href: "/heritage-villas-goa" },
          { label: "Family Villas", href: "/family-villas-goa" },
          { label: "Villas for Couples", href: "/couple-villas-goa" },
          { label: "Jungle Villas", href: "/jungle-villas-goa" },
          { label: "Sea View Villas", href: "/sea-view-villas-goa" },
          { label: "Corporate Villas", href: "/corporate-villas-goa" },
        ],
      },
    ],
  },
  { label: "Reviews", href: "/reviews" },
  { label: "Guest Experiences", href: "/guest-experiences" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Videos", href: "/videos" },
  { label: "Blogs", href: "/blogs" },
]

export const footerNav = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "All Stays", href: "/all-stays" },
    { label: "Villas", href: "/villas" },
    { label: "Resorts", href: "/resorts" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Blogs", href: "/blogs" },
    { label: "Reviews", href: "/reviews" },
    { label: "Videos", href: "/videos" },
    { label: "Guest Experiences", href: "/guest-experiences" },
  ],
  exploreGoa: [
    { label: "North Goa Stays", href: "/north-goa-stays" },
    { label: "South Goa Stays", href: "/south-goa-stays" },
    { label: "Beachfront Villas", href: "/beachfront-villas-goa" },
    { label: "Pool Villas", href: "/private-pool-villas-in-goa" },
    { label: "Heritage Stays", href: "/heritage-villas-goa" },
    { label: "Boutique Resorts", href: "/boutique-resorts-goa" },
  ],
  popularLocations: [
    { label: "Calangute", href: "/stays-in-calangute" },
    { label: "Baga", href: "/stays-in-baga" },
    { label: "Anjuna", href: "/stays-in-anjuna" },
    { label: "Vagator", href: "/stays-in-vagator" },
    { label: "Morjim", href: "/stays-in-morjim" },
    { label: "Candolim", href: "/stays-in-candolim" },
    { label: "Arambol", href: "/stays-in-arambol" },
    { label: "Palolem", href: "/stays-in-palolem" },
    { label: "Cavelossim", href: "/stays-in-cavelossim" },
    { label: "Colva", href: "/stays-in-colva" },
    { label: "Varca", href: "/stays-in-varca" },
  ],
}