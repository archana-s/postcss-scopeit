var postcss = require('postcss');

module.exports = postcss.plugin('postcss-scopeit', function (opts) {
    opts = opts || {};
    var scopeName = opts.scopeName;

    return function (css) {
        css.walkRules(function (rule) {
            if (rule.selector !== ':root') {
                var allSelectors = rule.selector.split(',');
                var modifiedSelectors = [];
                allSelectors.forEach(function(selector) {
                    if (selector.match(/^body.*$/)) {
                        modifiedSelectors.push(selector.replace(/^body/, `body.${scopeName}`));
                    } else if(selector.match(/^@.*$/) || selector.indexOf('%') > -1) {
                        modifiedSelectors.push(selector)
                    } else {
                        modifiedSelectors.push(`.${scopeName} ${selector}`);
                    }
                });
                rule.selector = modifiedSelectors.join(',')
            }
        });
    };
});
