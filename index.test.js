var postcss = require('postcss');
var plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('scopes selectors correctly when not attached to body', () => {
    return run('button.primary{color:red;}', '.lbmt button.primary{color:red;}', {
        scopeName: 'lbmt'
    });
});

it('attaches scope to body directly', () => {
    return run('body *{color:red;}', 'body.lbmt *{color:red;}', {
        scopeName: 'lbmt'
    });
});

it('does not attach to :root', () => {
    return run(':root{--color-primary:blue;}', ':root{--color-primary:blue;}', {
        scopeName: 'lbmt'
    });
});

it('scopes selectors that are chained', () => {
    return run('h1,h2,h3,h4,h5{color:red;}', '.lbmt h1,.lbmt h2,.lbmt h3,.lbmt h4,.lbmt h5{color:red;}', {
        scopeName: 'lbmt'
    });
});

it('does not affect animations/transitions', () => {
    return run('@keyframes rollingColor {0% {opacity: 0.6;transform: scale(1);}}',
     '@keyframes rollingColor {0% {opacity: 0.6;transform: scale(1);}}', {
        scopeName: 'lbmt'
    });
});

