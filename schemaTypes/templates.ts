import { ConfigContext, Template, TemplateResolver } from 'sanity'

export const templates: TemplateResolver = (prev: Template<any, any>[], context: ConfigContext) => [
  ...prev,
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
]
