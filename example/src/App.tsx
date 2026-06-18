import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Buffer } from 'buffer';
import { apiKey, apiSecret, BASE_URL, clientId } from './Consts';
import {
  start,
  IdenfyBuilder,
  IdenfyUIBuilder,
  IdenfyDocumentSelectionType,
  IdenfyOnBoardingViewType,
  IdenfyInstructionsEnum,
  ImmediateRedirectEnum,
  IdenfyIdentificationResultsUISettingsV2,
  HiddenForSpecificCountriesAndDocumentTypes,
  IdenfyLocaleEnum,
  DocumentTypeEnum,
} from 'idenfy-react-native';
import RequestUpdateScreen from './RequestUpdateScreen';
import FaceAuthScreen from './FaceAuthScreen';

global.Buffer = Buffer; // very important
export default class App extends Component {
  state = {
    currentScreen: 'main' as 'main' | 'requestUpdate' | 'faceAuth',
    title: 'Sample iDenfy app',
    subtitle: 'Press button to begin identification!',
    buttonTitle: 'BEGIN IDENTIFICATION',
    message: '--',
    sdkToken: '',
    sdkFlowComplete: false,
  };

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
          response.json().then((json) => {
            this.startSDK(json.authToken);
          });
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
  startSDK = (authToken: String) => {
    const idenfyUISettings = new IdenfyUIBuilder()
      .withAdditionalSupportView(true)
      .withIdenfyDocumentSelectionType(
        IdenfyDocumentSelectionType.navigateOnContinueButton
      )
      .withOnBoardingViewType(IdenfyOnBoardingViewType.multipleStatic)
      .withInstructions(IdenfyInstructionsEnum.dialog)
      .withImmediateRedirect(ImmediateRedirectEnum.full)
      .withLanguageSelection(true)
      .withIdenfyIdentificationResultsUISettingsV2(
        new IdenfyIdentificationResultsUISettingsV2(true, true, true)
      )
      .withDocumentCameraFrameVisibility(
        new HiddenForSpecificCountriesAndDocumentTypes({
          US: [DocumentTypeEnum.PASSPORT],
        })
      )
      .withMismatchTagsAlert(true)
      .withCountryAndDocumentSelectionJoined(true)
      .withBottomSheetDialogs(true)
      .build();

    const idenfySettings = new IdenfyBuilder()
      .withSelectedLocale(IdenfyLocaleEnum.EN)
      .withUISettings(idenfyUISettings)
      .withSSLPinning(true)
      .build();

    // Start with Idenfy Settings
    start({
      authToken: authToken,
      idenfySettings: idenfySettings.toJson(),
    })
      // Start without Idenfy Settings
      // start({
      //   authToken: authToken,
      // })
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

  render() {
    if (this.state.currentScreen === 'requestUpdate') {
      return (
        <RequestUpdateScreen
          onBack={() => this.setState({ currentScreen: 'main' })}
        />
      );
    }

    if (this.state.currentScreen === 'faceAuth') {
      return (
        <FaceAuthScreen
          onBack={() => this.setState({ currentScreen: 'main' })}
        />
      );
    }

    return (
      <View style={styles.root}>
        <Text style={styles.title}>{this.state.title}</Text>
        <Text style={styles.subtitle}>{this.state.subtitle}</Text>
        {this.state.sdkFlowComplete ? (
          <Text style={styles.resultMessage}>
            Results: {this.state.message}
          </Text>
        ) : null}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => this.setState({ currentScreen: 'requestUpdate' })}
          >
            <LinearGradient
              angle={90}
              useAngle={true}
              colors={['#536DFE', '#8D6CFB']}
              style={styles.gradient}
            >
              <Text style={styles.buttonTitle}>BEGIN REQUEST UPDATE</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => this.setState({ currentScreen: 'faceAuth' })}
          >
            <LinearGradient
              angle={90}
              useAngle={true}
              colors={['#536DFE', '#8D6CFB']}
              style={styles.gradient}
            >
              <Text style={styles.buttonTitle}>BEGIN FACE AUTHENTICATION</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => this.getAuthToken()}
          >
            <LinearGradient
              angle={90}
              useAngle={true}
              colors={['#536DFE', '#8D6CFB']}
              style={styles.gradient}
            >
              <Text style={styles.buttonTitle}>{this.state.buttonTitle}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    color: '#353B4E',
    marginTop: 64,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#353B4E',
    marginTop: 24,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    right: 32,
  },
  bottomButton: {
    height: 56,
    marginBottom: 12,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  resultMessage: {
    textAlign: 'center',
    color: '#536DFE',
    marginTop: 36,
    margin: 12,
  },
});
