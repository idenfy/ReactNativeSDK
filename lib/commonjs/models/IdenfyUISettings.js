"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IdenfyUISettings = void 0;
class IdenfyUISettings {
  constructor(isAdditionalSupportEnabled, idenfyOnBoardingViewType, idenfyDocumentSelectionType, isLanguageSelectionNeeded, idenfyInstructionsEnum, idenfyIdentificationResultsUISettingsV2, immediateRedirectEnum, mismatchTagsAlert, documentCameraFrameVisibility, withCountryAndDocumentSelectionJoined, useBottomSheetDialogs) {
    this.isAdditionalSupportEnabled = isAdditionalSupportEnabled;
    this.idenfyOnBoardingViewType = idenfyOnBoardingViewType;
    this.idenfyDocumentSelectionType = idenfyDocumentSelectionType;
    this.isLanguageSelectionNeeded = isLanguageSelectionNeeded;
    this.idenfyInstructionsEnum = idenfyInstructionsEnum;
    this.idenfyIdentificationResultsUISettingsV2 = idenfyIdentificationResultsUISettingsV2;
    this.immediateRedirectEnum = immediateRedirectEnum;
    this.mismatchTagsAlert = mismatchTagsAlert;
    this.documentCameraFrameVisibility = documentCameraFrameVisibility;
    this.withCountryAndDocumentSelectionJoined = withCountryAndDocumentSelectionJoined;
    this.useBottomSheetDialogs = useBottomSheetDialogs;
  }
  toJson() {
    return {
      isAdditionalSupportEnabled: this.isAdditionalSupportEnabled,
      idenfyOnBoardingViewType: this.idenfyOnBoardingViewType,
      idenfyDocumentSelectionType: this.idenfyDocumentSelectionType,
      isLanguageSelectionNeeded: this.isLanguageSelectionNeeded,
      idenfyInstructionsEnum: this.idenfyInstructionsEnum,
      idenfyIdentificationResultsUISettingsV2: this.idenfyIdentificationResultsUISettingsV2?.toJson(),
      immediateRedirectEnum: this.immediateRedirectEnum,
      mismatchTagsAlert: this.mismatchTagsAlert,
      documentCameraFrameVisibility: this.documentCameraFrameVisibility?.toJson(),
      withCountryAndDocumentSelectionJoined: this.withCountryAndDocumentSelectionJoined,
      useBottomSheetDialogs: this.useBottomSheetDialogs
    };
  }
}
exports.IdenfyUISettings = IdenfyUISettings;
//# sourceMappingURL=IdenfyUISettings.js.map