/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

/*
 * Check hightlight themes from prism:
 * https://github.com/PrismJS/prism/tree/1d5047df37aacc900f8270b1c6215028f6988eb1/themes
*/
import("prismjs/themes/prism-solarizedlight.css")

import("./src/styles/index.scss")

/* eslint-disable no-undef */
import("react-loader-spinner/dist/loader/css/react-spinner-loader.css")
export const onClientEntry = () => {
  window.onload = () => {
    document.getElementById('___loader').style.display = 'none'
  }
}
