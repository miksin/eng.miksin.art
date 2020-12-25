import ModelImage from "@models/Image"

export default class Frontmatter {
  constructor(frontmatter = {}) {
    this.path = frontmatter.path || ''
    this.title = frontmatter.title || ''
    this.excerpt = frontmatter.excerpt || ''
    this.tags = frontmatter.tags || []
    this.fromNow = frontmatter.fromNow || ''
    this.date = frontmatter.date || ''
    this.featuredImage = new ModelImage(frontmatter.featuredImage)
  }
}
