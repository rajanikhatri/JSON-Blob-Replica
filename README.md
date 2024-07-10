# JSON Blob Website

## Overview

This JSON Blob functions similarly to the well-known JSON Blob website (https://jsonblob.com). This platform enables users to create, store, retrieve, update, and delete JSON data through a straightforward API. Each JSON data piece is assigned a unique identifier, which serves as the link for accessing and managing it.


# Getting Started with the JSON Blob Website

To get started, follow these steps:

1. **Open Visual Studio Code**
   - Load the project into Visual Studio Code.

2. **Open the Terminal**
   - You can open the terminal in Visual Studio Code by pressing `Ctrl + ` ` (backtick) or going to `View > Terminal`.

3. **Navigate to the Server Directory**
   - Type the following command, replacing `(path_to_server)` with the actual path to your server directory:
     ```sh
     cd (path_to_server)
     ```
   - You can copy the path of the server and paste it into the terminal. For example:
     ```sh
     cd "path_to_server"
     ```

4. **Run the Server**
   - Once you are in the server directory, run the following command:
     ```sh
     node Express.js
     ```
   - You should see the message: `Example app listening on port 3007`.

5. **Open the Browser**
   - Open your browser and go to:
     ```sh
     localhost:3007
     ```
   - Here, you can add your data.
 
- Create JSON Data: Click on the "Create" button to generate a new JSON blob. This will assign a unique identifier to your data.


