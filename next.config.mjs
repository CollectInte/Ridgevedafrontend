/** @type {import('next').NextConfig} */
const nextConfig = {

    trailingSlash: false,  // Important: prevents double slashes
    skipTrailingSlashRedirect: true,
    distDir: 'out',  // Specify output directory
    images: {
        unoptimized: true  // Required for static export
    },
    env: {
        PUBLIC_URL: "",
    },
    // Ensure proper base path handling
    basePath: '',
    assetPrefix: '',
};

export default nextConfig;