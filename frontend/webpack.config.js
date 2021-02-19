import { InjectManifest } from 'workbox-webpack-plugin';

module.exports = {
  plugins: [
    new InjectManifest({
      swSrc: './src/service-worker.ts',
      swDest: `${process.env.PUBLIC_URL}/service-worker.js`,
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
    })
  ]
};