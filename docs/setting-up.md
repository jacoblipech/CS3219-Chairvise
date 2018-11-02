# Setting up the project

This is a step-by-step guide for setting up a development environment on your local machine.
Using this environment, you can contribute to the project by working on features, enhancements, bug fixes, etc.

## Getting Started
To get started, you should have installed the latest version of IntelliJ on your local machine. Then please follow the steps.

- Environment setup
  - Config your IntelliJ. Please install the following plug-ins:
    - Google Cloud Tools 
    - Vue.js (optional)
  - Config your Google Cloud SDK. You can follow the instructions [here](https://cloud.google.com/sdk/)
  - Prepare for app engine deployment under project root directory
    ```
    $ gcloud -q components install app-engine-java
    ```
  - Config cloud SQL proxy. Please follow the instructions [here](https://cloud.google.com/sql/docs/mysql/connect-admin-proxy)
  - Install `npm`. We suggest using `NVM`, which stands for Node Version Manager. You can follow instructions [here](https://www.npmjs.com/get-npm)
  - Install sequel-pro from [here](https://www.sequelpro.com/) (optional)
- Configuration setup (optional). By default there are pre-set configurations for the project. However, if you may wish to change them, you can edit the following files:
  - `src/main/resources/application-local.properties` for SQL server connection setup (just in case the test SQL server have some changes).
- Run your application locally
  - Inside IntelliJ you can select run configuration as __Google App Engine Standard Local Server__.
  - Click `run` button (a green arrow) to run the application.
  - Access the application through [localhost](http://localhost:8080/web/home)

## Test and Deploy

### Test
Here are two main components in this project's testing stage; front-end testing and backend testing.
__IMPORTANT__: Please make sure that all tests pass before pushing your code.

- Frontend tests:
  - Make sure that `npm` is properly installed
  - Run the following commands under root directory.
    ```
    $ cd src/web/app
    $ npm install
    $ npm run test:unit
    ```
- Backend tests:
  - Run the following commands under root directory.
    ```
    $ ./gradlew check
    ```

### Deploy
You have two ways of deploying: locally and through continuous deployment.

- Local deployment:
  - Make sure that `npm` is properly installed on your local machine. You can verify it by calling
    ```
    $ npm -v
    ```
  - Make sure that Google Cloud SDK is properly installed on your local machine. You can verify it by calling
    ```
    $ gcloud --version
    ```
  - Authorize your Google Cloud SDK locally through
    ```
    $ gcloud auth login
    ```
  - Copy `application-prod.properties.template` under `/deploy` to `src/main/resources/`.
  - Name the file as `application-prod.properties`.
  - Modify the template with corresponding information.
  - Move to frond-end directory and build front-end code
    ```
    $ cd src/web/app
    $ npm install
    $ npm run build
    ```
  - Go to project root directory and run
    ```
    $ ./gradlew appengineDeploy
    ```
  Note that please do not commit `application-prod.properties` to Github.

- Continuous deployment:
Every time when `master` branch is updated, the new stable version will be automatically deployed to Google Cloud. 
