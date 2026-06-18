import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Buffer } from 'buffer';
import { apiKey, apiSecret, BASE_URL } from './Consts';
import { startRequestUpdate } from 'idenfy-react-native';

interface Props {
  onBack: () => void;
}

interface State {
  scanRef: string;
  questionnaireId: string;
  additionalStepUploadRequired: boolean;
  message: string;
  sdkFlowComplete: boolean;
}

export default class RequestUpdateScreen extends Component<Props, State> {
  state: State = {
    scanRef: '',
    questionnaireId: '',
    additionalStepUploadRequired: true,
    message: '',
    sdkFlowComplete: false,
  };

  getRequestUpdateToken = (scanRef: string) => {
    let encodedAuth = new Buffer(apiKey + ':' + apiSecret).toString('base64');
    let body: any = {
      additionalStepUploadRequired: this.state.additionalStepUploadRequired,
    };
    if (this.state.questionnaireId.trim().length > 0) {
      body.questionnaire = this.state.questionnaireId;
    }

    return fetch(
      BASE_URL + 'kyc/identifications/' + scanRef + '/request-information/',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + encodedAuth,
        },
        body: JSON.stringify(body),
      }
    )
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((json) => this.startRequestUpdateSDK(json.tokenString));
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

  startRequestUpdateSDK = (authToken: string) => {
    startRequestUpdate({ authToken: authToken })
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
    const scanRefEmpty = this.state.scanRef.trim().length === 0;
    return (
      <View style={styles.root}>
        <TouchableOpacity style={styles.backButton} onPress={this.props.onBack}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Sample iDenfy App</Text>
        <Text style={styles.subtitle}>
          Enter an identification scanRef and begin the request update process!
        </Text>

        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="ScanRef"
            placeholderTextColor="#999"
            value={this.state.scanRef}
            onChangeText={(text) => this.setState({ scanRef: text })}
            maxLength={50}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Questionnaire ID (optional)"
            placeholderTextColor="#999"
            value={this.state.questionnaireId}
            onChangeText={(text) => this.setState({ questionnaireId: text })}
            maxLength={50}
          />
          <View style={styles.switchRow}>
            <Switch
              value={this.state.additionalStepUploadRequired}
              onValueChange={(value) =>
                this.setState({ additionalStepUploadRequired: value })
              }
              trackColor={{ false: '#ccc', true: '#536DFE' }}
              thumbColor="#fff"
            />
            <Text style={styles.switchLabel}>
              Additional Step Upload Required
            </Text>
          </View>
        </View>

        {this.state.sdkFlowComplete ? (
          <Text style={styles.resultMessage}>
            Results: {this.state.message}
          </Text>
        ) : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            disabled={scanRefEmpty}
            onPress={() => this.getRequestUpdateToken(this.state.scanRef)}
          >
            <LinearGradient
              angle={90}
              useAngle={true}
              colors={scanRefEmpty ? ['#ccc', '#ccc'] : ['#536DFE', '#8D6CFB']}
              style={styles.gradient}
            >
              <Text style={styles.buttonTitle}>BEGIN REQUEST UPDATE</Text>
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  switchLabel: {
    fontSize: 14,
    color: '#353B4E',
    marginLeft: 8,
    flexShrink: 1,
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
