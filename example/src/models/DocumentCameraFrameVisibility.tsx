type DocumentCameraFrameVisibilityJSON = Record<string, any>;

export abstract class DocumentCameraFrameVisibility {
  abstract toJson(): DocumentCameraFrameVisibilityJSON;
}

export class HiddenForAllCountriesAndDocumentTypes extends DocumentCameraFrameVisibility {
  toJson(): DocumentCameraFrameVisibilityJSON {
    return {
      value: 'HiddenForAllCountriesAndDocumentTypes',
    };
  }
}

export class HiddenForSpecificCountriesAndDocumentTypes extends DocumentCameraFrameVisibility {
  countriesAndDocuments: Record<string, string[]>;

  constructor(countriesAndDocuments: Record<string, string[]>) {
    super();
    this.countriesAndDocuments = countriesAndDocuments;
  }

  toJson(): DocumentCameraFrameVisibilityJSON {
    return {
      value: 'HiddenForSpecificCountriesAndDocumentTypes',
      countriesAndDocuments: this.countriesAndDocuments,
    };
  }
}
