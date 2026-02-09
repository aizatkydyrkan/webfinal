# Elite Bistro OS | Full-Stack Reservation System

A production-ready restaurant management application built with the **MVC architecture**. This system allows guests to make real-time reservations while providing administrators with a secure, JWT-protected dashboard to manage the restaurant's occupancy.

---

## Project Links
- **Live Demo (Render):** [[https://your-app-name.onrender.com](https://elite-bistro-os-full-stack-reservation.onrender.com)]

---

## Technology Stack
- **Frontend:** HTML5, CSS3 (Tailwind CSS), JavaScript (Vanilla ES6+).
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (NoSQL).
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt (Password Hashing).
- **Deployment:** Render.

---

## Architectural Pattern (MVC)
The project follows a modular **Model-View-Controller** structure to ensure scalability and maintainability:

- **Models:** Mongoose schemas for `User` (Admins) and `Reservation`.
- **Views:** Static frontend served via `express.static` from the `/public` directory.
- **Controllers/Routes:** Decoupled business logic for authentication and booking management.




---

## API Documentation

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register-admin` | Create admin (Requires Secret Code) | Public |
| `POST` | `/api/auth/login` | Authenticate and receive JWT | Public |
| `GET` | `/api/res/status` | Get current seat availability | Public |
| `POST` | `/api/res/create` | Submit a new reservation | Public |
| `GET` | `/api/res/list` | View all reservations | **Admin Only** |
| `DELETE` | `/api/res/delete/:id` | Remove a reservation | **Admin Only** |

---

## Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <https://github.com/aizatkydyrkan/webfinal>
   cd webfinal
2. **Install dependencies:**
   ```bash
   npm install
3. **Configure Environment Variables:**
   ```bash
   MONGO_URI=ongodb+srv://aizatkydyrkan:aizat_2007@cluster1.7xvci6o.mongodb.net/?appName=Cluster1
   JWT_SECRET=my_ultra_secret_key
   ADMIN_SECRET_CODE=123456
   PORT=3000
4. **Start the server:**
   ```bash
   node server.js
