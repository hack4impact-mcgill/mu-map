import { InjectManifest } from 'workbox-webpack-plugin';

module.exports = {
  plugins: [
    new InjectManifest({
      swSrc: './src/service-worker.ts',
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
    })
  ]
};