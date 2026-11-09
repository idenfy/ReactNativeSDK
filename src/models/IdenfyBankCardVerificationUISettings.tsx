import { IdenfyColorScheme } from './IdenfyColorScheme';

export class IdenfyBankCardVerificationUISettings {
  idenfyColorScheme?: IdenfyColorScheme;

  toJson(): Record<string, any> {
    return {
      idenfyColorScheme: this.idenfyColorScheme?.toJson(),
    };
  }
}
