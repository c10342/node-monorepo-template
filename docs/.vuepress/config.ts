import { defaultTheme, defineUserConfig } from "vuepress";

import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({
  // 站点配置
  lang: "zh-CN",
  title: "lin-cli",
  description: "lin-cli",
  plugins: [searchPlugin()],
  markdown: {
    toc: {}
  },
  theme: defaultTheme({
    repo: "c10342/node-monorepo-template",
    editLink: false,
    navbar: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide" }
    ],
    sidebarDepth: 0,
    sidebar: {
      // todo
    }
  })
});
