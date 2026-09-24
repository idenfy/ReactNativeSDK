import { IdenfyColorScheme } from './IdenfyColorScheme';

export class IdenfyFaceAuthUISettings {
  isLanguageSelectionNeeded: boolean = true;
  skipOnBoardingView: boolean = false;
  idenfyColorScheme?: IdenfyColorScheme;

  toJson(): Record<string, any> {
    return {
      isLanguageSelectionNeeded: this.isLanguageSelectionNeeded,
      skipOnBoardingView: this.skipOnBoardingView,
      idenfyColorScheme: this.idenfyColorScheme?.toJson(),
    };
  }
}
