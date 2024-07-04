import {Auth} from "aws-amplify";
import {Constants} from "../app/services/constants";

export const environment = {
  production: true,
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
        redirectSignIn: 'https://dfdu9q1px04yi.cloudfront.net/signin',
        redirectSignOut: 'https://dfdu9q1px04yi.cloudfront.net/signout',
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
