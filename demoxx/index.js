import CMS, { init } from 'netlify-cms'

import 'netlify-cms/dist/cms.css'

import { LocalBackend } from '../src/backend'
import { ORYEditorPreview } from '../src/preview'
import config from './config.json'

CMS.registerBackend('local', LocalBackend)

init({ config })

CMS.registerPreviewTemplate('pages', ORYEditorPreview)
