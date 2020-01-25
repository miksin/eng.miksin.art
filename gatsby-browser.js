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
export const onClientEntry = async () => {
  const leastLoaderTime = 3000
  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => resolve(), leastLoaderTime)
  })
  const onloadPromise = new Promise((resolve) => {
    window.addEventListener('load', () => resolve())
  })
  await Promise.all([timeoutPromise, onloadPromise])
  const loader = document.getElementById('___loader')
  loader.style.opacity = 0
  loader.style.pointerEvents = 'none'
}
