/*
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

import * as React from 'react';
import { Component } from 'react';

import { I18n, ConsoleLogger as Logger } from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import AmplifyTheme from '../../Amplify-UI/Amplify-UI-Theme';
import { oAuthSignInButton } from '@aws-amplify/ui';
import { 
    SignInButton, 
    SignInButtonContent
} from '../../Amplify-UI/Amplify-UI-Components-React';
import Constants from '../common/constants';

const logger = new Logger('withOAuth');

export default function withOAuth(Comp, options) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.signIn = this.signIn.bind(this);
        }

        signIn(provider) {
            Auth.federatedSignIn(
                provider
                  ?{provider}
                  :undefined
            );
        }

        render() {
            return (
                <Comp {...this.props} OAuthSignIn={this.signIn} />
            );
        }
    };
}

const Button = (props) => (
    <SignInButton
        id={oAuthSignInButton}
        onClick={() => props.OAuthSignIn()}
        theme={props.theme || AmplifyTheme}
        variant={'oAuthSignInButton'}
    >
        <SignInButtonContent theme={props.theme || AmplifyTheme}>
            {I18n.get(props.label || 'Sign in with AWS')}
        </SignInButtonContent>
    </SignInButton>
);

export const OAuthButton = withOAuth(Button);
