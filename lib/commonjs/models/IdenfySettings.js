"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IdenfySettings = void 0;
class IdenfySettings {
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
exports.IdenfySettings = IdenfySettings;
//# sourceMappingURL=IdenfySettings.js.map