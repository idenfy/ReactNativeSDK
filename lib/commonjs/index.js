"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DocumentCameraFrameVisibility", {
  enumerable: true,
  get: function () {
    return _DocumentCameraFrameVisibility.DocumentCameraFrameVisibility;
  }
});
Object.defineProperty(exports, "DocumentTypeEnum", {
  enumerable: true,
  get: function () {
    return _DocumentTypeEnum.DocumentTypeEnum;
  }
});
Object.defineProperty(exports, "HiddenForAllCountriesAndDocumentTypes", {
  enumerable: true,
  get: function () {
    return _DocumentCameraFrameVisibility.HiddenForAllCountriesAndDocumentTypes;
  }
});
Object.defineProperty(exports, "HiddenForSpecificCountriesAndDocumentTypes", {
  enumerable: true,
  get: function () {
    return _DocumentCameraFrameVisibility.HiddenForSpecificCountriesAndDocumentTypes;
  }
});
Object.defineProperty(exports, "IdenfyBuilder", {
  enumerable: true,
  get: function () {
    return _IdenfyBuilder.IdenfyBuilder;
  }
});
Object.defineProperty(exports, "IdenfyDocumentSelectionType", {
  enumerable: true,
  get: function () {
    return _IdenfyDocumentSelectionType.IdenfyDocumentSelectionType;
  }
});
Object.defineProperty(exports, "IdenfyFaceAuthUIBuilder", {
  enumerable: true,
  get: function () {
    return _IdenfyFaceAuthUIBuilder.IdenfyFaceAuthUIBuilder;
  }
});
Object.defineProperty(exports, "IdenfyFaceAuthUISettings", {
  enumerable: true,
  get: function () {
    return _IdenfyFaceAuthUISettings.IdenfyFaceAuthUISettings;
  }
});
Object.defineProperty(exports, "IdenfyIdentificationResultsUISettingsV2", {
  enumerable: true,
  get: function () {
    return _IdenfyIdentificationResultsUISettingsV.IdenfyIdentificationResultsUISettingsV2;
  }
});
Object.defineProperty(exports, "IdenfyInstructionsEnum", {
  enumerable: true,
  get: function () {
    return _IdenfyInstructionsEnum.IdenfyInstructionsEnum;
  }
});
Object.defineProperty(exports, "IdenfyLocaleEnum", {
  enumerable: true,
  get: function () {
    return _IdenfyLocaleEnum.IdenfyLocaleEnum;
  }
});
Object.defineProperty(exports, "IdenfyOnBoardingViewType", {
  enumerable: true,
  get: function () {
    return _IdenfyOnBoardingViewType.IdenfyOnBoardingViewType;
  }
});
Object.defineProperty(exports, "IdenfySettings", {
  enumerable: true,
  get: function () {
    return _IdenfySettings.IdenfySettings;
  }
});
Object.defineProperty(exports, "IdenfyUIBuilder", {
  enumerable: true,
  get: function () {
    return _IdenfyUIBuilder.IdenfyUIBuilder;
  }
});
Object.defineProperty(exports, "IdenfyUISettings", {
  enumerable: true,
  get: function () {
    return _IdenfyUISettings.IdenfyUISettings;
  }
});
Object.defineProperty(exports, "ImmediateRedirectEnum", {
  enumerable: true,
  get: function () {
    return _ImmediateRedirectEnum.ImmediateRedirectEnum;
  }
});
exports.start = start;
exports.startFaceReAuth = startFaceReAuth;
exports.startRequestUpdate = startRequestUpdate;
var _reactNative = require("react-native");
var _DocumentCameraFrameVisibility = require("./models/DocumentCameraFrameVisibility");
var _DocumentTypeEnum = require("./models/DocumentTypeEnum");
var _IdenfyBuilder = require("./models/IdenfyBuilder");
var _IdenfyDocumentSelectionType = require("./models/IdenfyDocumentSelectionType");
var _IdenfyFaceAuthUIBuilder = require("./models/IdenfyFaceAuthUIBuilder");
var _IdenfyFaceAuthUISettings = require("./models/IdenfyFaceAuthUISettings");
var _IdenfyIdentificationResultsUISettingsV = require("./models/IdenfyIdentificationResultsUISettingsV2");
var _IdenfyInstructionsEnum = require("./models/IdenfyInstructionsEnum");
var _IdenfyLocaleEnum = require("./models/IdenfyLocaleEnum");
var _IdenfyOnBoardingViewType = require("./models/IdenfyOnBoardingViewType");
var _IdenfySettings = require("./models/IdenfySettings");
var _IdenfyUIBuilder = require("./models/IdenfyUIBuilder");
var _IdenfyUISettings = require("./models/IdenfyUISettings");
var _ImmediateRedirectEnum = require("./models/ImmediateRedirectEnum");
const LINKING_ERROR = `The package 'idenfy-react-native' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const IdenfyReactNative = _reactNative.NativeModules.IdenfyReactNative ? _reactNative.NativeModules.IdenfyReactNative : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
function start(config) {
  return IdenfyReactNative.start(config);
}
function startFaceReAuth(config) {
  return IdenfyReactNative.startFaceReAuth(config);
}
function startRequestUpdate(config) {
  return IdenfyReactNative.startRequestUpdate(config);
}

// Export models
//# sourceMappingURL=index.js.map