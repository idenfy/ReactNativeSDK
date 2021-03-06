## Table of contents
- [Getting started](#getting-started)
    - [1. Obtaining an authentication token](#1-obtaining-an-authentication-token)
    - [2. Adding Idenfy React Native SDK](#2-adding-idenfy-react-native-sdk)
        - [2.1 Availability information & new project setup](#21-availability-information--new-project-setup)
        - [2.2 Adding SDK dependency through npm](#22-adding-sdk-dependency-through-npm)
        - [2.3 Configure Android project](#23-configure-android-project)
        - [2.4 Configure IOS project](#24-configure-ios-project)
*   [Usage](#usage)
*   [Callbacks](#callbacks)
*   [Additional customization](#additional-customization)
*   [SDK Integration tutorials](#sdk-integration-tutorials)


## Getting started

The @idenfy/react-native-sdk SDK tool is an official React Native plugin, which provides an easier integration of iDenfy KYC services.

### 1. Obtaining an authentication token

The SDK requires token for starting initialization. [Token generation guide](https://github.com/idenfy/Documentation/blob/master/pages/GeneratingIdentificationToken.md)
### 2. Adding Idenfy React Native SDK
#### 2.1 Availability information & new project setup
Minimum required versions by the platform:

**React Native - 0.60**

**IOS - 9.00**

**Android - API 19**

If you are starting a new React Native project you can follow [environment setup guide](https://reactnative.dev/docs/environment-setup).
Once the setup completed successfully, you can initialize a new project with CLI:

```shell
$ npx react-native init AwesomeProject
```

#### 2.2 Adding SDK dependency through npm

Navigate to the root directory of your React Native project. The rest of this second section will assume you are in the root directory. 
Run the following command:

```shell
$ npm install @idenfy/react-native-sdk --save
```

#### 2.3 Configure Android project

##### Manually update build files without the script
Add the maven link `android/build.gradle`:
```gradle
allprojects {
  repositories {
    maven { url 'https://jitpack.io' }
  }
}
```

Enable multidex in `android/app/build.gradle`:
```gradle
android {
  defaultConfig {
     multiDexEnabled true
  }
}
```
#### 2.4 Configure IOS project

`NSCameraUsageDescription' must be provided in the application's 'Info.plist' file:
```xml
<key>NSCameraUsageDescription</key>
<string>Required for document and facial capture</string>
```

Install the pods:
```bash
cd ios
pod install
cd ..
```

## Usage

After successful integration you should be able to call IdenfyReactNative.start method.

If project is not successfully compiled or runtime issues occurs, make sure you have followed the steps. For better understanding you may check at the sample app in this repository.

Once you have an authentication token, which can be retried with following code, found in the example app, you can call IdenfyReactNative.start:

```typescript jsx
getAuthToken = () => {
    let encodedAuth = new Buffer(apiKey + ':' + apiSecret).toString('base64');
    return fetch(BASE_URL + 'api/v2/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + encodedAuth,
      },
      body: JSON.stringify({
        clientId: clientId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => this.startSDK(json.authToken));
        } else {
          response.json().then((json) => {
            console.log(json);
            this.setState({
              message:
                'Error getting authToken, status code is: ' +
                response.status.toString() +
                '\n \n Response: ' +
                JSON.stringify(json),
              sdkFlowComplete: true,
            });
          });
        }
      })
      .catch((error) => {
        this.setState({
          message: error.message,
          sdkFlowComplete: true,
        });
        console.error(error);
      });
  };
```
Calling IdenfyReactNative.start with provided authToken:


```typescript jsx
 startSDK = (authToken: String) => {
    IdenfyReactNative.start({
      authToken: authToken,
    })
      .then((response) => {
        this.setState({
          message: JSON.stringify(response),
          sdkFlowComplete: true,
        });
      })
      .catch((error) => {
        this.setState({
          message: error.code + ': ' + error.message,
          sdkFlowComplete: true,
        });
      });
  };
```
## Callbacks

Callback from the SDK can be retrieved from IdenfyReactNative.start promise:
````typescript jsx
IdenfyReactNative.start({
      authToken: authToken,
    })
      .then((response) => {
        this.setState({
          message: JSON.stringify(response),
          sdkFlowComplete: true,
        });
      })
````
Result will have a following JSON structure:

```javascript
{
    "autoIdentificationStatus": "APPROVED",
    "manualIdentificationStatus": "APPROVED"
}
```

Information about the IdenfyIdentificationResult **autoIdentificationStatus** statuses:

|Name            |Description
|-------------------|------------------------------------
|`APPROVED`   |The user completed an identification flow and the identification status, provided by an automated platform, is APPROVED.
|`FAILED`|The user completed an identification flow and the identification status, provided by an automated platform, is FAILED.
|`UNVERIFIED`   |The user did not complete an identification flow and the identification status, provided by an automated platform, is UNVERIFIED. 

Information about the IdenfyIdentificationResult **manualIdentificationStatus** statuses:

|Name            |Description
|-------------------|------------------------------------
|`APPROVED`   |The user completed an identification flow and was verified manually while waiting for the manual verification results in the iDenfy SDK. The identification status, provided by a manual review, is APPROVED.
|`FAILED`|The user completed an identification flow and was verified manually while waiting for the manual verification results in the iDenfy SDK. The identification status, provided by a manual review, is FAILED.
|`WAITING`|The user completed an identification flow and started waiting for the manual verification results in the iDenfy SDK. Then he/she decided to stop waiting and pressed a "BACK TO ACCOUNT" button. The manual identification review is **still ongoing**.
|`INACTIVE`   |The user was only verified by an automated platform, not by a manual reviewer. The identification performed by the user can still be verified by the manual review if your system uses the manual verification service.

*Note
The manualIdentificationStatus status always returns INACTIVE status, unless your system implements manual identification callback, but does not create **a separate waiting screen** for indicating about the ongoing manual identity verification process.
For better customization we suggest using the [immediate redirect feature ](#customizing-results-callbacks-v2-optional). As a result, the user will not see an automatic identification status, provided by iDenfy service. The SDK will be closed while showing loading indicators.

## Additional customization
Currently, @idenfy/react-native-sdk plugin does not provide customization options via React Native code directly. For any additional SDK customization you should edit native code inside of the plugin.

**Android customization:**
Follow [Android native SDK](https://github.com/idenfy/Documentation/blob/master/pages/ANDROID-SDK.md#customizing-sdk-v2-optional) guide and edit **IdenfyReactNativeModule.kt**.

**IOS customization:**
Follow [IOS native SDK guide](https://github.com/idenfy/Documentation/blob/master/pages/ios-sdk.md#customizing-sdk-v2-optional) and edit **IdenfyReactNative.swift**.

## SDK Integration tutorials
For more information visit [SDK integration tutorials](https://github.com/idenfy/Documentation/blob/master/pages/tutorials/mobile-sdk-tutorials.md).









