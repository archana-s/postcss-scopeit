var postcss = require('postcss');

module.exports = postcss.plugin('postcss-scopeit', function (opts) {
    opts = opts || {};
    var scopeName = opts.scopeName;

    return function (css) {
        css.walkRules(function (rule) {
            if (rule.selector.match(/^body.*$/)) {
                rule.selector = rule.selector
                    .replace(/^body/, `body.${scopeName}`);
            } else {
                rule.selector =
                    `.${scopeName} ${rule.selector}`;
            }
        });
    };
});
