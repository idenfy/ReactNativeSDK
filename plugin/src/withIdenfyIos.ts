import { ConfigPlugin, withInfoPlist, withDangerousMod } from '@expo/config-plugins';
import * as fs from 'fs';
import * as path from 'path';
import type { IdenfyPluginProps } from './index';

const IDENFY_MARKER = '# @idenfy/react-native-sdk config plugin';

const withIdenfyCameraPermission: ConfigPlugin<IdenfyPluginProps> = (config, props) => {
  return withInfoPlist(config, (config) => {
    config.modResults.NSCameraUsageDescription =
      props.cameraPermission ??
      'This app requires camera access for identity verification.';
    return config;
  });
};

const withIdenfyPodfile: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(
        config.modRequest.platformProjectRoot,
        'Podfile'
      );
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
      podfile = podfile.replace(
        /^.*use_frameworks!.*\n/gm,
        ''
      );
      // Insert the unconditional static linkage after the target line
      podfile = podfile.replace(
        /(target\s+['"].*?['"]\s+do\s*\n)/,
        `$1  use_frameworks! :linkage => :static ${IDENFY_MARKER}\n`
      );

      // 3. Ensure platform :ios is at least 15.1
      podfile = podfile.replace(
        /platform :ios, ['"](\d+\.?\d*)['"]/,
        (match, version) => {
          if (parseFloat(version) < 15.1) {
            return "platform :ios, '15.1'";
          }
          return match;
        }
      );

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
        podfile = podfile.replace(
          /(post_install do \|installer\|)/,
          `$1\n${idenfyPostInstall}`
        );
      } else {
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

export const withIdenfyIos: ConfigPlugin<IdenfyPluginProps> = (config, props) => {
  config = withIdenfyCameraPermission(config, props);
  config = withIdenfyPodfile(config);
  return config;
};
