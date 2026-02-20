# volto-anchors

[![Releases](https://img.shields.io/github/v/release/eea/volto-anchors)](https://github.com/eea/volto-anchors/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-anchors%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-anchors/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-anchors%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-anchors/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors&branch=develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors&branch=develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors&branch=develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors&branch=develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors&branch=develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors&branch=develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-anchors&branch=develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-anchors&branch=develop)

[Volto](https://github.com/plone/volto) add-on

## Features

![Anchors](https://raw.githubusercontent.com/eea/volto-anchors/master/docs/volto-anchors.gif)

## Getting started

### Try volto-anchors with Docker

      git clone https://github.com/eea/volto-anchors.git
      cd volto-anchors
      make
      make start

Go to http://localhost:3000

### Add volto-anchors to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-anchors"
   ],

   "dependencies": {
       "@eeacms/volto-anchors": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-anchors
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
