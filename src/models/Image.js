export default class Image {
  constructor(data = {}) {
    this.childImageSharp = {...data.childImageSharp}
    this.childImageSharp.fluid = {...this.childImageSharp.fluid}
    this.childImageSharp.fluid.src = this.childImageSharp.fluid.src || ''
    const aspectRatio = Number(this.childImageSharp.fluid.aspectRatio)
    this.childImageSharp.fluid.aspectRatio = isNaN(aspectRatio) ? 1.0 : aspectRatio
  }

  get src() {
    return this.childImageSharp.fluid.src
  }

  get aspectRatio () {
    return this.childImageSharp.fluid.aspectRatio
  }

  get inverseRatio() {
    return this.aspectRatio === 0 ? 0.0 : 1.0 / this.aspectRatio
  }
}
