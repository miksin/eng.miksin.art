import {
  GitHub,
  Twitter,
  Instagram,
  PenTool,
  Youtube,
} from "react-feather"

export const featherIcons = {
  github: GitHub,
  twitter: Twitter,
  instagram: Instagram,
  pixiv: PenTool,
  youtube: Youtube,
}

export const devices = {
  mobile: 480,
  tablet: 1024,
  tabletPortrait: 768,
}

export const sizes = {
  icon: 28,
  nav: 72,
  navMobile: 54,
  navButton: 54,
  navButtonMobile: 42,
  buttonPadding: {
    small: '4px 10px',
    normal: '6px 16px',
    large: '8px 22px',
  },
}

// material-ui
// https://material-ui.com/customization/color/
export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  grey: '#424242',
  lightGrey: '#eeeeee',
  red: '#f44336',
  pink: '#e91e63',
  indigo: '#3f51b5',
  blue: '#2196f3',
  purple: '#9c27b0',
  deepPurple: '#673ab7',
  lightBlue: '#03a9f4',
  cyan: '#00bcd4',
  teal: '#009688',
  green: '#4caf50',
  lightGreen: '#8bc34a',
  yellow: '#ffeb3b',
  amber: '#ffc107',
  orange: '#ff9800',
  deepOrange: '#ff5722',
  brown: '#795548',
  lime: '#cddc39',
}

export const palattes = {
  '5hanayome': ['#E2C648', '#C6ABD4', '#95C1E6', '#A5CD6C', '#EE8893'],
}

export const languagues = [
  'en',
  'zh',
  'ja',
]

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
  台湾出身、東京でソフトウェアエンジニアとして働いています。
  web中心に様々なスキルを身につけて、フロントエンド専攻ですが、バックエンド、データベース、及びクラウドなど技術も渉猟します。得意分野はJavascript(React/Vue)、HTML、CSS/SCSSなどことです。
  趣味は絵描く、ゲーム、カラオケ。たまにTwitter、InstagramなどSNSで自分の作品をシェアします。
  `,
}
