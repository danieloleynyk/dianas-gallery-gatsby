import CMS from 'netlify-cms-app'
import CategoriesPreview from './preview-templates/categories_preview.tsx'
import ContactPreview from './preview-templates/contact_preview.tsx'
import AboutPreview from './preview-templates/about_preview.tsx'

CMS.registerPreviewTemplate('mainPage', CategoriesPreview)
CMS.registerPreviewTemplate('contactPage', ContactPreview)
CMS.registerPreviewTemplate('aboutPage', AboutPreview)
