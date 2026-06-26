"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IdenfyUIBuilder = void 0;
var _IdenfyUISettings = require("./IdenfyUISettings");
class IdenfyUIBuilder {
  withAdditionalSupportView(isAdditionalSupportEnabled) {
    this.isAdditionalSupportEnabled = isAdditionalSupportEnabled;
    return this;
  }
  withOnBoardingViewType(idenfyOnBoardingViewType) {
    this.idenfyOnBoardingViewType = idenfyOnBoardingViewType;
    return this;
  }
  withIdenfyDocumentSelectionType(idenfyDocumentSelectionType) {
    this.idenfyDocumentSelectionType = idenfyDocumentSelectionType;
    return this;
  }
  withLanguageSelection(isLanguageSelectionNeeded) {
    this.isLanguageSelectionNeeded = isLanguageSelectionNeeded;
    return this;
  }
  withInstructions(idenfyInstructionsEnum) {
    this.idenfyInstructionsEnum = idenfyInstructionsEnum;
    return this;
  }
  withIdenfyIdentificationResultsUISettingsV2(idenfyIdentificationResultsUISettingsV2) {
    this.idenfyIdentificationResultsUISettingsV2 = idenfyIdentificationResultsUISettingsV2;
    return this;
  }
  withImmediateRedirect(immediateRedirectEnum) {
    this.immediateRedirectEnum = immediateRedirectEnum;
    return this;
  }
  withMismatchTagsAlert(mismatchTagsAlert) {
    this.mismatchTagsAlert = mismatchTagsAlert;
    return this;
  }
  withDocumentCameraFrameVisibility(documentCameraFrameVisibility) {
    this.documentCameraFrameVisibility = documentCameraFrameVisibility;
    return this;
  }
  withCountryAndDocumentSelectionJoined(countryAndDocumentSelectionJoined) {
    this.countryAndDocumentSelectionJoined = countryAndDocumentSelectionJoined;
    return this;
  }
  withBottomSheetDialogs(useBottomSheetDialogs) {
    this.useBottomSheetDialogs = useBottomSheetDialogs;
    return this;
  }
  build() {
    return new _IdenfyUISettings.IdenfyUISettings(this.isAdditionalSupportEnabled, this.idenfyOnBoardingViewType, this.idenfyDocumentSelectionType, this.isLanguageSelectionNeeded, this.idenfyInstructionsEnum, this.idenfyIdentificationResultsUISettingsV2, this.immediateRedirectEnum, this.mismatchTagsAlert, this.documentCameraFrameVisibility, this.countryAndDocumentSelectionJoined, this.useBottomSheetDialogs);
  }
}
exports.IdenfyUIBuilder = IdenfyUIBuilder;
//# sourceMappingURL=IdenfyUIBuilder.js.map