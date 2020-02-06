import { graphql } from "gatsby"

export const ArticlePreviewFragment = graphql`
  fragment ArticlePreviewFragment on MarkdownRemarkConnection {
    edges {
      node {
        frontmatter {
          path
          title
          excerpt
          fromNow: date(fromNow: true)
          date: date(formatString: "YYYY-MM-DD")
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
