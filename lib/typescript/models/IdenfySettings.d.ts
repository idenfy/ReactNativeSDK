import { IdenfyLocaleEnum } from './IdenfyLocaleEnum';
import { IdenfyUISettings } from './IdenfyUISettings';
export declare class IdenfySettings {
    sslPinning?: boolean;
    selectedLocale?: IdenfyLocaleEnum;
    idenfyUISettings?: IdenfyUISettings;
    constructor(sslPinning?: boolean, selectedLocale?: IdenfyLocaleEnum, idenfyUISettings?: IdenfyUISettings);
    toJson(): Record<string, any>;
}
//# sourceMappingURL=IdenfySettings.d.ts.map