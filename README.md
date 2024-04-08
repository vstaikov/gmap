# Getting Started

## Required software

- HomeBrew - `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- Node - `brew install node`
- Yarn - `npm install --global yarn`
- Xcode - `Download Xcode from App Store and install XCode command line tools`
- Android Studio - `Download Android Studio and setup and start an Android Emulator`

>**Note**: More info can be found at [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)

## First time setup

Make sure to run `yarn install` and `yarn pods` before building the app.

## Building, Running & Testing the Applications

| Command           | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `yarn pods`       | Install iOS pods.                                        |
| `yarn server`     | Start fake API server                                    |
| `yarn adb:reverse`| Create reverse proxy (useful with Android)               |
| `yarn start`      | Start Metro bundler                                      |
| `yarn android`    | Build for Android                                        |
| `yarn ios`        | Build for iOS                                            |
| `yarn dev:android`| Run fake API server, Metro bundler and build for Android |
| `yarn dev:ios`    | Run fake API server, Metro bundler and build for iOS     |
| `yarn lint`       | Lint project                                             |
| `yarn test`       | Run unit tests                                           |
| `yarn test:clear` | Clear tests cache                                        |
| `yarn typecheck`  | Run typecheck                                            |

## TODO

- [ ] Finish integration tests
- [ ] Consider clustering on FE side
- [ ] Consider clustering on BE side
