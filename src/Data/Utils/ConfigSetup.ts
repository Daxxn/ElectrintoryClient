import devConfig from '../../.authConfig.json';

export type Config = {
   env: string;
   domain: string;
   clientId: string;
   audience: string;
   scope: string;
   serverUrl: string;
};

export default class ConfigSetup {
   private static config: Config | null = null;

   static get() {
      if (this.config) {
         return this.config;
      } else {
         return this.build();
      }
   }

   private static build(): Config {
      if (process.env.NODE_ENV === 'development') {
         return {
            env: process.env.NODE_ENV,
            domain: devConfig.domain,
            clientId: devConfig.clientId,
            audience: devConfig.audience,
            scope: devConfig.scope,
            serverUrl: devConfig.serverUrl,
         };
      } else if (process.env.NODE_ENV === 'production') {
         return {
            env: process.env.NODE_ENV,
            domain: process.env.REACT_APP_DOMAIN ?? '',
            clientId: process.env.REACT_APP_CLIENTID ?? '',
            audience: process.env.REACT_APP_AUDIENCE ?? '',
            scope: process.env.REACT_APP_SCOPE ?? '',
            serverUrl: process.env.REACT_APP_SERVER_URL ?? '',
         };
      }
      // Test Env
      // TODO - Switch out with a test mode.
      return {
         env: process.env.NODE_ENV,
         domain: devConfig.domain,
         clientId: devConfig.clientId,
         audience: devConfig.audience,
         scope: devConfig.scope,
         serverUrl: devConfig.serverUrl,
      };
   }
}
