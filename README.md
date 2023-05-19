# volto-anchors

[![Releases](https://img.shields.io/github/v/release/eea/volto-anchors)](https://github.com/eea/volto-anchors/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-anchors%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-anchors/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-anchors%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-anchors/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors-develop)

[Volto](https://github.com/plone/volto) add-on

## Features

![Anchors](https://github.com/eea/volto-anchors/raw/docs/docs/volto-anchors.gif)

## Getting started

### Add volto-anchors to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

1. Start Volto frontend

- If you already have a volto project, just update `package.json`:

  ```JSON
  "addons": [
      "@eeacms/volto-anchors"
  ],

  "dependencies": {
      "@eeacms/volto-anchors": "*"
  }
  ```

- If not, create one:

  ```
  npm install -g yo @plone/generator-volto
  yo @plone/volto my-volto-project --canary --addon @eeacms/volto-addon-template
  cd my-volto-project
  ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-anchors/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-anchors/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-anchors/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
