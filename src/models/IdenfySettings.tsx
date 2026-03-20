import { IdenfyLocaleEnum } from './IdenfyLocaleEnum';
import { IdenfyUISettings } from './IdenfyUISettings';

export class IdenfySettings {
  sslPinning?: boolean;
  selectedLocale?: IdenfyLocaleEnum;
  idenfyUISettings?: IdenfyUISettings;

  constructor(
    sslPinning?: boolean,
    selectedLocale?: IdenfyLocaleEnum,
    idenfyUISettings?: IdenfyUISettings
  ) {
    this.sslPinning = sslPinning;
    this.selectedLocale = selectedLocale;
    this.idenfyUISettings = idenfyUISettings;
  }

  toJson(): Record<string, any> {
    return {
      sslPinning: this.sslPinning,
      selectedLocale: this.selectedLocale,
      idenfyUISettings: this.idenfyUISettings?.toJson(),
    };
  }
}
