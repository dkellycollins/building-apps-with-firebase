// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA8rBSwQ3AFEEnPbtFC7Nh6A1O0xzHCQbc",
    authDomain: "budget-demo-45094.firebaseapp.com",
    projectId: "budget-demo-45094",
    storageBucket: "budget-demo-45094.appspot.com",
    messagingSenderId: "990191621645",
    appId: "1:990191621645:web:5cc5d5a70b98ed673b2744"
  },
  functions: {
    api: 'https://us-central1-budget-demo-45094.cloudfunctions.net/api'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
