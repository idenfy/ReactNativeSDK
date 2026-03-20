import { IdenfyLocaleEnum } from './IdenfyLocaleEnum';
import { IdenfyUISettings } from './IdenfyUISettings';
import { IdenfySettings } from './IdenfySettings';

export class IdenfyBuilder {
  private sslPinning?: boolean;
  private selectedLocale?: IdenfyLocaleEnum;
  private idenfyUISettings?: IdenfyUISettings;

  withSSLPinning(sslPinning: boolean): IdenfyBuilder {
    this.sslPinning = sslPinning;
    return this;
  }

  withSelectedLocale(selectedLocale: IdenfyLocaleEnum): IdenfyBuilder {
    this.selectedLocale = selectedLocale;
    return this;
  }

  withUISettings(idenfyUISettings: IdenfyUISettings): IdenfyBuilder {
    this.idenfyUISettings = idenfyUISettings;
    return this;
  }

  build(): IdenfySettings {
    return new IdenfySettings(
      this.sslPinning,
      this.selectedLocale,
      this.idenfyUISettings
    );
  }
}
