/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/stays/sonikus-executive-calangute",
        destination: "/stays/casa-verdant-villa-candolim",
        permanent: true,
      },
      {
        source: "/stays/horizon-bluff-cottages-vagator",
        destination: "/stays/costa-vermelha-resort-vagator",
        permanent: true,
      },
      {
        source: "/stays/rivermist-villa-arpora",
        destination: "/stays/lagoonside-resort-arpora",
        permanent: true,
      },
      {
        source: "/stays/falconview-residency-candolim",
        destination: "/stays/driftwood-hollow-resort-vagator",
        permanent: true,
      },
      {
        source: "/stays/sundowner-candolim-resort",
        destination: "/stays/azure-tide-resort-baga",
        permanent: true,
      },
      {
        source: "/stays/wooden-cove-resort-calangute",
        destination: "/stays/azuremere-villa-calangute",
        permanent: true,
      },
      {
        source: "/stays/marisol-cove-resort-morjim",
        destination: "/stays/coral-breeze-hotel-candolim",
        permanent: true,
      },
      {
        source: "/stays/vellum-shore-hotel-calangute",
        destination: "/stays/tidewood-cottages-morjim",
        permanent: true,
      },
      {
        source: "/stays/ochre-house-boutique-resort-anjuna",
        destination: "/stays/casa-luma-villa-candolim",
        permanent: true,
      },
      {
        source: "/stays/windward-bay-resort-anjuna",
        destination: "/stays/windward-bay-resort-candolim",
        permanent: true,
      },
      {
        source: "/stays/the-boutique-villa-baga",
        destination: "/stays/the-boutique-cottages-calangute",
        permanent: true,
      },
      {
        source: "/stays/five-palms-villa-candolim",
        destination: "/stays/costa-dourada-beach-resort-morjim",
        permanent: true,
      },
      {
        source: "/stays/cascata-arpora-resort",
        destination: "/stays/de-falcon-candolim-resort",
        permanent: true,
      },
    ]
  },
}

export default nextConfig