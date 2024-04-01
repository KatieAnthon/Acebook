## Acebook MERN

In this project, we worked with an existing application. A
significant part of the challenge was to familiarise ourselves with the
codebase inherited, then we worked to **improve and extend** it within a time period of 2 weeks.

## Key Feautures:
- Create User profile
- Create/ Delete Posts with pictures
- Friend Request
- Instant Messaging service with friends
- Like, comment and interact with other peoples posts

### Structure

This repo contains two applications:

- A frontend React App
- A backend api server

These two applications will communicate through HTTP requests, and need to be
run separately.

### Quickstart

### Install Node.js

If you haven't already, make sure you have node and NVM installed.

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), (`20.5.0` at
   time of writing).
   ```
   nvm install 20
   ```

### Set up the project

1. Install dependencies for both the `frontend` and `api` applications:
   ```
   cd frontend
   npm install
   cd ../api
   npm install
   ```
2. Install an ESLint plugin for your editor, for example
   [ESLint for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3. Install MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@6.0
   ```
   _Note:_ If you see a message that says
   `If you need to have mongodb-community@6.0 first in your PATH, run:`, follow
   the instruction. Restart your terminal after this.
4. Start MongoDB

   ```
   brew services start mongodb-community@6.0
   ```

### Setting up environment variables.

.env files should contain the following:
#### Frontend
```
VITE_BACKEND_URL="http://localhost:3000"
```
#### Backend

```
MONGODB_URL="mongodb://0.0.0.0/acebook"
NODE_ENV="development"
JWT_SECRET="secret"
```

### How to run the server and use the app

1. Start the server application (in the `api` directory) in dev mode:

```
; cd api
; npm run dev
```

2. Start the front end application (in the `frontend` directory)

In a new terminal session...

```
; cd frontend
; npm run dev
```

