# Social Network

The following is a toy social network to demonstrate the usage of some data structures and algorithms

## Structure

The project is divided into the following parts:

1. Back-End: cloud functions
2. OpenAPI Schema
3. Front-End: web client
4. Front-End: CLI 

### Github setup (do only once)

* open git bash
* generate SSH key 
    ```bash
    ssh-keygen.exe
    ```
    * then hit Enter multiple times
* Get you public key
    ```bash
    cat ~/.ssh/id_rsa.pub
    ```
* add your *public* key to Github as explained in [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
## Setup
* Clone repository: 
    ```bash
    git clone git@github.com:kajahno/c1790-ed-proyecto-final.git
    ```
* In firebase: create a web application (done already)
* Install nodeJS v12 LTS
    * Install from [here](https://nodejs.org/download/release/latest-v12.x/node-v12.22.12-x64.msi)
* Install firebase SDK
    ```
    npm install
    ```
* Login to firebase:
    ```bash
    npx firebase login
    ```

### Back-end

* initialize firebase
    ```
    cd functions
    npm install
    ```
* create a .env file, and fillup with the content:
    ```
    FIREBASE_API_KEY="<the real value>"
    FIREBASE_AUTH_DOMAIN="<the real value>"
    FIREBASE_PROJECT_ID="<the real value>"
    FIREBASE_STORAGE_BUCKET="<the real value>"
    FIREBASE_MESSAGE_SENDER_ID="<the real value>"
    FIREBASE_APP_ID="<the real value>"
    FIREBASE_MEASUREMENT_ID="<the real value>"
    ```
* start development server:
    ```bash
    npx firebase emulators:start
    ```

### Front-end

* Change directories to front-end dir:
    ```bash
    cd front-end
    ```
* install dependencies
    ```bash
    npm install
    ```
* read readme.md in that folder

### CLI

* Change directories to cli dir:
    ```bash
    cd cli
    ```
* install dependencies
    ```bash
    npm install
    ```
* run CLI with:
    ```bash
    node . --help
    ```
    > Example command: `node . signup --username user --email user@mail.com --password thepass`

    > Note: you must either run the back-end locally or point to the remote back-end for most commands to work.

## Useful firebase commands

| Command | Description |
|-------- | ----------- |
|`npx firebase emulators:start` | Start firebase emulators (local development). Run from root of repo. |
|`npx firebase emulators:start --only functions` | Start back-end firebase emulator (local front-end or CLI development). Run from root of repo. |
|`npx firebase login` | Logs in to firebase. | 
|`npx firebase deploy` | Deploy the application to production. |        

## Useful git commands

| Command | Description |
|-------- | ----------- |
|`git checkout -b grupo1/login` | creates a local git branch for grupo1/login |        
|`git status` | lists changes in local repository |        
| `git config --global core.autocrlf false` | configure line endings for files |
