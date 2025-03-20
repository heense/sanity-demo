import { assist } from '@sanity/assist'
import { visionTool } from '@sanity/vision'
import { Config, defineConfig, PluginOptions } from 'sanity'
import { structureTool } from 'sanity/structure'
import { bookmarkInspector } from './components/inspectors/bookmarkInspector'
import personalDashboard from './components/tools/personalDashboard'
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
import { fetchLanguagesMarketsAndPerson } from './utils/fetchLanguagesMarketsAndPerson'

const minimalConfigOptions: Omit<PluginOptions, 'name'> = {
  schema: {
    types: schemaTypes,
    templates: templates,
  },
  document: {
    inspectors: (prev, context) => {
      return [...prev, bookmarkInspector]
    },
  },

  beta: {
    create: {
      startInCreateEnabled: false,
    },
  },
}

const defaultWorkspace = {
  name: 'default',
  title: 'Demo',

  projectId,
  dataset,
  basePath: '/demo',

  ...minimalConfigOptions,
}

/** Async function to fetch all market documents and create a workspace for each market
 *
 * @returns an array of workspace configs for each market and the default workspace
 * @see {@link defaultWorkspace}
 * @see {@link fetchLanguagesMarketsAndPerson}
 */
async function getConfigBasedOnMarkets(): Promise<Config> {
  const languagesMarketsAndPerson = await fetchLanguagesMarketsAndPerson()

  if (!languagesMarketsAndPerson) {
    return [
      {
        ...defaultWorkspace,
        plugins: [
          structureTool({
            structure: (S, context) => customStructure(S, context, null),
          }),
          visionTool(),
          dynamicDocumentInternationalisationConfig,
          fieldLevelInternationalisationConfig,
          assist({
            translate: {
              document: {
                // The name of the field that holds the current language
                // in the form of a language code e.g. 'en', 'fr', 'nb_NO'.
                // Required
                languageField: 'language',
                // Optional extra filter for document types.
                // If not set, translation is enabled for all documents
                // that has a field with the name defined above.
                documentTypes: ['page', 'listOption'],
              },
              field: {
                documentTypes: ['listOption'],
                languages: async (client) => {
                  const response = await client.fetch(`*[_type == "language"]{ id, title }`)
                  return response
                },
              },
            },
          }),
        ],
      },
    ]
  }

  const marketWorkspaces = languagesMarketsAndPerson.markets.map((market) => {
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

        assist({
          translate: {
            document: {
              // The name of the field that holds the current language
              // in the form of a language code e.g. 'en', 'fr', 'nb_NO'.
              // Required
              languageField: 'language',
              // Optional extra filter for document types.
              // If not set, translation is enabled for all documents
              // that has a field with the name defined above.
              documentTypes: ['page', 'listOption'],
            },
            field: {
              documentTypes: ['listOption'],
              languages: market.languages.map((lang) => {
                return { id: lang.code, title: lang.title }
              }),
            },
          },
        }),
      ],
      ...minimalConfigOptions,
    }
  })

  return [
    {
      ...defaultWorkspace,
      plugins: [
        structureTool({
          structure: (S, context) => customStructure(S, context, languagesMarketsAndPerson.person),
        }),
        visionTool(),
        dynamicDocumentInternationalisationConfigForMarkets(languagesMarketsAndPerson.languages),
        fieldLevelInternationalisationConfigLanguages(languagesMarketsAndPerson.languages),
        assist({
          translate: {
            document: {
              // The name of the field that holds the current language
              // in the form of a language code e.g. 'en', 'fr', 'nb_NO'.
              // Required
              languageField: 'language',
              // Optional extra filter for document types.
              // If not set, translation is enabled for all documents
              // that has a field with the name defined above.
              documentTypes: ['page', 'listOption'],
            },
            field: {
              documentTypes: ['listOption'],
              languages: languagesMarketsAndPerson.languages.map((lang) => {
                return { id: lang.code, title: lang.title }
              }),
            },
          },
        }),
      ],
      tools: (prev, context) => [...prev, personalDashboard(languagesMarketsAndPerson, context)],
    },
    ...marketWorkspaces,
  ]
}

const config = await getConfigBasedOnMarkets()

export default defineConfig(config)
