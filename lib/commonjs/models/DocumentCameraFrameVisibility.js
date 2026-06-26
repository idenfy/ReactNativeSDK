"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HiddenForSpecificCountriesAndDocumentTypes = exports.HiddenForAllCountriesAndDocumentTypes = exports.DocumentCameraFrameVisibility = void 0;
class DocumentCameraFrameVisibility {}
exports.DocumentCameraFrameVisibility = DocumentCameraFrameVisibility;
class HiddenForAllCountriesAndDocumentTypes extends DocumentCameraFrameVisibility {
  toJson() {
    return {
      value: 'HiddenForAllCountriesAndDocumentTypes'
    };
  }
}
exports.HiddenForAllCountriesAndDocumentTypes = HiddenForAllCountriesAndDocumentTypes;
class HiddenForSpecificCountriesAndDocumentTypes extends DocumentCameraFrameVisibility {
  constructor(countriesAndDocuments) {
    super();
    this.countriesAndDocuments = countriesAndDocuments;
  }
  toJson() {
    return {
      value: 'HiddenForSpecificCountriesAndDocumentTypes',
      countriesAndDocuments: this.countriesAndDocuments
    };
  }
}
exports.HiddenForSpecificCountriesAndDocumentTypes = HiddenForSpecificCountriesAndDocumentTypes;
//# sourceMappingURL=DocumentCameraFrameVisibility.js.map