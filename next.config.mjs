/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loaderFile: "./lib/cloudinary-loader.js",
        remotePatterns: [{
                protocol: "https",
                hostname: "img.youtube.com",
                pathname: "/vi/**",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/ownuvi2y/**",
            },
        ],
    },
    async redirects() {
        return [{
                source: "/stays/sonikus-executive-calangute",
                destination: "/stays-in-calangute",
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
                destination: "/stays-in-candolim",
                permanent: true,
            },
            {
                source: "/stays/sundowner-candolim-resort",
                destination: "/stays-in-candolim",
                permanent: true,
            },
            {
                source: "/stays/wooden-cove-resort-calangute",
                destination: "/stays/azuremere-villa-calangute",
                permanent: true,
            },
            {
                source: "/stays/marisol-cove-resort-morjim",
                destination: "/stays-in-morjim",
                permanent: true,
            },
            {
                source: "/stays/vellum-shore-hotel-calangute",
                destination: "/stays-in-calangute",
                permanent: true,
            },
            {
                source: "/stays/ochre-house-boutique-resort-anjuna",
                destination: "/stays-in-anjuna",
                permanent: true,
            },
            {
                source: "/stays/windward-bay-resort-anjuna",
                destination: "/stays-in-anjuna",
                permanent: true,
            },
            {
                source: "/stays/the-boutique-villa-baga",
                destination: "/stays-in-baga",
                permanent: true,
            },
            {
                source: "/stays/five-palms-villa-candolim",
                destination: "/stays-in-candolim",
                permanent: true,
            },
            {
                source: "/stays/cascata-arpora-resort",
                destination: "/stays-in-baga",
                permanent: true,
            },
        ]
    },
}

export default nextConfig