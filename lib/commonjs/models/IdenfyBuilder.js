"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IdenfyBuilder = void 0;
var _IdenfySettings = require("./IdenfySettings");
class IdenfyBuilder {
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
    return new _IdenfySettings.IdenfySettings(this.sslPinning, this.selectedLocale, this.idenfyUISettings);
  }
}
exports.IdenfyBuilder = IdenfyBuilder;
//# sourceMappingURL=IdenfyBuilder.js.map