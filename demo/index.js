import CMS, { init } from 'netlify-cms';

import 'netlify-cms/dist/cms.css';

import { ORYEditorPreview } from '../src/preview';

init({
  config: {
    backend: {
      name: 'test-repo'
    },
    // publish_mode: 'editorial_workflow',
    media_folder: 'demo/media',
    public_folder: '/media',
    collections: [
      {
        name: 'pages',
        label: 'Pages',
        folder: 'demo/content/pages',
        create: true,
        fields: [
          {
            label: 'Title',
            name: 'title',
            widget: 'string'
          },
          {
            label: 'Authors',
            name: 'authors',
            widget: 'list',
            fields: [
              {
                label: 'Name',
                name: 'name',
                widget: 'string'
              }
            ]
          }
        ]
      }
    ]
  }
});

CMS.registerPreviewTemplate('pages', ORYEditorPreview);
