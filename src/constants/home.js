import * as common from "./common"

export const devices = common.devices

// material-ui
// https://material-ui.com/customization/color/
export const colors = common.colors

export const icons = common.featherIcons

export const sizes = {
  ...common.sizes,
  title: 36,
  subtitle: 24,
  entryLink: 42,
  scrollTitle: 64,
  scrollTitleMobile: 36,
  nav: 72,
}

export const about = {
  'tw': `
  台灣人，現居於日本東京擔任軟體工程師。
  軟體技能以web為中心，主要專攻前端網頁，但對於後端系統、資料庫、雲端領域等皆有涉獵。最擅長JavaScript(React/Vue), HTML, CSS/SCSS等。
  其他興趣為繪圖、遊戲、卡拉OK等。偶爾也會在Twitter, Instagram等SNS上分享自己的創作。
  `,
  'en': `
  Taiwanese, and being a software engineer in Tokyo.
  Having multiple software skills mainly in web development. Knowing about backend, database, cloud computing, etc., but more accomplished in frontend. Being proficient in develping with JavaScript(React/Vue), HTML, CSS/SCSS, etc..
  Intrested in painting, games and karaoke and sometimes sharing creations on SNS, such as Twitter and Instagram.
  `,
  'jp': `
  台湾出身、東京にソフトウェアエンジニアとして働いている。
  web中心に様々なスキルを身につける。フロントエンド専攻ですが、バックエンド、データベース、及びクラウドなどことも渉猟した。得意分野はJavascript(React/Vue)、HTML、CSS/SCSSなど。
  趣味は絵描く、ゲーム、カラオケなど。たまにTwitter、InstagramなどSNSで自分の作品をシェアする。
  `,
}
