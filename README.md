# Task Manager Application

## Installation

1. Clone the repository:
```
git clone https://github.com/shalinikatore32/REPO_NAME.git
```
2. Navigate to the project directory:
```
cd REPO_NAME
```
3. Install the dependencies:
```
npm install
```

## Usage

1. Start the development server:
```
npm start
```
2. Open your web browser and navigate to `http://localhost:3000`.

## API

The project uses the following API endpoints:

- `GET /users`: Fetches the list of users.
- `POST /assign-task/:taskId`: Assigns a task to a user.
- `POST /create-task`: Creates a new task.
- `GET /fetch/user/task/:userId`: Fetches all tasks for a user.
- `DELETE /delete/task/:taskId`: Deletes a task.
- `PUT /update/task/:taskId`: Updates a task.

