/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: '/',
    src: '/build',
    lib: '/lib',
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-sass',
  ],
  devOptions: {
    port: 7767,
  },
};
