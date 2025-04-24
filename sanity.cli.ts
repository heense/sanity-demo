import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,

  /**
   * This is needed for the top level await to work during build time.
   */
  vite: (config: any) => {
    return {
      ...config,
      build: {
        ...config.build,
        target: 'esnext',
      },
    }
  },
})
