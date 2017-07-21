# postcss-scopeit

This is a PostCSS plugin to add additional specificity to your specified CSS. 
The plugin accepts a scope name and uses that to add the additional specificity.

For e.g.

```
body * {
  color: red;
}

button.primary {
  color: blue;
  border: 1px solid black;
}
```

Running through this plugin with scope name of 'test' will alter it to be:

```
body.test * {
  color: red;
}

.test button.primary {
  color: blue;
  border: 1px solid black;
}
```

This is typically helpful when components are developed by external parties for your web application. This can avoid style bleed between the component and its parent. 