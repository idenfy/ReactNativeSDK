"use strict";

import { IdenfySettings } from './IdenfySettings';
export class IdenfyBuilder {
  withSSLPinning(sslPinning) {
    this.sslPinning = sslPinning;
    return this;
  }
  withSelectedLocale(selectedLocale) {
    this.selectedLocale = selectedLocale;
    return this;
  }
  withUISettings(idenfyUISettings) {
    this.idenfyUISettings = idenfyUISettings;
    return this;
  }
  build() {
    return new IdenfySettings(this.sslPinning, this.selectedLocale, this.idenfyUISettings);
  }
}
//# sourceMappingURL=IdenfyBuilder.js.map