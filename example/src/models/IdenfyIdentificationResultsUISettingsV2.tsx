export class IdenfyIdentificationResultsUISettingsV2 {
  isShowSuccessSpinnerImmediateRedirect: boolean;
  isShowErrorSpinnerImmediateRedirect: boolean;
  isAdditionalUploadingInformationVisible: boolean;

  constructor(
    isShowSuccessSpinnerImmediateRedirect: boolean,
    isShowErrorSpinnerImmediateRedirect: boolean,
    isAdditionalUploadingInformationVisible: boolean
  ) {
    this.isShowSuccessSpinnerImmediateRedirect =
      isShowSuccessSpinnerImmediateRedirect;
    this.isShowErrorSpinnerImmediateRedirect =
      isShowErrorSpinnerImmediateRedirect;
    this.isAdditionalUploadingInformationVisible =
      isAdditionalUploadingInformationVisible;
  }

  toJson(): Record<string, any> {
    return {
      isShowSuccessSpinnerImmediateRedirect:
        this.isShowSuccessSpinnerImmediateRedirect,
      isShowErrorSpinnerImmediateRedirect:
        this.isShowErrorSpinnerImmediateRedirect,
      isAdditionalUploadingInformationVisible:
        this.isAdditionalUploadingInformationVisible,
    };
  }
}
