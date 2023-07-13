<!-- AUTOMATION BADGES -->

[![CodeQL](https://github.com/webceyhan/react-threads-app/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/webceyhan/react-threads-app/actions/workflows/codeql-analysis.yml)
[![Build and Deploy](https://github.com/webceyhan/react-threads-app/actions/workflows/netlify-deploy.yml/badge.svg)](https://github.com/webceyhan/react-threads-app/actions/workflows/netlify-deploy.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/e28e4e68-5bab-4837-9f4e-4550d48ef5b6/deploy-status)](https://app.netlify.com/sites/react-threads-app-app/deploys)

<!-- HEADER ///////////////////////////////////////////////////////////// -->

# Meta Threads Clone + React + JsonServer

A Threads clone application inspired by a tutorial to demonstrate the basics of React framework and its core concepts.
JsonServer is used to simulate a REST API server to provide the basic data for the application.

[View Demo](https://webceyhan-react-threads-app.netlify.app/) |
[Report Issue](https://github.com/webceyhan/react-threads-app/issues) |
[Request Feature](https://github.com/webceyhan/react-threads-app/pulls) |
[@webceyhan](https://twitter.com/webceyhan)

<br>
<!-- INSTALLATION //////////////////////////////////////////////////////// -->

## Installation

1. Clone the repository.
    ```sh
    git clone https://github.com/webceyhan/react-threads-app.git
    ```
2. Get inside the cloned project folder.
    ```sh
    cd react-threads-app
    ```
3. Install NPM packages.
    ```sh
    npm install
    ```

<br>
<!-- DEVELOPMENT ///////////////////////////////////////////////////////// -->

## Development

Run the app in the development mode.

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
The page will reload when you make changes. You may also see any lint errors in the console.

Run the JSON server in a separate terminal window.

```sh
npm run serve-api
```

<br>
<!-- BUILDING //////////////////////////////////////////////////////////// -->

## Building

Build the app for production to the `build` folder.

```sh
npm run build
```

It correctly bundles React in production mode and optimizes the build for the best performance.\
The build is minified and the filenames include the hashes. Your app is ready to be deployed!

You can also preview the built application locally as follows:

```sh
npm run preview
```

<br>
<!-- DEPLOYMENT ////////////////////////////////////////////////////////// -->

## Deployment (Netlify)

A GitHub Action will automatically deploy the project to Netlify on every push.

> See the details in [.github/workflows/netlify-deploy.yml](./.github/workflows/netlify-deploy.yml)

<br>
<!-- REFERENCES ////////////////////////////////////////////////////////// -->

## References

-   [Node.js](https://nodejs.dev/)
-   [React](https://reactjs.org/)
-   [JsonServer](https://github.com/typicode/json-server)
-   [GitHub Actions](https://docs.github.com/en/actions)
    -   [Netlify](https://www.netlify.com/)
    -   [Netlify Actions](https://github.com/nwtgck/actions-netlify)
-   [2 HOURS to build a working Threads App! (Super simple!)](https://www.youtube.com/watch?v=J7HMa48mU3E)