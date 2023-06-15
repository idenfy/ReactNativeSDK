import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Buffer } from 'buffer';
import {
  apiKey,
  apiSecret,
  BASE_URL,
  clientId,
  scanRef,
  authenticationMethod,
} from './Consts';
import { start, startFaceReAuth } from 'idenfy-react-native';
global.Buffer = Buffer; // very important
export default class App extends Component {
  state = {
    title: 'Sample iDenfy app',
    subtitle: 'Press button to begin identification!',
    buttonTitle: 'BEGIN IDENTIFICATION',
    faceAuthButtonTitle: 'BEGIN FACE AUTHENTICATION',
    message: '--',
    sdkToken: '',
    sdkFlowComplete: false,
  };

  getFaceAuthTokenType = () => {
    let encodedAuth = new Buffer(apiKey + ':' + apiSecret).toString('base64');
    return fetch(
      BASE_URL +
        'identification/facial-auth/' +
        scanRef +
        '/check-status/?method=' +
        authenticationMethod,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + encodedAuth,
        },
      }
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          response.json().then((json) => {
            switch (json.type) {
              case 'AUTHENTICATION':
                //The user can authenticate by face
                this.getAuthTokenForFaceAuth(json.type);
                break;
              case 'ENROLLMENT':
                //The user must perform an enrollment, since the identification was performed with an older face tec version
                this.getAuthTokenForFaceAuth(json.type);
                break;
              default:
                //The user must perform an identification
                break;
            }
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

  getAuthTokenForFaceAuth = (type: String) => {
    let encodedAuth = new Buffer(apiKey + ':' + apiSecret).toString('base64');
    return fetch(BASE_URL + 'partner/authentication-info', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + encodedAuth,
      },
      body: JSON.stringify({
        scanRef: scanRef,
        type: type,
        method: authenticationMethod,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          response.json().then((json) => this.startFaceAuthSDK(json.token));
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
  startFaceAuthSDK = (authToken: String) => {
    startFaceReAuth({
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
    start({
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

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.title}>{this.state.title}</Text>
        <Text style={styles.subtitle}>{this.state.subtitle}</Text>
        <TouchableOpacity
          style={styles.button}
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
        <TouchableOpacity
          style={styles.faceAuthButton}
          onPress={() => this.getFaceAuthTokenType()}
        >
          <LinearGradient
            angle={90}
            useAngle={true}
            colors={['#536DFE', '#8D6CFB']}
            style={styles.gradient}
          >
            <Text style={styles.buttonTitle}>
              {this.state.faceAuthButtonTitle}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        {this.state.sdkFlowComplete ? (
          <Text style={styles.resultMessage}>
            Results: {this.state.message}
          </Text>
        ) : null}
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
  button: {
    position: 'absolute',
    bottom: 0,
    height: 56,
    left: 0,
    right: 0,
    margin: 32,
    marginBottom: 48,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  faceAuthButton: {
    position: 'absolute',
    bottom: 0,
    height: 56,
    left: 0,
    right: 0,
    margin: 32,
    marginBottom: 116,
  },
  faceAuthButtonTitle: {
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
