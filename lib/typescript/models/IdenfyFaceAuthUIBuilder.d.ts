import { IdenfyFaceAuthUISettings } from './IdenfyFaceAuthUISettings';
export declare class IdenfyFaceAuthUIBuilder {
    isLanguageSelectionNeeded: boolean;
    skipOnBoardingView: boolean;
    constructor(isLanguageSelectionNeeded?: boolean, skipOnBoardingView?: boolean);
    withLanguageSelection(isLanguageSelectionNeededParam: boolean): IdenfyFaceAuthUIBuilder;
    withOnBoardingView(isOnBoardingViewNeededParam: boolean): IdenfyFaceAuthUIBuilder;
    build(): IdenfyFaceAuthUISettings;
}
//# sourceMappingURL=IdenfyFaceAuthUIBuilder.d.ts.map