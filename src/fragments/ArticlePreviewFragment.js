import { graphql } from "gatsby"

export const ArticlePreviewFragment = graphql`
  fragment ArticlePreviewFragment on MarkdownRemarkConnection {
    edges {
      node {
        frontmatter {
          path
          title
          excerpt
          tags
          fromNow: date(fromNow: true)
          date: date(formatString: "MMM DD, YYYY")
          featuredImage {
            childImageSharp {
              fluid (maxWidth: 300) {
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
