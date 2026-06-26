"use strict";

export class DocumentCameraFrameVisibility {}
export class HiddenForAllCountriesAndDocumentTypes extends DocumentCameraFrameVisibility {
  toJson() {
    return {
      value: 'HiddenForAllCountriesAndDocumentTypes'
    };
  }
}
export class HiddenForSpecificCountriesAndDocumentTypes extends DocumentCameraFrameVisibility {
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
//# sourceMappingURL=DocumentCameraFrameVisibility.js.map