# E-Learnation
## Introduction
E-Learnation is a web application built using Node.js and Express.js that provides a platform for online education. It incorporates Role-Based Access Control (RBAC) to manage user roles and permissions effectively. This README serves as a guide to set up and use the E-Learnation project.

## Features
- User authentication and authorization with RBAC controls.
- CRUD operations for managing courses, lessons, and users.
- Access control for various user roles such as students, instructors, and administrators.
- User-friendly interface for browsing courses and accessing lessons.
- Secure payment integration for premium content (optional feature).
- Installation

## Clone the repository from GitHub:

- git clone https://github.com/rxjans/e-learnation.git

## Navigate into the project directory:
- cd e-learnation

## Install dependencies using npm:
- npm install

## Configuration
- Rename the .env.example file to .env.
- Configure the environment variables in the .env file according to your setup. Variables such as database connection details, session secret, and port can be set here.

## Database Setup
- E-Learnation uses a database to store user information, courses, and lessons. Ensure that you have a compatible database installed (e.g., MySQL, PostgreSQL).
- Create a new database for E-Learnation.
- Update the database connection details in the .env file.


## Running the Application
Start the application:
- npm start
- Once the server is running, access the application in your web browser at http://localhost:8000 (or the port you specified in the .env file).

## Usage
- User Registration and Login: Users can register for an account and log in to access the platform.
- Browsing Courses: Browse available courses categorized by topics.
- Enrolling in Courses: Students can enroll in courses they are interested in.
- Accessing Lessons: Users can access lessons within enrolled courses.
- Instructor Features: Instructors can create, update, and delete courses and lessons assigned to them.
- Admin Controls: Administrators have access to manage users, courses, and lessons across the platform.

## Contributing
Contributions to the project are welcome. To contribute, follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b feature/new-feature).
- Make your changes and commit them (git commit -am 'Add new feature').
- Push to the branch (git push origin feature/new-feature).
- Create a new Pull Request.