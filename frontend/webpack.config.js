import { InjectManifest } from 'workbox-webpack-plugin';

module.exports = {
  plugins: [
    new InjectManifest({
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
    })
  ]
};