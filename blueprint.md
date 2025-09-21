
# TalkPDF Dashboard Blueprint

## Overview

TalkPDF is a web application that allows users to upload PDF documents and interact with them through a chat interface. The application is built with Next.js and utilizes Firebase for backend services.

## Project Structure

- **/app**: Core directory for file-based routing.
  - **/firebase**: Contains Firebase configuration and service-related files.
- **/components**: Reusable UI components.
- **/lib**: Utility functions and libraries.
- **/public**: Static assets like images and fonts.

## Implemented Features

### 1. **Dashboard Layout**

- **Sidebar**: A collapsible sidebar for navigation, displaying options for creating new documents and searching through existing ones.
- **Main Content Area**: The central part of the dashboard, split into two sections:
    - **Document Viewer**: Displays the uploaded PDF file in an iframe.
    - **Chat Interface**: Allows users to interact with the document through a chat-based interface.
- **Top Bar**: A header that displays the current document's title and user information, including an avatar and name.

### 2. **File Upload**

- **Drag-and-Drop**: Users can upload PDF files by dragging and dropping them into a designated area.
- **File Selection**: Users can also click to open a file selection dialog.
- **PDF Display**: Once uploaded, the PDF is rendered in an iframe, allowing users to view the document.

### 3. **Firebase Integration**

- **Authentication**: Users can sign in and out with their Google accounts to access the application.
- **User Information**: The user's name and profile picture are displayed in the top bar after they sign in.
- **Real-time Chat**: The chat interface is connected to Firestore, enabling real-time messaging between users.

### 4. **Styling and Design**

- **Tailwind CSS**: The application is styled using Tailwind CSS for a modern and responsive design.
- **Lucide Icons**: Icons are used throughout the application to enhance usability and visual appeal.
- **Color Scheme**: A clean and professional color scheme with a dark sidebar and a light main content area.

## Future Development

- **Database Integration**: Connect to a database to store user information, documents, and chat history.
- **Enhanced PDF Interaction**: Add features like text highlighting, annotations, and search within the document.

