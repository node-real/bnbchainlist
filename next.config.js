let commitHash = 'no-git-commit';
try {
  commitHash = process.env.COMMIT_SHA || 'no-git-commit';
} catch (error) {
  console.error(`Get git commit hash failed.`);
}

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_STATIC_HOST || 'https://www.bnbchainlist.org/static' : '',
  generateBuildId: async () => {
    return commitHash;
  },
};
