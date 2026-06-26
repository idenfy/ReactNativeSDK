"use strict";

import { IdenfyFaceAuthUISettings } from './IdenfyFaceAuthUISettings';
export class IdenfyFaceAuthUIBuilder {
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
    let idenfyFaceAuthUISettingsV2 = new IdenfyFaceAuthUISettings();
    idenfyFaceAuthUISettingsV2.isLanguageSelectionNeeded = this.isLanguageSelectionNeeded;
    idenfyFaceAuthUISettingsV2.skipOnBoardingView = this.skipOnBoardingView;
    return idenfyFaceAuthUISettingsV2;
  }
}
//# sourceMappingURL=IdenfyFaceAuthUIBuilder.js.map