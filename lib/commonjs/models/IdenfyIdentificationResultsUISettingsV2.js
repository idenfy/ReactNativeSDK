"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IdenfyIdentificationResultsUISettingsV2 = void 0;
class IdenfyIdentificationResultsUISettingsV2 {
  constructor(isShowSuccessSpinnerImmediateRedirect, isShowErrorSpinnerImmediateRedirect, isAdditionalUploadingInformationVisible) {
    this.isShowSuccessSpinnerImmediateRedirect = isShowSuccessSpinnerImmediateRedirect;
    this.isShowErrorSpinnerImmediateRedirect = isShowErrorSpinnerImmediateRedirect;
    this.isAdditionalUploadingInformationVisible = isAdditionalUploadingInformationVisible;
  }
  toJson() {
    return {
      isShowSuccessSpinnerImmediateRedirect: this.isShowSuccessSpinnerImmediateRedirect,
      isShowErrorSpinnerImmediateRedirect: this.isShowErrorSpinnerImmediateRedirect,
      isAdditionalUploadingInformationVisible: this.isAdditionalUploadingInformationVisible
    };
  }
}
exports.IdenfyIdentificationResultsUISettingsV2 = IdenfyIdentificationResultsUISettingsV2;
//# sourceMappingURL=IdenfyIdentificationResultsUISettingsV2.js.map