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
    } else if (page.componentPath === `${__dirname}/src/pages/contact/index.tsx`) {
      deletePage(page)

      // create a new page but with '/' as path
      createPage({
        ...page,
        path: '/contact',
      })
    } 

    resolve()
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "galleries" } }) {
        edges {
          node {
            id
            childMarkdownRemark {
              frontmatter {
                categories {
                  name
                  sub_categories {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  result.data.allFile.edges.forEach(({ node }) => {

    node.childMarkdownRemark.frontmatter.categories.forEach((category) => {
      createPage({
        path: path.join("gallery", String(category.name).toLowerCase()),
        component: path.resolve(`./src/templates/main_gallery.tsx`),
      })

      category.sub_categories.forEach(
        (sub_category) =>
          createPage({
            path: path.join(
              "gallery",
              String(category.name).toLowerCase(),
              String(sub_category.name).toLowerCase()
            ),
            component: path.resolve(`./src/templates/sub-gallery/index.tsx`),
          })
      )
    })
  })
}
