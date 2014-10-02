[![Stories in Ready](https://badge.waffle.io/michaelkohler/jabber-firefox-os.png?label=ready&title=Ready)](https://waffle.io/michaelkohler/jabber-firefox-os)  [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/MichaelKohler/jabber-firefox-os?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Jabber
This is a Jabber client for Firefox OS. You can connect to every jabber server with it (this means you can also use Facebook Chat within this client).

## Run
* Install it in the Firefox OS Simulator
* Run it in your browser (with Server side CORS Support!)

## Development

### Get all dependencies
```bash
npm install -g gulp
npm install
```

### Serving webpage
If you want to run the app from localhost, you can start a local server with

`gulp serve`

But running it from file:// should currently work too.

### Running jslint to minimize code errors
Please use

`gulp jslint`

before checking in any files.

### TODOs
All TODOs get tracked by issues. Please see the "issues" tab for things to do. If you'd like to help out with this project, feel free to fork this repo and create a Pull Request. We'll look into it as soon as possible.

You don't have the necessary knowledge to contribute to our project? There are two possibilites: either we help you get things done within our code or you could leave youd idea creating an issue and we'll consider it for a future version. This means that you don't need to have coding knowledge to contribute, you only need to have a great idea! Since we care about community, we apprieciate every contribution, it doesn't matter what kind.
## Metrics
[![Throughput Graph](https://graphs.waffle.io/michaelkohler/jabber-firefox-os/throughput.svg)](https://waffle.io/michaelkohler/jabber-firefox-os/metrics)

## Translation / Localization
Do you want the Jabber app in your native language? Help translating the app on [Transifex](https://www.transifex.com/projects/p/jabber-firefox-os/)

#### Current translation statistics

[![Transifex translation statistics](https://www.transifex.com/projects/p/jabber-firefox-os/resource/jabberproperties/chart/image_png)](https://www.transifex.com/projects/p/jabber-firefox-os/)

#### Automatically fetch latest Translations
Please use

`gulp fetch_translation`

to fetch all available Translation files (`./app/locales/*`) and automatically update the `./app/manifest.webapp` and `./app/locales/jabber.json` file.
