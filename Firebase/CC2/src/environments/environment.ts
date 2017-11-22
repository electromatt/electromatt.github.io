// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBDcX4KKW7lu1G9xIojV8USbfaRx1HFThY",
    authDomain: "firebase.mattdruckhammer.com",
    databaseURL: "https://colorcross-7201b.firebaseio.com",
    projectId: "colorcross-7201b",
    storageBucket: "colorcross-7201b.appspot.com",
    messagingSenderId: "552565343048"
  }
};
