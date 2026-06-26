type DocumentCameraFrameVisibilityJSON = Record<string, any>;
export declare abstract class DocumentCameraFrameVisibility {
    abstract toJson(): DocumentCameraFrameVisibilityJSON;
}
export declare class HiddenForAllCountriesAndDocumentTypes extends DocumentCameraFrameVisibility {
    toJson(): DocumentCameraFrameVisibilityJSON;
}
export declare class HiddenForSpecificCountriesAndDocumentTypes extends DocumentCameraFrameVisibility {
    countriesAndDocuments: Record<string, string[]>;
    constructor(countriesAndDocuments: Record<string, string[]>);
    toJson(): DocumentCameraFrameVisibilityJSON;
}
export {};
//# sourceMappingURL=DocumentCameraFrameVisibility.d.ts.map