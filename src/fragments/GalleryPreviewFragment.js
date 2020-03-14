import { graphql } from "gatsby"

export const GalleryPreviewFragment = graphql`
  fragment GalleryPreviewFragment on MarkdownRemarkConnection {
    edges {
      node {
        frontmatter {
          path
          title
          fromNow: date(fromNow: true)
          date: date(formatString: "MMM DD, YYYY")
          featuredImage {
            childImageSharp {
              fluid (maxHeight: 500) {
                src
                aspectRatio
              }
            }
          }
        }
      }
    }
  }
`
