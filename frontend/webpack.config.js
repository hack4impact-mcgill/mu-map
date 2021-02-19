import { GenerateSW } from 'workbox-webpack-plugin';

module.exports = {
  plugins: [
    new GenerateSW({
      swSrc: './src/service-worker.ts',
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
    })
  ]
};