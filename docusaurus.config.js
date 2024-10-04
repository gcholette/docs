// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'gcholette',
  favicon: 'img/favicon.ico',

  url: 'https://docs.gcholette.com',
  baseUrl: '/',

  organizationName: 'gcholette',
  projectName: 'docs',
  onBrokenLinks: 'warn',
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
        blog: {
          blogTitle: 'Blog',
          postsPerPage: 'ALL',
          blogSidebarCount: 'ALL',
          blogDescription: 'Gabriel Cholette-Rioux\'s software dev and CTF blog.'
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
          src: 'img/G_round_medium.png',
          href: 'https://gcholette.com'
        },
        items: [
          { label: 'Blog', position: 'left', to: "blog/" },
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Notes',
            to: 'docs/'
          },
        ],
      },
      prism: {
        theme: require('./src/codethemes/light'),
        darkTheme: require('./src/codethemes/dark'),
        additionalLanguages: ['powershell', 'bash', 'nasm'],
      },
      metadata: [
        { name: 'author', content: 'Gabriel Cholette-Rioux' },
        { name: 'description', property: "og:description", content: 'Gabriel Cholette-Rioux\'s blog and notes' },
      ],
    }),
};

module.exports = config;
