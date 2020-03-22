import { languagues } from "./constants/common"

export const scrollToAnchor = (id, offset = 0) => {
  /* eslint-disable no-undef */
  if (!window) return

  const target = document.getElementById(id)
  if (!target) return

  const top = (target.getBoundingClientRect().top
    - document.body.getBoundingClientRect().top)

  window.scrollTo({
    left: 0,
    top: top - offset,
    behavior: 'smooth',
  })  
  /* eslint-enable no-undef */
}

export const formatText = (text) => {
  return text.trim().replace(/\s*(\r)?\n\s*/g, '<br />').replace(/\s+/g, ' ')
}

export const assignLanguages = () => {
  let lang = languagues[0] || 'en'
  /* eslint-disable no-undef */
  if (!window) return lang
  const candidates = window.navigator.languages
  /* eslint-enable no-undef */

  for (let i = 0; i < candidates.length; i++) {
    for (let j = 0; j < languagues.length; j++) {
      if (candidates[i].toLowerCase().indexOf(languagues[j]) !== -1) {
        return languagues[j]
      }
    }
  }

  return lang
}

export const toDualColors = (stringOrArray) => {
  if (Array.isArray(stringOrArray)) {
    if (stringOrArray.length > 1)
      return stringOrArray
    return [stringOrArray[0], stringOrArray[0]]
  }
  return [stringOrArray, stringOrArray]
}

export const hexToRgba = (hex, alpha = 1) => {
  // #FFFFFF -> rgba(255, 255, 255, 1)
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
