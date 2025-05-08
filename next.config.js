/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Payload CMS compatibility
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  
  // Configure WebAssembly for Sharp library
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };
    
    return config;
  },
  
  // Disable output compression which can help with serverless functions
  compress: false,
  
  // Increase serverless function timeout
  serverRuntimeConfig: {
    // This will be available only on the server side
    PROJECT_ROOT: __dirname,
  },
  
  // Set standalone output for better serverless performance
  output: 'standalone',
};

module.exports = nextConfig;
