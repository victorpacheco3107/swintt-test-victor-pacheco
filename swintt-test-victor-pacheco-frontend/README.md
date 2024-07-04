# SwinttTestVictorPachecoFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


If you run de command `ng serve` and get this error:
```json
⠼ Generating browser application bundles (phase: building)...Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:69:19)
    at Object.createHash (node:crypto:138:10)
    at BulkUpdateDecorator.hashFactory (/Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/lib/util/createHash.js:145:18)
    at BulkUpdateDecorator.update (/Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/lib/util/createHash.js:46:50)
    at OriginalSource.updateHash (/Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/node_modules/webpack-sources/lib/OriginalSource.js:104:8)
    at NormalModule._initBuildHash (/Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/lib/NormalModule.js:868:17)
    at handleParseResult (/Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/lib/NormalModule.js:934:10)
    at /Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/lib/NormalModule.js:1026:4
    at processResult (/Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/lib/NormalModule.js:743:11)
    at /Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/lib/NormalModule.js:807:5
⠴ Generating browser application bundles (phase: building)...node:internal/crypto/hash:69
  this[kHandle] = new _Hash(algorithm, xofLen);
                  ^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:69:19)
    at Object.createHash (node:crypto:138:10)
    at BulkUpdateDecorator.hashFactory (/Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/lib/util/createHash.js:145:18)
    at BulkUpdateDecorator.update (/Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/lib/util/createHash.js:46:50)
    at OriginalSource.updateHash (/Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/node_modules/webpack-sources/lib/OriginalSource.js:104:8)
    at NormalModule._initBuildHash (/Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/lib/NormalModule.js:868:17)
    at handleParseResult (/Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/lib/NormalModule.js:934:10)
    at /Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/lib/NormalModule.js:1026:4
    at processResult (/Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/lib/NormalModule.js:743:11)
    at /Users/victorpacheco/work/swintt/repo/swintt-test-victor-pacheco-frontend/node_modules/webpack/lib/NormalModule.js:807:5 {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}
```
run this command `export NODE_OPTIONS=--openssl-legacy-provider` or `set NODE_OPTIONS=--openssl-legacy-provider` for mac and windows user respectivly. Other option is downgrade node version till 16.
