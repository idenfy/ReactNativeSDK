import { IdenfyOnBoardingViewType } from './IdenfyOnBoardingViewType';
import { IdenfyDocumentSelectionType } from './IdenfyDocumentSelectionType';
import { IdenfyInstructionsEnum } from './IdenfyInstructionsEnum';
import { IdenfyIdentificationResultsUISettingsV2 } from './IdenfyIdentificationResultsUISettingsV2';
import { ImmediateRedirectEnum } from './ImmediateRedirectEnum';
import { DocumentCameraFrameVisibility } from './DocumentCameraFrameVisibility';

export class IdenfyUISettings {
  isAdditionalSupportEnabled?: boolean;
  idenfyOnBoardingViewType?: IdenfyOnBoardingViewType;
  idenfyDocumentSelectionType?: IdenfyDocumentSelectionType;
  isLanguageSelectionNeeded?: boolean;
  idenfyInstructionsEnum?: IdenfyInstructionsEnum;
  idenfyIdentificationResultsUISettingsV2?: IdenfyIdentificationResultsUISettingsV2;
  immediateRedirectEnum?: ImmediateRedirectEnum;
  skipInternalPrivacyPolicyView?: boolean;
  documentCameraFrameVisibility?: DocumentCameraFrameVisibility;

  constructor(
    isAdditionalSupportEnabled?: boolean,
    idenfyOnBoardingViewType?: IdenfyOnBoardingViewType,
    idenfyDocumentSelectionType?: IdenfyDocumentSelectionType,
    isLanguageSelectionNeeded?: boolean,
    idenfyInstructionsEnum?: IdenfyInstructionsEnum,
    idenfyIdentificationResultsUISettingsV2?: IdenfyIdentificationResultsUISettingsV2,
    immediateRedirectEnum?: ImmediateRedirectEnum,
    skipInternalPrivacyPolicyView?: boolean,
    documentCameraFrameVisibility?: DocumentCameraFrameVisibility
  ) {
    this.isAdditionalSupportEnabled = isAdditionalSupportEnabled;
    this.idenfyOnBoardingViewType = idenfyOnBoardingViewType;
    this.idenfyDocumentSelectionType = idenfyDocumentSelectionType;
    this.isLanguageSelectionNeeded = isLanguageSelectionNeeded;
    this.idenfyInstructionsEnum = idenfyInstructionsEnum;
    this.idenfyIdentificationResultsUISettingsV2 =
      idenfyIdentificationResultsUISettingsV2;
    this.immediateRedirectEnum = immediateRedirectEnum;
    this.skipInternalPrivacyPolicyView = skipInternalPrivacyPolicyView;
    this.documentCameraFrameVisibility = documentCameraFrameVisibility;
  }

  toJson(): Record<string, any> {
    return {
      isAdditionalSupportEnabled: this.isAdditionalSupportEnabled,
      idenfyOnBoardingViewType: this.idenfyOnBoardingViewType,
      idenfyDocumentSelectionType: this.idenfyDocumentSelectionType,
      isLanguageSelectionNeeded: this.isLanguageSelectionNeeded,
      idenfyInstructionsEnum: this.idenfyInstructionsEnum,
      idenfyIdentificationResultsUISettingsV2:
        this.idenfyIdentificationResultsUISettingsV2?.toJson(),
      immediateRedirectEnum: this.immediateRedirectEnum,
      skipInternalPrivacyPolicyView: this.skipInternalPrivacyPolicyView,
      documentCameraFrameVisibility:
        this.documentCameraFrameVisibility?.toJson(),
    };
  }
}
