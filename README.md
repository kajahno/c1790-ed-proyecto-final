# Social Network

The following is a toy social network to demonstrate the usage of some data structures and algorithms

## Structure

The project is divided into the following parts:

1. Back-End: cloud functions
2. OpenAPI Schema
3. Front-End: web client
4. Front-End: CLI 

## Setup
* In firebase: create a web application
* Install nodeJS v16 LTS
    * Install from [here](https://nodejs.dev/download)
* Install firebase globally 
    ```bash
    npm install -g firebase-tools
    ```
* Login to firebase 
    ```bash
    firebase login
    ```
* Install firebase SDK
    ```
    npm install
    ```

### Back-end

* initialize firebase
    ```
    cd functions
    npm install
    ```

## Useful firebase commands

| Command | Description |
|-------- | ----------- |
|`firebase emulators:start` | Start firebase emulators (local development). Run from root of repo. |        

## Useful git commands

| Command | Description |
|-------- | ----------- |
|`git checkout -b grupo1/login` | creates a local git branch for grupo1/login |        
|`git status` | lists changes in local repository |        
| `git config --global core.autocrlf false` | configure line endings for files |
