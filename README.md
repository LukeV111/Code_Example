# Mock TV App

This project is built using React and NodeJS.

The React app can be found in the `web` folder and the node app can be found in the `server` folder.

## Getting started:

You will need an Unsplash account, `ACCESS_KEY` and `SECRET_KEY`. This can be obtained [HERE](https://unsplash.com/developers).

Make a copy of the `server/.env.example` file and rename it `.env`.

Insert your keys into that file as indicated.

## Running the app locally:

- Navigate into the `server` folder using the terminal.
- Run `npm install`.
- Once that's done, run `node app.js`
- The server will be running on `http://localhost:4000`

Once that's running, you'll need to open a new terminal window.

- Navigate into the `web` folder using the terminal.
- Run `npm install`
- Run `npm run start`


Once that is complete, you app should be running on `https:://localhost:3000`

## Note:

This application was designed to simulate a TV App experience and therefore navigation can only take place using the keyboard arrows.
