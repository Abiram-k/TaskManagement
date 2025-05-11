# Task Management

A task management website with real-time updates using **Socket.IO** and an integrated chart for graphical representation of task status.

## Features

- Task creation and management
- Real-time task updates via Socket.IO
- Graphical representation of task status with charts
- User authentication and authorization

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time updates**: Socket.IO
- **Charting**: Recharts
- **Deployment**: Render

## Live Link

You can access the live website at [Task Management Frontend](https://taskmanagement-frontend-5zcf.onrender.com).

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-management.git
```

### 2. Install dependencies

- cd Frontend
- npm install

cd ../Backend
npm install

### 3. Configure Environment Variables

In the Frontend directory, create a .env file.

- VITE_BACKEND_URL=http://localhost:<PORT>/api
- VITE_SOCKET_URL=http://localhost:<PORT>
- VITE_APPLICATION_MODE="development"

In the Backend directory, create a .env file.

- PORT=<PORT>
- MONGO_URI=mongodb://localhost:27017/<DB_NAME>
- CLIENT_URI=http://localhost:<PORT>
- ACCESS_TOKEN_SECRET=<YOUR_SECRETE>
- REFRESH_TOKEN_SECRET=<YOUR_SECRETE>
- NODE_ENV="development"

### 4. Running the Application

# Navigate to Backend 
cd Backend
- npm run build
- node dist/app.js

# Navigate to the Frontend directory
- cd Frontend
- npm run dev

### 5.  Open the Application

. Once both the frontend and backend are running, open your browser and navigate to:

- Frontend: http://localhost:<PORT>
- Backend: http://localhost:<PORT>

