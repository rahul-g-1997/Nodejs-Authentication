

---

# Project Setup Guide

## Overview

This project is a Node.js and Express-based application that uses MongoDB for the database. To run this project locally, you’ll need Node.js installed, MongoDB set up, and the following environment variables configured.

## Prerequisites

Before starting, ensure you have:

- **Node.js (v14.x or higher)** - You can download it from [Node.js Official Website](https://nodejs.org/).
- **MongoDB** - Either a local installation or MongoDB Atlas account if using cloud-based MongoDB.

## Setting Up the Project

### 1. Clone the Repository

Start by cloning the project repository from GitHub:

```bash
git clone https://github.com/rahul-g-1997/Nodejs-Authentication
cd <project-directory>
```

Replace `<project-directory>` with the folder name you want to save the project.

### 2. Install Dependencies

Once you’ve cloned the repository, navigate to the project directory and run the following command to install all necessary Node.js packages:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of your project directory with the following environment variables:

#### `.env` file:

```env
# Application Port
PORT=8000

# Allowed Origin(s) for CORS
CORS_ORIGIN=*  # Change this to your frontend domain if applicable.

# MongoDB URI
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/database?retryWrites=true&w=majority

# Secret key for sessions and JWT
SECRET_KEY=your-secret-key
```

- **MongoDB URI**: Replace `username`, `password`, and `database` with your MongoDB Atlas database credentials. If using a local MongoDB instance, replace `mongodb+srv://` with `mongodb://localhost:27017/your-database-name`.
- **Secret Key**: Choose a secure, random string to use as your `SECRET_KEY`. This key will be used for encrypting session data and signing JSON Web Tokens (JWT).

### 4. Start MongoDB (if using local)

If you’re running a local MongoDB instance, start it using:

```bash
mongod
```

### 5. Run the Application

With all dependencies installed and environment variables configured, start the application by running:

```bash
npm start
```

The application should be running at `http://localhost:8000` by default. You can open your browser and access this URL to view the app.

### 6. Testing & Development

During development, if you make changes to routes, models, or middleware, simply restart the application by running:

```bash
npm restart
```

### 7. Production Environment

For production, use a process manager like `pm2` to run the application for better process management:

```bash
npm install -g pm2
pm2 start server.js
```

This will run your application as a background process and manage process restarts, logging, and more.

## Common Issues & Solutions

1. **CORS Errors**:
   If you’re getting CORS errors, ensure your `CORS_ORIGIN` in the `.env` file matches the domain where the front end is running.

2. **Database Connection Issues**:
   If the application cannot connect to the database, verify that your `MONGODB_URI` in the `.env` file is correct and that your MongoDB service is running (e.g., `mongod` for local).

3. **Session Management**:
   Ensure your session handling (`SECRET_KEY` in the `.env` file) is consistent across both client and server-side applications.

## Deployment

For deploying this application to production, you can use platforms like:

- **Heroku**: With Heroku, you only need to set the environment variables in the app configuration settings.
- **AWS Elastic Beanstalk**: Provide a `package.json` file with `start` script and environment variables configured.
- **Docker**: Containerize the app with Docker for cross-platform deployments.

## Contributing

Feel free to fork this repository, create a new branch, make changes, and submit a pull request. Please ensure to test your changes and follow best practices.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
