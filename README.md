# react-component-scaffold

a scaffold util for react.js

`node scripts/component-scaffold/index.js -n HogehogeImage -c atoms`

```
$ node scripts/component-scaffold/index.js -h
Options:
      --version        Show version number                             [boolean]
  -c, --componentType  atoms | molecules | organisms                  [required]
  -n, --componentName  コンポーネントの名前                           [required]
      --help           Show help                                       [boolean]

Missing required arguments: componentType, componentName
```


## react project の rootに

`.scaffold.config.js`
```js
module.exports = {
  componentDir: {
    atoms: "<rootdir>/src/components/universal/1-atoms",
    molecules: "<rootdir>/src/components/universal/2-molecules",
    organisms: "<rootdir>/src/components/universal/3-organisms",
  }
}
```

みたいなの置いてください。(雑
