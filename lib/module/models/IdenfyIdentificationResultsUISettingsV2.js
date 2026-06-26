"use strict";

export class IdenfyIdentificationResultsUISettingsV2 {
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
//# sourceMappingURL=IdenfyIdentificationResultsUISettingsV2.js.map