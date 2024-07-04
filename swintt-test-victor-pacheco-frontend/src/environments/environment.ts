// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Auth} from "aws-amplify";
import {Constants} from "../app/services/constants";

export const environment = {
  production: false,
  amplify: {
    Auth: {
      userPoolId: 'eu-west-1_C36FXCbyo',
      userPoolWebClientId: '3etap9g1qb77prm7ceh2v6lbm2',
      oauth: {
        domain: 'swintt-test-victor-pacheco.auth.eu-west-1.amazoncognito.com',
        scope: [
          'aws.cognito.signin.user.admin',
          'email',
          'openid',
        ],
        redirectSignIn: 'http://localhost:4200/signin',
        redirectSignOut: 'http://localhost:4200/signout',
        responseType: 'code' // 'code' or 'token', note that REFRESH token will only be generated when the responseType is code
      }
    },
    API: {
      endpoints: [
        {
          name: Constants.API_NOTES_NAME,
          endpoint: 'https://i2vqsr9bwd.execute-api.eu-west-1.amazonaws.com/v1/notes',
          custom_header: async () => {
            return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
          }
        }
      ]
    }
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
