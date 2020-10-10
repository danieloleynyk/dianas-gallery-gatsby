const path = require(`path`)

exports.onCreatePage = ({ page, actions }) => {
  const { deletePage, createPage } = actions

  return new Promise((resolve) => {
    // if the page component is the index page component
    if (page.componentPath === `${__dirname}/src/pages/index.tsx`) {
      deletePage(page)

      // create a new page but with '/' as path
      createPage({
        ...page,
        path: '/',
      })
    } 

    resolve()
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "content" } }) {
        edges {
          node {
            id
            childMarkdownRemark {
              frontmatter {
                title
                sub_categories {
                  title
                }
              }
            }
          }
        }
      }
    }
  `)

  result.data.allFile.edges.forEach(({ node }) => {
    createPage({
      path: path.join("gallery", String(node.childMarkdownRemark.frontmatter.title).toLowerCase()),
      component: path.resolve(`./src/templates/index.tsx`),
      context: {
        category: node.childMarkdownRemark.frontmatter.title,
      },
    })

    node.childMarkdownRemark.frontmatter.sub_categories.forEach(
      (sub_category) =>
        createPage({
          path: path.join(
            "gallery",
            String(node.childMarkdownRemark.frontmatter.title).toLowerCase(),
            String(sub_category.title).toLowerCase()
          ),
          component: path.resolve(`./src/templates/sub-gallery/index.tsx`),
          context: {
            category: node.childMarkdownRemark.frontmatter.title,
          },
        })
    )
  })
}
