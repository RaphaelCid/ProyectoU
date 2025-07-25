const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/inspeccion',
        destination: '/presentation/inspeccion',
      },
      {
        source: '/desempeno',
        destination: '/presentation/desempeno',
      },
      {
        source: '/login',
        destination: '/presentation/login',
      },
    ];
  },
};

module.exports = nextConfig;
