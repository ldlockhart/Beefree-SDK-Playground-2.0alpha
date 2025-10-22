
# Beefree SDK - Advanced Playground

## Overview

This project is a comprehensive, production-quality "Beefree SDK Playground" that demonstrates a feature-rich and secure integration of the Beefree SDK. It is built with a modern React frontend and a Node.js/Express backend.

This playground showcases a wide range of the Beefree SDK's most powerful features, including:
- **Secure Authentication**: Uses the latest Beefree Auth v2 protocol for server-to-server token generation.
- **Template Catalog**: Dynamically load various pre-built templates into the editor.
- **HTML Importer**: Convert raw HTML into a Beefree-compatible JSON structure via a backend service.
- **Advanced Configuration**: Enables a wide array of features like the File Manager with Unsplash integration, Hosted Saved Rows, and a full set of application/content permissions.
- **Modern UI/UX**: A clean, two-column layout for an intuitive user experience.

## Tech Stack

- **Frontend**: React, Axios, Tailwind CSS
- **Backend**: Node.js, Express
- **SDK**: @beefree/beefree-sdk

## Setup Instructions

Follow these steps to get the application running locally.

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd beefree-sdk-playground
    ```

2.  **Install Backend Dependencies**:
    Navigate to the `backend` directory and install the required npm packages.
    ```bash
    cd backend
    npm install
    ```

3.  **Configure Backend Environment**:
    In the `backend` directory, create a `.env` file by copying the example:
    ```bash
    cp .env.example .env
    ```
    Open the newly created `.env` file and add your Beefree SDK application credentials. You can get these from your [Beefree developer portal](https://developers.beefree.io/).
    ```
    BEE_CLIENT_ID=your_beefree_client_id
    BEE_CLIENT_SECRET=your_beefree_client_secret
    ```

4.  **Install Frontend Dependencies**:
    Navigate to the `frontend` directory and install the required npm packages.
    ```bash
    cd ../frontend
    npm install
    ```

## Running the Application

You will need two terminal windows to run both the backend and frontend servers concurrently.

1.  **Start the Backend Server**:
    In the first terminal, navigate to the `/backend` directory and run:
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3001`.

2.  **Start the Frontend Development Server**:
    In the second terminal, navigate to the `/frontend` directory and run:
    ```bash
    npm start
    ```
    The React application will open in your browser at `http://localhost:3000`.

You can now interact with the Beefree SDK Playground!
