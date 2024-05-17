/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['picsum.photos']
  },
  reactStrictMode: true,
  // Transpile Swagger UI React https://github.com/swagger-api/swagger-ui/issues/8245
  transpilePackages: [
    'react-syntax-highlighter',
    'swagger-client',
    'swagger-ui-react',
  ],
};

export default nextConfig;
