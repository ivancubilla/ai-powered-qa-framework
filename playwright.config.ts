import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Ejecuta los tests en paralelo para futuros shardeos en CI */
  fullyParallel: true,
  /* Falla rápido en CI si dejaste un test.only olvidado */
  forbidOnly: !!process.env.CI,
  /* Reintentos solo en CI, para no ocultar flakiness en local */
  retries: process.env.CI ? 2 : 0,
  /* Workers por defecto: local usa la mitad de tus núcleos, CI usa 1 */
  workers: process.env.CI ? 1 : undefined,
  /* Reporteros: HTML para ver en local y CI */
  reporter: process.env.CI ? 'blob' : [['html', { open: 'never' }], ['list']],
  
  use: {
    baseURL: 'https://www.saucedemo.com',
    /* Trace on-first-retry: no genera basura en ejecuciones exitosas, 
       solo guarda el trace cuando un test falla y se reintenta */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});