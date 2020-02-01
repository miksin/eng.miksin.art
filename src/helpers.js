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
    behavior: 'smooth'
  })  
  /* eslint-enable no-undef */
}
