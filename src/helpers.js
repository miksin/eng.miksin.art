export const scrollToAnchor = (id) => {
  /* eslint-disable no-undef */
  if (!window) return

  const target = document.getElementById(id)
  if (!target) return

  const offset = (target.getBoundingClientRect().top
    - document.body.getBoundingClientRect().top)

  window.scrollTo({
    left: 0,
    top: offset,
    behavior: 'smooth'
  })  
  /* eslint-enable no-undef */
}
