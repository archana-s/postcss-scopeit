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

