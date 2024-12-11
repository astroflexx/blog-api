# Blog API

A blog app with a backend and two frontends built using **Express.js**, **Prisma ORM**, **PostgreSQL**, and **React**.

## Features

### Backend Features

- **User Authentication**: JWT-based authentication for login and registration.
- **Post Management**:
  - CRUD operations for posts (only by the post author).
- **Comment Management**:
  - CRUD operations for comments (authenticated users only).

### Frontend-1 (Reader)

- View all posts.
- Authenticated users can create, update, and delete their comments.

### Frontend-2 (Author)

- CRUD operations for posts (only by the post author).

## Tech Stack

- **Backend**: Node.js, Express.js, Prisma ORM, PostgreSQL, JWT Authentication.
- **Frontend**: React.
