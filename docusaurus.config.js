// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Docs',
  favicon: 'img/favicon.ico',

  url: 'https://docs.gcholette.com',
  baseUrl: '/',

  organizationName: 'gcholette',
  projectName: 'docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.png',
      navbar: {
        logo: {
          alt: 'docs-logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
        ],
      },
      prism: {
        theme: require('./src/codethemes/light'),
        darkTheme: require('./src/codethemes/dark'),
      },
    }),
};

module.exports = config;
