import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Buffer } from 'buffer';
import { apiKey, apiSecret, BASE_URL, selectedFlow } from './Consts';
import { SdkFlow } from './SdkFlow';
import {
  startBankCardVerification,
  IdenfyBankCardVerificationUIBuilder,
} from 'idenfy-react-native';
import { createSampleColorScheme } from './ColorScheme';

interface Props {
  onBack: () => void;
}

interface State {
  expectedName: string;
  expectedLastFour: string;
  message: string;
  sdkFlowComplete: boolean;
}

export default class BankCardVerificationScreen extends Component<
  Props,
  State
> {
  state: State = {
    expectedName: '',
    expectedLastFour: '',
    message: '',
    sdkFlowComplete: false,
  };

  getBankCardVerificationToken = () => {
    let encodedAuth = new Buffer(apiKey + ':' + apiSecret).toString('base64');
    const body: Record<string, any> = {
      expectedName: this.state.expectedName,
      sessionLength: 60,
    };
    if (this.state.expectedLastFour.trim().length > 0) {
      body.expectedLastFour = this.state.expectedLastFour;
    }

    return fetch(BASE_URL + 'bank-card/tokens/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + encodedAuth,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            this.startBankCardVerificationSDK(json.tokenString);
          });
        } else {
          response.json().then((json) => {
            this.setState({
              message:
                'Error getting token, status code is: ' +
                response.status.toString() +
                '\n\nResponse: ' +
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
      });
  };

  startBankCardVerificationSDK = (authToken: String) => {
    let bcvUIBuilder = new IdenfyBankCardVerificationUIBuilder();

    if (selectedFlow === SdkFlow.WithImplementedColors) {
      bcvUIBuilder = bcvUIBuilder.withColorScheme(createSampleColorScheme());
    }

    let bcvUISettings = bcvUIBuilder.build();

    startBankCardVerification({
      authToken: authToken,
      withImmediateRedirect: false,
      idenfyBankCardVerificationUISettings: bcvUISettings.toJson(),
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
    const nameEmpty = this.state.expectedName.trim().length === 0;
    return (
      <View style={styles.root}>
        <TouchableOpacity style={styles.backButton} onPress={this.props.onBack}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Sample iDenfy App</Text>
        <Text style={styles.subtitle}>
          Enter the card holder name and start bank card verification!
        </Text>

        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Expected Name *"
            placeholderTextColor="#999"
            value={this.state.expectedName}
            onChangeText={(text) => this.setState({ expectedName: text })}
            maxLength={100}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Expected Last Four (optional)"
            placeholderTextColor="#999"
            value={this.state.expectedLastFour}
            onChangeText={(text) => this.setState({ expectedLastFour: text })}
            keyboardType="numeric"
            maxLength={4}
          />
        </View>

        {this.state.sdkFlowComplete ? (
          <Text style={styles.resultMessage}>
            Results: {this.state.message}
          </Text>
        ) : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            disabled={nameEmpty}
            onPress={() => this.getBankCardVerificationToken()}
          >
            <LinearGradient
              angle={90}
              useAngle={true}
              colors={nameEmpty ? ['#ccc', '#ccc'] : ['#536DFE', '#8D6CFB']}
              style={styles.gradient}
            >
              <Text style={styles.buttonTitle}>
                BEGIN BANK CARD VERIFICATION
              </Text>
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
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 56,
    marginLeft: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#536DFE',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    color: '#353B4E',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#353B4E',
    marginTop: 16,
    marginHorizontal: 16,
  },
  inputsContainer: {
    width: '100%',
    paddingHorizontal: 32,
    marginTop: 32,
  },
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#353B4E',
    marginBottom: 12,
  },
  resultMessage: {
    textAlign: 'center',
    color: '#536DFE',
    marginTop: 24,
    marginHorizontal: 12,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 32,
    marginBottom: 48,
  },
  button: {
    height: 56,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
