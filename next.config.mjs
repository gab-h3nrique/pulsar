/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/pulsar',
    output: "standalone",
    env: { SOCKET_URL: process.env.SOCKET_URL },
    reactStrictMode: false
};

export default nextConfig;
