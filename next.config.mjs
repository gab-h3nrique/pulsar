/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/pulsar',
    output: "standalone",
    env: { SOCKET_URL: process.env.SOCKET_URL, BASE_API_URL: process.env.BASE_API_URL },
    reactStrictMode: false
};

export default nextConfig;
