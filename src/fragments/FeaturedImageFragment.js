import { graphql } from "gatsby"

export const Fragment = graphql`
  fragment FeaturedImageFragment on File {
    childImageSharp {
      fluid(maxWidth: 500) {
        src
      }
    }
  }
`
