import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { dataset, projectId } from './lib/api'
import {
  dynamicDocumentInternationalisationConfig,
  dynamicDocumentInternationalisationConfigForMarkets,
  fieldLevelInternationalisationConfig,
  fieldLevelInternationalisationConfigForMarkets,
  fieldLevelInternationalisationConfigLanguages,
} from './plugins/internationalisation'
import { schemaTypes } from './schemaTypes'
import { templates } from './schemaTypes/templates'
import { customStructure } from './structure'
import { createMarketStructure } from './structure/createMarketStrucure'
import { fetchLanguagesAndMarkets } from './utils/fetchMarkets'

const defaultWorkspace = {
  name: 'default',
  title: 'Demo',

  projectId,
  dataset,
  basePath: '/demo',

  plugins: [
    structureTool({
      structure: customStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: templates,
  },
}

/** Async function to fetch all market documents and create a workspace for each market
 *
 * @returns an array of workspace configs for each market and the default workspace
 * @see {@link defaultWorkspace}
 * @see {@link fetchMarkets}
 */
async function getConfigBasedOnMarkets() {
  const languagesAndMarkets = await fetchLanguagesAndMarkets()

  if (!languagesAndMarkets) {
    return [
      {
        ...defaultWorkspace,
        plugins: defaultWorkspace.plugins.concat([
          dynamicDocumentInternationalisationConfig,
          fieldLevelInternationalisationConfig,
        ]),
      },
    ]
  }

  const marketWorkspaces = languagesAndMarkets.markets.map((market) => {
    return {
      name: `market-${market.code}`,
      title: market.title,
      projectId,
      dataset,
      basePath: `/market-${market.code}`,
      plugins: [
        structureTool({
          structure: (S, context) => createMarketStructure(market, S, context),
        }),
        visionTool(),

        dynamicDocumentInternationalisationConfigForMarkets(market.languages),
        fieldLevelInternationalisationConfigForMarkets(market.languages),
      ],
      schema: {
        types: schemaTypes,
        templates: templates,
      },
    }
  })

  return [
    {
      ...defaultWorkspace,
      plugins: defaultWorkspace.plugins
        .filter(
          (plugin) => plugin.name !== 'document-internationalization' || 'internationalized-array',
        )
        .concat([
          dynamicDocumentInternationalisationConfigForMarkets(languagesAndMarkets.languages),
          fieldLevelInternationalisationConfigLanguages(languagesAndMarkets.languages),
        ]),
    },
    ...marketWorkspaces,
  ]
}

const config = await getConfigBasedOnMarkets()

export default defineConfig(config)
