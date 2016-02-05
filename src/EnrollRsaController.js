/*!
 * Okta Sign-In Widget SDK LEGAL NOTICES
 *
 * The Okta software accompanied by this notice is provided pursuant to the
 * following terms:
 *
 * Copyright © 2015, Okta, Inc. Licensed under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable
 * law or agreed to in writing, software distributed under the License is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * The Okta software accompanied by this notice has build dependencies on
 * certain third party software licensed under separate terms ("Third Party
 * Components").
 *
 * Okta makes the following disclaimers regarding the Third Party Components on
 * behalf of itself, the copyright holders, contributors, and licensors of such
 * Third Party Components:
 * TO THE FULLEST EXTENT PERMITTED UNDER APPLICABLE LAW, THE THIRD PARTY
 * COMPONENTS ARE PROVIDED BY THE COPYRIGHT HOLDERS, CONTRIBUTORS, LICENSORS,
 * AND OKTA "AS IS" AND ANY REPRESENTATIONS OR WARRANTIES OF ANY KIND, WHETHER
 * ORAL OR WRITTEN, WHETHER EXPRESS, IMPLIED, OR ARISING BY STATUTE, CUSTOM,
 * COURSE OF DEALING, OR TRADE USAGE, INCLUDING WITHOUT LIMITATION THE IMPLIED
 * WARRANTIES OF TITLE, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
 * NON-INFRINGEMENT, ARE DISCLAIMED. IN NO EVENT WILL THE COPYRIGHT OWNER,
 * CONTRIBUTORS, LICENSORS, OR OKTA BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 * OR PROFITS; OR BUSINESS INTERRUPTION), HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE THIRD
 * PARTY COMPONENTS, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

define([
  'okta',
  'util/FormType',
  'util/FormController',
  'views/enroll-factors/Footer',
  'views/shared/TextBox'
],
function (Okta, FormType, FormController, Footer, TextBox) {
  var _ = Okta._;

  return FormController.extend({
    className: 'enroll-rsa',
    Model: {
      props: {
        credentialId: ['string', true],
        passCode: ['string', true],
        factorId: 'string'
      },
      save: function () {
        return this.settings.getAuthClient().current
          .getFactorByTypeAndProvider('token', 'RSA')
          .enrollFactor({
            passCode: this.get('passCode'),
            profile: {credentialId: this.get('credentialId')}
          })
          .fail(_.bind(function (err) {
            this.trigger('error', this, err.xhr);
          }, this));
      }
    },

    Form: {
      title: Okta.loc('factor.totpHard.rsaSecurId', 'login'),
      noButtonBar: true,
      autoSave: true,
      className: 'enroll-rsa',
      formChildren: [
        FormType.Input({
          name: 'credentialId',
          type: 'text',
          input: TextBox,
          placeholder: Okta.loc('enroll.rsa.username.placeholder', 'login'),
          params: {
            innerTooltip: Okta.loc('enroll.rsa.username.tooltip', 'login')
          }
        }),
        FormType.Input({
          name: 'passCode',
          type: 'text',
          input: TextBox,
          placeholder: Okta.loc('enroll.rsa.passcode.placeholder', 'login'),
          params: {
            innerTooltip: Okta.loc('enroll.rsa.passcode.tooltip', 'login')
          }
        }),
        FormType.Toolbar({
          noCancelButton: true,
          save: Okta.loc('mfa.challenge.verify', 'login')
        })
      ]
    },

    Footer: Footer

  });

});