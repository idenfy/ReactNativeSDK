import { IdenfyOnBoardingViewType } from './IdenfyOnBoardingViewType';
import { IdenfyDocumentSelectionType } from './IdenfyDocumentSelectionType';
import { IdenfyInstructionsEnum } from './IdenfyInstructionsEnum';
import { IdenfyIdentificationResultsUISettingsV2 } from './IdenfyIdentificationResultsUISettingsV2';
import { ImmediateRedirectEnum } from './ImmediateRedirectEnum';
import { DocumentCameraFrameVisibility } from './DocumentCameraFrameVisibility';
import { IdenfyUISettings } from './IdenfyUISettings';

export class IdenfyUIBuilder {
  private isAdditionalSupportEnabled?: boolean;
  private idenfyOnBoardingViewType?: IdenfyOnBoardingViewType;
  private idenfyDocumentSelectionType?: IdenfyDocumentSelectionType;
  private isLanguageSelectionNeeded?: boolean;
  private idenfyInstructionsEnum?: IdenfyInstructionsEnum;
  private idenfyIdentificationResultsUISettingsV2?: IdenfyIdentificationResultsUISettingsV2;
  private immediateRedirectEnum?: ImmediateRedirectEnum;
  private skipInternalPrivacyPolicyView?: boolean;
  private documentCameraFrameVisibility?: DocumentCameraFrameVisibility;

  withAdditionalSupportView(
    isAdditionalSupportEnabled: boolean
  ): IdenfyUIBuilder {
    this.isAdditionalSupportEnabled = isAdditionalSupportEnabled;
    return this;
  }

  withOnBoardingViewType(
    idenfyOnBoardingViewType: IdenfyOnBoardingViewType
  ): IdenfyUIBuilder {
    this.idenfyOnBoardingViewType = idenfyOnBoardingViewType;
    return this;
  }

  withIdenfyDocumentSelectionType(
    idenfyDocumentSelectionType: IdenfyDocumentSelectionType
  ): IdenfyUIBuilder {
    this.idenfyDocumentSelectionType = idenfyDocumentSelectionType;
    return this;
  }

  withLanguageSelection(isLanguageSelectionNeeded: boolean): IdenfyUIBuilder {
    this.isLanguageSelectionNeeded = isLanguageSelectionNeeded;
    return this;
  }

  withInstructions(
    idenfyInstructionsEnum: IdenfyInstructionsEnum
  ): IdenfyUIBuilder {
    this.idenfyInstructionsEnum = idenfyInstructionsEnum;
    return this;
  }

  withIdenfyIdentificationResultsUISettingsV2(
    idenfyIdentificationResultsUISettingsV2: IdenfyIdentificationResultsUISettingsV2
  ): IdenfyUIBuilder {
    this.idenfyIdentificationResultsUISettingsV2 =
      idenfyIdentificationResultsUISettingsV2;
    return this;
  }

  withImmediateRedirect(
    immediateRedirectEnum: ImmediateRedirectEnum
  ): IdenfyUIBuilder {
    this.immediateRedirectEnum = immediateRedirectEnum;
    return this;
  }

  withSkipInternalPrivacyPolicy(
    skipInternalPrivacyPolicyView: boolean
  ): IdenfyUIBuilder {
    this.skipInternalPrivacyPolicyView = skipInternalPrivacyPolicyView;
    return this;
  }

  withDocumentCameraFrameVisibility(
    documentCameraFrameVisibility: DocumentCameraFrameVisibility
  ): IdenfyUIBuilder {
    this.documentCameraFrameVisibility = documentCameraFrameVisibility;
    return this;
  }

  build(): IdenfyUISettings {
    return new IdenfyUISettings(
      this.isAdditionalSupportEnabled,
      this.idenfyOnBoardingViewType,
      this.idenfyDocumentSelectionType,
      this.isLanguageSelectionNeeded,
      this.idenfyInstructionsEnum,
      this.idenfyIdentificationResultsUISettingsV2,
      this.immediateRedirectEnum,
      this.skipInternalPrivacyPolicyView,
      this.documentCameraFrameVisibility
    );
  }
}
