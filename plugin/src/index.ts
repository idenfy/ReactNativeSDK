import { ConfigPlugin, createRunOncePlugin } from '@expo/config-plugins';
import { withIdenfyIos } from './withIdenfyIos';
import { withIdenfyAndroid } from './withIdenfyAndroid';

export interface IdenfyPluginProps {
  /**
   * Custom camera permission message for iOS Info.plist NSCameraUsageDescription.
   * @default "This app requires camera access for identity verification."
   */
  cameraPermission?: string;
}

const withIdenfy: ConfigPlugin<IdenfyPluginProps | void> = (
  config,
  props = {}
) => {
  const pluginProps: IdenfyPluginProps = props ?? {};

  config = withIdenfyIos(config, pluginProps);
  config = withIdenfyAndroid(config, pluginProps);

  return config;
};

const pkg = require('../../package.json');

export default createRunOncePlugin(withIdenfy, pkg.name, pkg.version);
