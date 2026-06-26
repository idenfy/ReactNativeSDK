"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.withIdenfyIos = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const IDENFY_MARKER = '# @idenfy/react-native-sdk config plugin';
const withIdenfyCameraPermission = (config, props) => {
    return (0, config_plugins_1.withInfoPlist)(config, (config) => {
        config.modResults.NSCameraUsageDescription =
            props.cameraPermission ??
                'This app requires camera access for identity verification.';
        return config;
    });
};
const withIdenfyPodfile = (config) => {
    return (0, config_plugins_1.withDangerousMod)(config, [
        'ios',
        async (config) => {
            const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
            let podfile = fs.readFileSync(podfilePath, 'utf-8');
            // Idempotency: skip if already applied
            if (podfile.includes(IDENFY_MARKER)) {
                return config;
            }
            // 1. Ensure CocoaPods specs source is present
            const specsSource = "source 'https://github.com/CocoaPods/Specs.git'";
            if (!podfile.includes('CocoaPods/Specs')) {
                podfile = `${specsSource} ${IDENFY_MARKER}\n${podfile}`;
            }
            // 2. Ensure a single use_frameworks! :linkage => :static
            // Remove all existing use_frameworks! lines (including Expo's conditional ones)
            podfile = podfile.replace(/^.*use_frameworks!.*\n/gm, '');
            // Insert the unconditional static linkage after the target line
            podfile = podfile.replace(/(target\s+['"].*?['"]\s+do\s*\n)/, `$1  use_frameworks! :linkage => :static ${IDENFY_MARKER}\n`);
            // 3. Ensure platform :ios is at least 15.1
            podfile = podfile.replace(/platform :ios, ['"](\d+\.?\d*)['"]/, (match, version) => {
                if (parseFloat(version) < 15.1) {
                    return "platform :ios, '15.1'";
                }
                return match;
            });
            // 4. Inject post_install additions for bitcode and lottie-ios
            const idenfyPostInstall = `
    ${IDENFY_MARKER} - post_install additions
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |build_config|
        build_config.build_settings['ENABLE_BITCODE'] = 'NO'
      end
      if target.name == "lottie-ios"
        target.build_configurations.each do |build_config|
          build_config.build_settings['ENABLE_BITCODE'] = 'NO'
          build_config.build_settings['ONLY_ACTIVE_ARCH'] = 'NO'
          build_config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
        end
      end
    end`;
            if (podfile.includes('post_install do |installer|')) {
                // Inject after existing post_install opening line
                podfile = podfile.replace(/(post_install do \|installer\|)/, `$1\n${idenfyPostInstall}`);
            }
            else {
                // No existing post_install — add one before the final `end`
                const lastEndIndex = podfile.lastIndexOf('\nend');
                if (lastEndIndex !== -1) {
                    const beforeEnd = podfile.substring(0, lastEndIndex);
                    const afterEnd = podfile.substring(lastEndIndex);
                    podfile = `${beforeEnd}\n\n  post_install do |installer|\n${idenfyPostInstall}\n  end${afterEnd}`;
                }
            }
            fs.writeFileSync(podfilePath, podfile, 'utf-8');
            return config;
        },
    ]);
};
// The iDenfy SDK resolves its brand images from the app's main bundle first, so
// dropping an imageset of the same name into the app asset catalog replaces the
// iDenfy logo (per iDenfy's "add IdenfyAssets to your app target" guide). The
// asset is monochrome and flagged template-rendering, so the gold toolbar logo
// tint (set in IdenfyKaraTheme.swift) paints it gold.
const IDENFY_LOGO_ASSET = 'idenfy_ic_idenfy_logo_vector_v2';
const withIdenfyLogo = (config) => {
    return (0, config_plugins_1.withDangerousMod)(config, [
        'ios',
        async (config) => {
            const projectName = config.modRequest.projectName;
            if (!projectName) {
                return config;
            }
            const imagesetDir = path.join(config.modRequest.platformProjectRoot, projectName, 'Images.xcassets', `${IDENFY_LOGO_ASSET}.imageset`);
            // Source ships with the plugin (files: ["plugin"] in package.json).
            const sourcePng = path.join(__dirname, '..', 'assets', 'kara-idenfy-logo.png');
            if (!fs.existsSync(sourcePng)) {
                return config;
            }
            fs.mkdirSync(imagesetDir, { recursive: true });
            fs.copyFileSync(sourcePng, path.join(imagesetDir, 'kara-idenfy-logo.png'));
            fs.writeFileSync(path.join(imagesetDir, 'Contents.json'), JSON.stringify({
                images: [{ idiom: 'universal', filename: 'kara-idenfy-logo.png' }],
                info: { version: 1, author: 'expo' },
                properties: { 'template-rendering-intent': 'template' },
            }, null, 2), 'utf-8');
            return config;
        },
    ]);
};
const withIdenfyIos = (config, props) => {
    config = withIdenfyCameraPermission(config, props);
    config = withIdenfyPodfile(config);
    config = withIdenfyLogo(config);
    return config;
};
exports.withIdenfyIos = withIdenfyIos;
