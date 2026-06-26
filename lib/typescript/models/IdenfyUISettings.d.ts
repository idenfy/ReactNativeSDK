import { IdenfyOnBoardingViewType } from './IdenfyOnBoardingViewType';
import { IdenfyDocumentSelectionType } from './IdenfyDocumentSelectionType';
import { IdenfyInstructionsEnum } from './IdenfyInstructionsEnum';
import { IdenfyIdentificationResultsUISettingsV2 } from './IdenfyIdentificationResultsUISettingsV2';
import { ImmediateRedirectEnum } from './ImmediateRedirectEnum';
import { DocumentCameraFrameVisibility } from './DocumentCameraFrameVisibility';
export declare class IdenfyUISettings {
    isAdditionalSupportEnabled?: boolean;
    idenfyOnBoardingViewType?: IdenfyOnBoardingViewType;
    idenfyDocumentSelectionType?: IdenfyDocumentSelectionType;
    isLanguageSelectionNeeded?: boolean;
    idenfyInstructionsEnum?: IdenfyInstructionsEnum;
    idenfyIdentificationResultsUISettingsV2?: IdenfyIdentificationResultsUISettingsV2;
    immediateRedirectEnum?: ImmediateRedirectEnum;
    mismatchTagsAlert?: boolean;
    documentCameraFrameVisibility?: DocumentCameraFrameVisibility;
    withCountryAndDocumentSelectionJoined?: boolean;
    useBottomSheetDialogs?: boolean;
    constructor(isAdditionalSupportEnabled?: boolean, idenfyOnBoardingViewType?: IdenfyOnBoardingViewType, idenfyDocumentSelectionType?: IdenfyDocumentSelectionType, isLanguageSelectionNeeded?: boolean, idenfyInstructionsEnum?: IdenfyInstructionsEnum, idenfyIdentificationResultsUISettingsV2?: IdenfyIdentificationResultsUISettingsV2, immediateRedirectEnum?: ImmediateRedirectEnum, mismatchTagsAlert?: boolean, documentCameraFrameVisibility?: DocumentCameraFrameVisibility, withCountryAndDocumentSelectionJoined?: boolean, useBottomSheetDialogs?: boolean);
    toJson(): Record<string, any>;
}
//# sourceMappingURL=IdenfyUISettings.d.ts.map