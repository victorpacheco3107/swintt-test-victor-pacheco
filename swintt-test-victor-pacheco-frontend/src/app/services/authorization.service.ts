import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify, Auth, API } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
import { ICredentials } from '@aws-amplify/core'
import {environment} from "../../environments/environment";

export interface IUser {
  email: string;
  password?: string;
  showPassword?: boolean;
  code?: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure(environment.amplify);
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password || '',
    });
  }

  public resendSignUp(user: IUser): Promise<any> {
    return Auth.resendSignUp(user.email);
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code || '');
  }

  public forgotPassword(user: IUser): Promise<any> {
    return Auth.forgotPassword(user.email);
  }

  public forgotPasswordSubmit(user: IUser): Promise<any> {
    return Auth.forgotPasswordSubmit(user.email, user.code || '', user.password || '');
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
      .then(() => {
        this.authenticationSubject.next(true);
      });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => {
        this.authenticationSubject.next(false);
      });
  }

  googleSocialSignIn():Promise<ICredentials> {
    return Auth.federatedSignIn({
      'provider': CognitoHostedUIIdentityProvider.Google
    });
  }

  facebookSocialSignIn():Promise<ICredentials> {
    return Auth.federatedSignIn({
      'provider': CognitoHostedUIIdentityProvider.Facebook
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        }).catch(() => {
          return false;
        });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
      .then((cognitoUser: any) => {
        return Auth.updateUserAttributes(cognitoUser, user);
      });
  }

  post(){
    const myInit = {
      body: {},
      headers:{},
      queryStringParameters: {
        site_id: 'c615f5ba-31d6-4aab-877a-13c2dc6ea888',
        request_id: '9e637960-44a7-4216-ae55-ea7b8dac2fb3',
        content_creation_type: 'categories'
      },
    };
    return API.get('api', '/contents', myInit)
  }

}
