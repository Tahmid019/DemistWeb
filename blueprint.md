
# TalkPDF Blueprint

## Overview

TalkPDF is a web application that allows users to upload PDF documents and interact with them through a chat interface. The application is built with Next.js and Firebase and features a sleek, dark-themed, and minimalist design that is responsive and works on all screen sizes.

## Implemented Features

- **Document Upload:** Users can upload documents via a simple, intuitive interface.
- **PDF Text Extraction:** The application extracts text from uploaded PDF files to be used by the AI.
- **AI-Powered Chat:** The chat is powered by a server-side AI that answers questions based on the extracted text.
- **Firestore Chat History:** The chat history is now saved to Firestore, providing a persistent, user-specific conversation log.
- **Responsive Design:** The application is fully responsive, providing an optimal experience on both desktop and mobile devices.
- **Dark Theme:** The UI uses a modern dark theme, inspired by developer tools, for a visually comfortable and focused user experience.
- **Firebase Integration:** The application is connected to Firebase for backend services, including chat message storage and user authentication.

## Design

- **Colors:** The application uses a dark color palette with a primary background of `#0D1117`, complemented by shades of gray and a vibrant blue (`#2563EB`) for interactive elements.
- **Typography:** The application uses a clean and modern sans-serif font for readability.
- **Icons:** The application uses icons from the Lucide icon library to provide a consistent and intuitive user experience.
- **Layout:** The application uses a simple and clean two-pane layout, with a file upload/viewer on one side and a chat interface on the other.
- **Minimalism:** The design is intentionally minimal, removing unnecessary clutter to keep the focus on the core user tasks of uploading documents and chatting.

## Current Task: AI and Backend Functionality

**Goal:** To implement the core AI and backend functionality, enabling users to chat with an AI about their uploaded documents.

**Steps Completed:**
- **PDF Text Extraction:** Created a server-side API route that extracts text from uploaded PDF files.
- **AI-Powered Chat:** Implemented a Server Action that simulates an AI response based on the extracted text.
- **Firestore Chat History:** Integrated Firestore to save and retrieve chat messages, providing a persistent conversation history for each user and document.
- **Component Integration:** Updated the `Chat` and `FileUpload` components to work with the new backend functionality.
- **Verification:** Ran `npm install` and `npm run lint` to ensure the project is healthy and free of errors.
