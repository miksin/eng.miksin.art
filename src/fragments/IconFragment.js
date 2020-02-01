import { graphql } from "gatsby"

export const IconFragment = graphql`
  fragment IconFragment on File {
    childImageSharp {
      fluid(maxWidth: 32) {
        src
      }
    }
  }
`
