import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import {
  dynamicDocumentInternationalisationConfig,
  fieldLevelInternationalisationConfig,
} from './plugins/internationalisation'
import { schemaTypes } from './schemaTypes'
import { customStructure } from './structure'

export default defineConfig({
  name: 'default',
  title: 'Demo',

  projectId: 'xonzamf8',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: customStructure,
    }),
    visionTool(),

    dynamicDocumentInternationalisationConfig,
    fieldLevelInternationalisationConfig,
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => {
      return prev.concat([
        {
          id: 'internationalised-page',
          title: 'Internationalised Page',
          schemaType: 'page',
          parameters: [{ name: 'language', type: 'string' }],
          value: (params: { language: string }) => {
            return {
              language: params.language,
            }
          },
        },
      ])
    },
  },
})
