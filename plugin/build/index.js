"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const withIdenfyIos_1 = require("./withIdenfyIos");
const withIdenfyAndroid_1 = require("./withIdenfyAndroid");
const withIdenfy = (config, props = {}) => {
    const pluginProps = props ?? {};
    config = (0, withIdenfyIos_1.withIdenfyIos)(config, pluginProps);
    config = (0, withIdenfyAndroid_1.withIdenfyAndroid)(config, pluginProps);
    return config;
};
const pkg = require('../../package.json');
exports.default = (0, config_plugins_1.createRunOncePlugin)(withIdenfy, pkg.name, pkg.version);
