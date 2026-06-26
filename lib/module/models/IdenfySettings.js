"use strict";

export class IdenfySettings {
  constructor(sslPinning, selectedLocale, idenfyUISettings) {
    this.sslPinning = sslPinning;
    this.selectedLocale = selectedLocale;
    this.idenfyUISettings = idenfyUISettings;
  }
  toJson() {
    return {
      sslPinning: this.sslPinning,
      selectedLocale: this.selectedLocale,
      idenfyUISettings: this.idenfyUISettings?.toJson()
    };
  }
}
//# sourceMappingURL=IdenfySettings.js.map