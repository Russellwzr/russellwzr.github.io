import { useStaticQuery, graphql } from "gatsby"

const useFetchBlogPosts = tagName => {
  const result = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          nodes {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              tag
            }
          }
        }
      }
    `
  )
  const posts = result.allMarkdownRemark.nodes
  if (tagName === "All") return posts
  return posts.filter(post => post.frontmatter.tag === tagName)
}

export default useFetchBlogPosts
