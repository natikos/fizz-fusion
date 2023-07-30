# FizzFusion App

## Prerequisites:

- Node.js v18.17.0 (npm v9.6.7)
- Docker
- A positive attitude and a good mood 😄

## Getting Started:

### 1. Add .env File

Before you start the development process, make sure to add a `.env` file. You can find a `.env.example` file in the root directory to get started. Replace the mock values with your own configuration details.

### 2. Run MongoDB in a Container

To set up the database, run MongoDB in a Docker container using the following command:

```sh
docker run -d --name fizz-fusion-db -p 27017:27017 mongo:6.0.8
```

### 3. Install Server Dependencies

Next, install the server dependencies by running the following command:

```sh
npm install
```

### 4. Start the Server

Once the dependencies are installed, you can start the server in development mode using the command:

```sh
npm run start:dev
```

### 5. Create Magic!

You're all set! With the server running, you can now create magic and bring your FizzFusion app to life.
Feel free to explore the codebase, develop new features, and make the app even more awesome!
Remember, the key to success is maintaining a positive attitude and having fun while developing the app. Happy coding! 😊
