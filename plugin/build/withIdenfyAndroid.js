"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withIdenfyAndroid = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const JITPACK_URL = 'https://jitpack.io';
const withIdenfyJitpack = (config) => {
    return (0, config_plugins_1.withProjectBuildGradle)(config, (config) => {
        if (config.modResults.language !== 'groovy') {
            throw new Error('[@idenfy/react-native-sdk] Cannot modify non-groovy build.gradle. ' +
                'Kotlin DSL (build.gradle.kts) is not supported by this config plugin.');
        }
        let contents = config.modResults.contents;
        if (!contents.includes(JITPACK_URL)) {
            // Add to allprojects.repositories
            contents = contents.replace(/(allprojects\s*\{[\s\S]*?repositories\s*\{)/, `$1\n        maven { url "${JITPACK_URL}" }`);
            // Add to buildscript.repositories if it exists
            if (contents.includes('buildscript')) {
                contents = contents.replace(/(buildscript\s*\{[\s\S]*?repositories\s*\{)/, `$1\n        maven { url "${JITPACK_URL}" }`);
            }
        }
        config.modResults.contents = contents;
        return config;
    });
};
const withIdenfyMultidex = (config) => {
    return (0, config_plugins_1.withAppBuildGradle)(config, (config) => {
        let contents = config.modResults.contents;
        if (!contents.includes('multiDexEnabled')) {
            contents = contents.replace(/(defaultConfig\s*\{)/, `$1\n        multiDexEnabled true`);
        }
        config.modResults.contents = contents;
        return config;
    });
};
const withIdenfyR8 = (config) => {
    return (0, config_plugins_1.withGradleProperties)(config, (config) => {
        // Remove existing entry to avoid duplicates
        config.modResults = config.modResults.filter((item) => !(item.type === 'property' && item.key === 'android.enableR8.fullMode'));
        config.modResults.push({
            type: 'property',
            key: 'android.enableR8.fullMode',
            value: 'false',
        });
        return config;
    });
};
const withIdenfyAndroid = (config, _props) => {
    config = withIdenfyJitpack(config);
    config = withIdenfyMultidex(config);
    config = withIdenfyR8(config);
    return config;
};
exports.withIdenfyAndroid = withIdenfyAndroid;
