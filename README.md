# igata

[![CircleCI](https://circleci.com/gh/diescake/igata.svg?style=svg)](https://circleci.com/gh/diescake/igata)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&identifier=165770216)](https://dependabot.com)

`igata(鋳型)` is my boilerplate for Web Frontend. `鋳型` in Japanese means a boilerplate or casting mold.

## Technology keywords

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/) + [Redux](https://redux.js.org/)
- [Sass](https://sass-lang.com/)
- [TSLint](https://palantir.github.io/tslint/) + [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/)
- [yarn](https://yarnpkg.com)
- [webpack](https://webpack.js.org/)
- [CircleCI](https://circleci.com/)
- [DEPENDABOT](https://dependabot.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (Recommended)

## Requirement

- Node.js v8.xx
  - Latest minor revision is recommended

## Npm script

```sh
$ yarn          # install dependencies
$ yarn start    # build and launch development server
$ yarn build    # build and generate production codes
$ yarn format   # format and save any codes with prettier
$ yarn lint     # lint source codes after format automatically
$ yarn test     # run test code using Jest framework
$ yarn deploy   # deploy production codes to GitHub.io
$ yarn license  # display OSS license summary of bundled as production codes
```

## Note

### Pre-commit tasks

Some tasks are kicked before committing by the combination of `husky` and `lint-staged`, but unfortunately they are **NOT** always called and some developers will skip this check process as a result. As far as I know, some GUI git clients can penetrate it.

### [vscode-tslint](https://github.com/Microsoft/vscode-tslint) plugin problems

Currently, vscode-tslint plugin does not support several rules in tslint.yaml because it can not fetch type information in `tsconfig.json`. Unfortunately, it seems that maintainers have no plans to add support it. Therefore, even if your VSCode readies for running vscode-tslint in real-time, you should sometimes run `yarn lint` manually and confirm result. For more information, see [README.md#faq](https://github.com/Microsoft/vscode-tslint/blob/master/tslint/README.md#faq)

## License

[MIT License](https://github.com/diescake/igata/blob/master/LICENSE)

## Author

Daisuke Kondo (a.k.a diescake)
