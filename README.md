# Chairvise

## Project overview

## Get started

## Test and deploy

### Test


### Deploy
You have two ways of deploying: locally and through continuous deployment.

- local deployment:
  - make sure that npm is properly installed on your local machine. You can verify it by calling
    ```
    $ npm -v
    ```
  - make sure that Google Cloud SDK is properly installed on your local machine. You can verify it by calling
    ```
    $ gcloud --version
    ```
  - authorize your Google Cloud SDK locally through
    ```
    $ gcloud auth login
    ```
  - prepare for app engine deployment under project root directory
    ```
    $ gcloud -q components install app-engine-java
    ```
  - copy `application-prod.properties.template` under `/deploy` to `src/main/resources/`.
  - name the file as `application-prod.properties`.
  - modify the template with corresponding information.
  - move to frond-end directory and build front-end code
    ```
    $ cd src/web/app
    $ npm install
    $ npm run build
    ```
  - go to project root directory and run
    ```
    $ ./gradlew appengineDeploy
    ```
  Note that please do not commit `application-prod.properties` to Github.

- continuous deployment:
every time when `master` branch is updated, the new stable version will be automatically deployed to Google Cloud. 
