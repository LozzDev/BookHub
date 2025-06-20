# **BookHub** 📚

**BookHub** is a web platform designed to share and read digital books in PDF and EPUB format. Built for reading enthusiasts and curious developers alike, it allows any user to register, upload books, browse the catalog, and enjoy a smooth, integrated reading experience—all from the browser.

With a user-friendly and functional interface, **BookHub** aims to democratize access to digital reading through a tool built with modern technologies.

<img src="https://github.com/user-attachments/assets/a6588a8a-3f27-40d2-a7f6-942dc8d57ec1" alt="logo" width="250"/>


---

## 📌 **Table of Contents**
1. [⚙️ Installation and Requirements](#installation-and-requirements)
2. [👥 Team Members](#-team-members)
3. [🎨 App Design](#-app-design)
4. [🏗️ Project Architecture](#project-architecture)
5. [💻 Technologies Used](#-technologies-used) 
6. [📚 Libraries](#-libraries)
7. [🧪 Test Screenshots](#-test-screenshots)
8. [🚀 Next Steps](#-next-steps)
9. [🌐 Preview](#-preview)
10. [🔖 License](#-license)

---

## ⚙️ Installation and Requirements <a name="installation-and-requirements"></a>

1. clone the project
```
  git clone https://github.com/LozzDev/BookHub.git
```
2. switch to dev branch
```
  git switch dev
```
3. Enter to backend folder
```
  cd backend
```
4. install the dependencies
```
  npm i
```
5. launch the server with nodemon script
```
  npm start
```
6. Create your own .env with the follow attributes
```
PORT=3000

DATABASE_URL=mongoDatabaseUrl | you can get a free database here -> https://www.mongodb.com/resources/basics/databases/cloud-databases/free-cloud-database

JWT_SECRET=secretcode123
```

### Please follow these steps for frontend (open a new console tab):
1. Enter to root folder
```
  cd ..
```
2. Enter to frontend folder
```
  cd frontend
```
3. install the dependencies
```
  npm i
```
4. Create your own .env with the follow attributes
```
VITE_API = your backend direction example http://localhost:3000
```
5. launch the server
```
  npm run dev
```


## 👥 **Team Members**  

| Name | Role | GitHub |
|------|------|--------|
| **Jesús Manuel García** | Fullstack Developer | [@LozzDev](https://github.com/LozzDev) |

---

## 🎨 **App Design**

### 🖥️ Desktop Version  

| Home | Book Reader | Upload Book | User Profile |
|------|-------------|--------------|---------------|
| ![HomeD](https://github.com/user-attachments/assets/2df6a5ad-7a81-47aa-866f-c26817ab4b93) | ![bookreaderD](https://github.com/user-attachments/assets/0b56d8be-6f29-47f7-af9a-85f862436f5a) | ![uploadbookD](https://github.com/user-attachments/assets/62c0944f-c00b-4573-b60d-7951b62c7f59) | ![uploadbookD](https://github.com/user-attachments/assets/4da969c5-f4b9-4bbe-bd80-17f2beca031c) |

### 📱 Mobile Version  

| Home | Book Reader | Upload Book | User Profile |
|------|-------------|--------------|---------------|
| ![HomeM](https://github.com/user-attachments/assets/7fec2443-99e6-4a06-b8a2-5754d3a8ca59) | ![BookReaderM](https://github.com/user-attachments/assets/8bdf07df-7c91-4ee6-839b-c845e0c5780f) | ![uploadBookM](https://github.com/user-attachments/assets/baf28ef5-7eeb-4ee8-a0d5-a29c3ef34a98) | ![profileM](https://github.com/user-attachments/assets/64596a6f-efd6-4f9d-a0b4-778a103e4496) |

---

## 🏗️ Project Architecture <a name="project-architecture"></a>

📂 bookhub

├─ 📂 backend  
│ ├─ 📂 controllers  
│ ├─ 📂 models  
│ ├─ 📂 routes  
│ ├─ 📂 config  
│ ├─ 📂 middleware  
│ └─ app.js  
│ └─ server.js  

├─ 📂 frontend  
│ ├─ 📂 components  
│ ├─ 📂 pages  
│ ├─ 📂 router  
│ └─ main.jsx
 
├─ 📄 README.md  

---

## 💻 **Technologies Used**

### 👁️ Frontend
- **React** – Main library for building the user interface.
- **Vite** – Fast build tool and development server for React.
- **Tailwind CSS** – Utility-first CSS framework for responsive design.

### 🧠 Backend
- **Node.js** – JavaScript runtime for server-side development.
- **Express.js** – Minimalist web framework for building RESTful APIs.
- **MongoDB** – NoSQL database to store users and books.

## 📚 **Libraries**

### 👁️ Frontend Libraries
- **React Router DOM** – Handles routing in the browser.
- **Framer Motion** – Powerful animation library for React.
- **EPUB.js** – Client-side EPUB reader to render books in-browser.
- **SweetAlert2** – Beautiful, customizable alert dialogs.
- **Cloudinary SDK** – Upload and retrieve book covers from Cloudinary.

#### Development & Testing
- **Vite** – Frontend build tool and dev server.
- **ESLint** – Linter for code quality.
- **React Testing Library** – Testing utilities for React components.
- **Vitest** – Blazing fast unit and integration testing framework.
- **JSDOM** – Simulates a browser environment for testing.

### 🧠 Backend Libraries
- **Mongoose** – MongoDB object modeling for Node.js.
- **Dotenv** – Loads environment variables.
- **Cors** – Enables Cross-Origin Resource Sharing.
- **Cookie-Parser** – Parses cookies for authentication and session management.
- **JWT (jsonwebtoken)** – Secure token-based authentication.
- **Bcrypt** – Password hashing.
- **Multer** – Handles multipart/form-data for file uploads.
- **Multer-Storage-Cloudinary** – Integrates Multer with Cloudinary for media storage.
- **Cloudinary SDK** – Used for managing media assets in the cloud.

## 🧪 **Test Screenshots**

| Feature | Screenshot |
|---------|------------|
| **Front-end tests** | ![test front](https://github.com/user-attachments/assets/41d92fbe-c65d-400a-ac79-43ab70de247a) |
| **Back-end tests** | ![tests back](https://github.com/user-attachments/assets/e48c48ec-7dc5-4577-ab03-d4baf995e890) |
| **Front-end coverage** | ![coverage Front](https://github.com/user-attachments/assets/ba510db5-b85f-4ad5-9bd5-186e5d1603db) |
| **Back-end coverage** | ![coverage back](https://github.com/user-attachments/assets/a5768d68-c39f-44a7-9e4b-92642090d5ff) |


---

## 🚀 **Next Steps**

- Enable offline reading with Service Workers
- Admin panel for content moderation
- Dark mode and accessibility improvements

---

## 🌐 **Preview**
Coming soon…

---

## 🔖 **License**

BookHub is licensed under the [MIT license](https://opensource.org/licenses/MIT).

---
