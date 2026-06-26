import { IdenfyOnBoardingViewType } from './IdenfyOnBoardingViewType';
import { IdenfyDocumentSelectionType } from './IdenfyDocumentSelectionType';
import { IdenfyInstructionsEnum } from './IdenfyInstructionsEnum';
import { IdenfyIdentificationResultsUISettingsV2 } from './IdenfyIdentificationResultsUISettingsV2';
import { ImmediateRedirectEnum } from './ImmediateRedirectEnum';
import { DocumentCameraFrameVisibility } from './DocumentCameraFrameVisibility';
import { IdenfyUISettings } from './IdenfyUISettings';
export declare class IdenfyUIBuilder {
    private isAdditionalSupportEnabled?;
    private idenfyOnBoardingViewType?;
    private idenfyDocumentSelectionType?;
    private isLanguageSelectionNeeded?;
    private idenfyInstructionsEnum?;
    private idenfyIdentificationResultsUISettingsV2?;
    private immediateRedirectEnum?;
    private mismatchTagsAlert?;
    private documentCameraFrameVisibility?;
    private countryAndDocumentSelectionJoined?;
    private useBottomSheetDialogs?;
    withAdditionalSupportView(isAdditionalSupportEnabled: boolean): IdenfyUIBuilder;
    withOnBoardingViewType(idenfyOnBoardingViewType: IdenfyOnBoardingViewType): IdenfyUIBuilder;
    withIdenfyDocumentSelectionType(idenfyDocumentSelectionType: IdenfyDocumentSelectionType): IdenfyUIBuilder;
    withLanguageSelection(isLanguageSelectionNeeded: boolean): IdenfyUIBuilder;
    withInstructions(idenfyInstructionsEnum: IdenfyInstructionsEnum): IdenfyUIBuilder;
    withIdenfyIdentificationResultsUISettingsV2(idenfyIdentificationResultsUISettingsV2: IdenfyIdentificationResultsUISettingsV2): IdenfyUIBuilder;
    withImmediateRedirect(immediateRedirectEnum: ImmediateRedirectEnum): IdenfyUIBuilder;
    withMismatchTagsAlert(mismatchTagsAlert: boolean): IdenfyUIBuilder;
    withDocumentCameraFrameVisibility(documentCameraFrameVisibility: DocumentCameraFrameVisibility): IdenfyUIBuilder;
    withCountryAndDocumentSelectionJoined(countryAndDocumentSelectionJoined: boolean): IdenfyUIBuilder;
    withBottomSheetDialogs(useBottomSheetDialogs: boolean): IdenfyUIBuilder;
    build(): IdenfyUISettings;
}
//# sourceMappingURL=IdenfyUIBuilder.d.ts.map