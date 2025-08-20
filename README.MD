# Files Reader application

## Summary

__Files Reader__ is a lightweight Node.js microservice that scans a predefined directory on the server, keeps track of the files in memory using Redux Toolkit, and exposes a few endpoints to interact with this state.

The service maintains the state of the files (whether they currently exist in the folder or not) for the lifetime of the process. It allows users to:

- List all files in the directory along with their active status.

- Rescan the directory to detect newly added or deleted files and update the in-memory state (redux)

- Download the current state of files as a JSON file.

This app is designed to be a self-contained microservice, requiring no database, though it can be extended with one for persistent storage.

## Stack

It is built entirely with Node.js, Express, and Redux Toolkit (running on the server). For a safer and better development application was written in TypeScript using modules, which currently is becoming an industry standard. For code factoring and additional code realtime checking eslint and prettier was used, which enhances development even more.

## Installation and Running

1. Clone the repository

   ```bash
    git clone https://github.com/ausrys/files_reader.git
    cd files_reader/server
    ```

2. Install dependencies
   Make sure you have Node.js (>=18) and npm installed.

   ```bash
   npm install
   ```

> [!IMPORTANT]
> This project is written in TypeScript. Compile it into JavaScript. The files will be compiled in the /dist folder.

3. Compile Typescript

   ```bash
   npm run build
   ```

4. Start the server

    ```bash
    npm run start
    ```

    The server will run on:

    ```bash
    http://localhost:3000
    ```

> [!TIP]
> If you want to run the project in development with automatic rebuilds:

5. Development mode (optional)

   ```bash
   npm run dev
   ```

   It uses __tsx watch src/server.ts__ to run with out rebuilding mannualy (like nodemon)

All the scripts can be found in __package.json__ file.

   > [!IMPORTANT]
   > Files need to be added mannualy to /data folder. If you run the app as dev, put files in /server/src/data. If you run compiled app, put files in /server/dist/src/data.

## App Structure

```bash
files_reader/
├─ src/
│  ├─ controllers/             # Routes controller functions
│  │   └─ filesController.ts   # Controller for files router
│  ├─ data/                    # Predefined folder where files are scanned and stored
│  ├─ routes/                  # Express route handlers
│  │   └─ index.ts             # Main router 
│  │   └─ filesRouter.ts       # Files router: /list, /scan, /download-state
│  ├─ store/                   # Redux Toolkit store for managing file state
│  │   ├─ slices               # Slices defining files state and reducers
│  │   └─ store.ts             # Redux store setup
│  ├─ services/                # Utility functions
│  │   └─ fileService.ts       # Files handling functions
│  ├─ middleware/              # Middleware folder
│  │   └─ expressMiddleware.ts # (404 handler)
│  └─ app.ts                   # Creates express app, uses middleware
│  └─ server.ts                # Entry point of the backend
├─ dist/                       # Compiled JavaScript output after tsc build
├─ package.json
├─ tsconfig.json
└─ README.md
```

### Explanation

- src/data/ – The directory that is scanned for files.

    If it doesn’t exist, the server will create it automatically at runtime.

- src/routes/ – Contains all route definitions and routers

- src/controllers/ – Contains all controllers for their respected routes

- src/store/ – Holds Redux Toolkit store and slices; keeps in-memory file state.

- src/services/ – Helper functions, e.g., scanning directories.

- src/middleware/ – Custom middleware, like error handling 404 responses.

- dist/ – Auto-generated folder with compiled JS after running npm run build.

- server.ts – The main entry point where Express is initialized and routes are registered.

## API Endpoints

> [!IMPORTANT]
> API adress with out endpoints: /api/v1/files

### Example request

```http
GET http://localhost:3000/api/v1/files/list
```

1. GET /list
    Description: Returns the current list of files in memory, along with their active status:
    - active: true → file exists in the folder
    - active: false → file was removed after previous scans
    Example Response:

    ```json
    [
     { "name": "file1.txt", "active": true },
     { "name": "file2.jpg", "active": false }
    ]
    ```

2. GET /scan
    Description: Rescans the predefined folder for any changes:
    - Marks removed files as active: false
    - Adds new files with active: true
    Example Response:

    ```json
    [
     { "name": "file1.txt", "active": true },
     { "name": "file2.jpg", "active": false }
    ]
    ```

3. GET /download-state
    Description: Downloads the current Redux state as a JSON file. This allows you to save a snapshot of files and their status.
    Example Response:
    The server returns a file named state_dump.json containing:

    ```json
    [
     { "name": "file1.txt", "active": true },
     { "name": "file2.jpg", "active": false }
    ]
    ```

4. Unknown routes (Error Boundary)
    Description: Any request to an undefined endpoint returns a 404 JSON with instructions.
    Example Request:

    ```http
    GET http://localhost:3000/unknown
    ```

    Example response:

    ```json
       {
     "error": "Endpoint not found",
     "message": "Please visit one of the following endpoints:",
     "availableEndpoints": [
       { "method": "GET", "path": "/list" },
       { "method": "GET", "path": "/scan" },
       { "method": "GET", "path": "/download-state" }
     ]
   }
    ```

## How it works / Flow

1. Server Startup

   - When the Node.js server starts, it initializes the Redux store in memory.

   - The predefined folder (src/data in dev, dist/data in production) is checked. If it doesn’t exist, the server creates it.

2. Initial scan

   - The server can perform an initial scan of the folder to populate the Redux state with existing files.

   - Each file is stored as an object in a redux state.

3. List files /list

    - Returns the current state of files in memory, showing which are active or inactive.

4. Rescan folder /scan

    - The server rescans the folder
    - Marks missing files as active: false in the redux state
    - Adds new files with active: true

5. Download State /download-state

    - Returns the current Redux state as a JSON file, allowing users to save the snapshot.

6. Error handling

    - Requests to undefined routes return a 404 JSON message with a list of valid endpoints.

## My notes and tips

1. State lifecycle

    - The Redux state in this microservice lives in memory for the lifetime of the Node.js process.
    - This means:
      - If the server restarts or crashes or loses power to some external variables, all state is reset.
      - Files previously marked as active: false are lost.
      - The service will perform a fresh scan on startup.
    This kind of outcome can be detremental if the state of the files is important (active/not active files)

2. Persistence with a Database
   - To preserve state across restarts, you can introduce a database (PostgreSQL, MySQL).
   - Workflow with a database:
     - On server startup, read existing file records from the database.
     - Scan the folder and compare with database entries:
       - Update active status for removed files.
       - Insert new files with active: true.
     - Save any changes back to the database.
   - This allows maintaining history of files, recovery after crashes, and long-term tracking.
