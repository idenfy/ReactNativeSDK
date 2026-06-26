import { IdenfyLocaleEnum } from './IdenfyLocaleEnum';
import { IdenfyUISettings } from './IdenfyUISettings';
import { IdenfySettings } from './IdenfySettings';
export declare class IdenfyBuilder {
    private sslPinning?;
    private selectedLocale?;
    private idenfyUISettings?;
    withSSLPinning(sslPinning: boolean): IdenfyBuilder;
    withSelectedLocale(selectedLocale: IdenfyLocaleEnum): IdenfyBuilder;
    withUISettings(idenfyUISettings: IdenfyUISettings): IdenfyBuilder;
    build(): IdenfySettings;
}
//# sourceMappingURL=IdenfyBuilder.d.ts.map