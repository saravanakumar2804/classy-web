import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run user:serve',
        production: 'nx run user:preview',
      },
      ciWebServerCommand: 'nx run user:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
