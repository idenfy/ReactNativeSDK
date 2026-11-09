import { IdenfyColorScheme } from './IdenfyColorScheme';
import { IdenfyBankCardVerificationUISettings } from './IdenfyBankCardVerificationUISettings';

export class IdenfyBankCardVerificationUIBuilder {
  private idenfyColorScheme?: IdenfyColorScheme;

  withColorScheme(
    idenfyColorScheme: IdenfyColorScheme
  ): IdenfyBankCardVerificationUIBuilder {
    this.idenfyColorScheme = idenfyColorScheme;
    return this;
  }

  build(): IdenfyBankCardVerificationUISettings {
    let settings = new IdenfyBankCardVerificationUISettings();
    settings.idenfyColorScheme = this.idenfyColorScheme;
    return settings;
  }
}
