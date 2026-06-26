"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IdenfyFaceAuthUIBuilder = void 0;
var _IdenfyFaceAuthUISettings = require("./IdenfyFaceAuthUISettings");
class IdenfyFaceAuthUIBuilder {
  constructor(isLanguageSelectionNeeded = true, skipOnBoardingView = false) {
    this.isLanguageSelectionNeeded = isLanguageSelectionNeeded;
    this.skipOnBoardingView = skipOnBoardingView;
  }
  withLanguageSelection(isLanguageSelectionNeededParam) {
    this.isLanguageSelectionNeeded = isLanguageSelectionNeededParam;
    return this;
  }
  withOnBoardingView(isOnBoardingViewNeededParam) {
    this.skipOnBoardingView = !isOnBoardingViewNeededParam;
    return this;
  }
  build() {
    let idenfyFaceAuthUISettingsV2 = new _IdenfyFaceAuthUISettings.IdenfyFaceAuthUISettings();
    idenfyFaceAuthUISettingsV2.isLanguageSelectionNeeded = this.isLanguageSelectionNeeded;
    idenfyFaceAuthUISettingsV2.skipOnBoardingView = this.skipOnBoardingView;
    return idenfyFaceAuthUISettingsV2;
  }
}
exports.IdenfyFaceAuthUIBuilder = IdenfyFaceAuthUIBuilder;
//# sourceMappingURL=IdenfyFaceAuthUIBuilder.js.map