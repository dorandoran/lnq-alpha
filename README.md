# LNQ Alpha Build

Alpha build for LNQ mobile application

## Built With

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io/)
- [Firebase](https://firebase.google.com/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [Algolia](https://www.algolia.com/)

## Setup

1. Setup mobile development environment with expo [here.](https://reactnative.dev/docs/environment-setup)
2. Pull the repo down to local
3. Get the credentials for each of the projects - Setup of certain service may be required.
   - client/config
   - functions/src/config
   - server/src/config
   - server/src/devTokens.ts
4. Start the server
   - Run `npm install`
   - (Optional) - A `Dockerfile` and `docker-compose.yml` is provided
     - `docker-compose up --build -d server` from the root directory
   - Without Docker
     1. Change directory into `server`
     2. Run `npm run start`
5. Start the mobile client
   1. Change directory into `client`
   2. Run `npm install`
   3. Run `npm run start`
   4. Browser window should open. Once it is finished loading, open app in iOS or Android

## Acknowledgements

- LNQ
- Marquese Dillon

Thanks for the support and feedback throughout the process!
