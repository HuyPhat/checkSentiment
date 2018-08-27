const rewireMobX = require('react-app-rewire-mobx');
// const rewirePreact = require('react-app-rewire-preact');
const { injectBabelPlugin } = require('react-app-rewired');

/* config-overrides.js */
module.exports = function override(config, env) {
    // add a plugin
    // config = injectBabelPlugin('emotion/babel', config);
    // config = injectBabelPlugin('babel-plugin-styled-components', config);

    //do stuff with the webpack config...

    // use the MobX rewire
    config = rewireMobX(config, env);
    return config;
};
