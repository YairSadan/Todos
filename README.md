# Todos Application

## Overview

This Todos application is a user-friendly, web-based task management tool designed to help you keep track of your daily tasks and objectives. Built with .Net webAPI and Next.js, it provides a seamless and interactive experience for managing your to-do list.

## Features

- **Add New Tasks:** Easily add new tasks to your list.
- **Delete Tasks:** Remove tasks from the list.
- **Persistent Storage:** Tasks are stored and retrieved from a database to ensure persistence.

## Watch production website

Follow this link to watch the application in production

- [Todos]https://todos-puce-one.vercel.app/todos

## Getting Started

### Prerequisites

### Prerequisites

- [.NET Core SDK](https://dotnet.microsoft.com/download) (Version 8)
- [Node.js](https://nodejs.org/en/) (Version 20 or later)
- A modern web browser
- [PostgreSQL Server](https://www.postgresql.org/download/) (running locally or remotely)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YairSadan/Todos.git

   ```

2. Navigate to the project repository:

   ```bash
   - cd Todos

   ```

3. Install dependencies for the backend:

   ```bash
   - cd Todos.API
   - dotnet restore

   ```

4. Install dependencies for the frontend:
   ```bash
   - cd ../
   - cd todos.client
   - npm install
   ```

### Configuring the Database

1. Ensure your PostgreSQL server is running.
2. Locate the `appsettings.json` file in your project directory.
3. Modify the connection string in the `appsettings.json` file to match your PostgreSQL server details:
   "ConnectionStrings": {
   "DefaultConnection": "Server=YOUR_SERVER;Port=YOUR_PORT;Database=YOUR_DATABASE;Username=YOUR_USERNAME;Password=YOUR_PASSWORD;"
   }
   Replace `YOUR_SERVER`, `YOUR_PORT`, `YOUR_DATABASE`, `YOUR_USERNAME`, and `YOUR_PASSWORD` with your PostgreSQL server details.
4. Create the DataBase
   1. Open terminal at Todos.API
   2. dotnet ef database update

### Running the Application

1. Open terminal at Todos.API folder
2. start the backend server:
   ```bash
   cd Todos.API
   dotnet run
   ```
3. Open separate terminal at todos.client folder
4. Launch the frontend
   #### For production
   ```bash
   npm run build
   npm start
   ```
   #### For development
   ```bash
   npm run dev
   ```

- Ensure that the port is 3000

### Contributing

Contributions to the Todos application are welcome. Please follow the steps below to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -am 'Add some feature').
4. Push to the branch (git push origin feature-branch).
5. Create a new Pull Request.