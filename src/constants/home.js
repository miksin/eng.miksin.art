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
  scrollTitle: 56,
  scrollTitleMobile: 36,
  nav: 72,
  introCardMaxSize: 600,
  introCardAvatarSize: 130,
  altTextSize: 24,
  playlistHeight: 480,
  playlistPanelBtnSize: 32,
}

export const about = {
  'zh': `
  台灣人，現居於日本東京擔任軟體工程師。
  軟體技能以web為中心，主要專攻前端網頁，但對於後端系統、資料庫、雲端領域等皆有涉獵。最擅長JavaScript(React/Vue), HTML, CSS/SCSS等。其他興趣為繪圖、遊戲、卡拉OK等。偶爾也會在Twitter, Instagram等SNS上分享自己的創作。
  `,
  'en': `
  Taiwanese, and being a software engineer in Tokyo.
  Having multiple software skills mainly in web development. Knowing about backend, database, cloud computing, etc., but more accomplished in frontend. Being proficient in developing with JavaScript(React/Vue), HTML, CSS/SCSS, etc..
  Intrested in painting, games and karaoke. And sometimes sharing creations on SNS, such as Twitter and Instagram.
  `,
  'ja': `
  台湾出身、東京にソフトウェアエンジニアとして働いています。
  web中心に様々なスキルを身につけて、フロントエンド専攻ですが、バックエンド、データベース、及びクラウドなど技術も渉猟します。得意分野はJavascript(React/Vue)、HTML、CSS/SCSSなど。
  趣味は絵描く、ゲーム、カラオケなど。たまにTwitter、InstagramなどSNSで自分の作品をシェアします。
  `,
}
