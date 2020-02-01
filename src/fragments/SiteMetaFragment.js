import { graphql } from "gatsby"

export const SiteMetaFragment = graphql`
  fragment SiteMetaFragment on Site {
    siteMetadata {
      title
      subtitles
      description
      author
      links {
        name
        path
      }
      socialLinks {
        name
        link
      }
    }
  }
`
