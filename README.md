# Photography Portfolio with Admin Dashboard

A modern, full-stack photography portfolio website built with React and Node.js, featuring a secure admin dashboard for content management.

![Portfolio Preview](https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80)

## Features

- 🎨 Sleek, modern, and responsive design
- 📱 Fully mobile-friendly UI
- 🖼️ Dynamic image gallery with categorized collections
- 🔒 Secure admin dashboard for easy content management
- 💾 Seamless MongoDB integration
- 🔐 Robust JWT authentication
- 🌐 Multi-page navigation
- ✨ Smooth transitions powered by Framer Motion

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Lucide Icons
- React Hot Toast

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Cookie Parser
- CORS Handling

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- MongoDB (local instance or remote database)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/photography-portfolio.git
cd photography-portfolio
```

2. Install dependencies:
```bash
npm run install:all
```

3. Configure environment variables:

Create a `.env` file inside the `backend` directory:
```env
PORT=3000
JWT_SECRET=your-secret-key
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-password
```

4. Start the development servers:
```bash
npm run dev
```
This command launches both the frontend (port 5173) and backend (port 3000) concurrently.

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── index.js
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── package.json
└── package.json
```

## Detailed Features

### Public Pages
- **Home**: Engaging landing page showcasing services and recent work
- **Gallery**: Filterable image collection organized into categories
- **Projects**: Detailed project presentations
- **Contact**: Reach out via a user-friendly contact form with integrated social links

### Admin Dashboard
- Secure login authentication
- Intuitive project and gallery management
- Multi-image uploads with thumbnail support
- Instant updates via real-time synchronization
- Easy logout functionality

### Security Features
- JWT-based authentication
- Secure HTTP-only cookies
- Protected API endpoints
- Persistent MongoDB storage

## API Endpoints

- `POST /api/login` - Authenticate admin
- `POST /api/logout` - Admin logout
- `GET /api/projects` - Retrieve all projects
- `PUT /api/projects/:id` - Modify project details

## Deployment

This project is deployable on any Node.js-supported hosting service. To ensure smooth deployment:

1. Configure the environment variables correctly.
2. Establish a secure MongoDB connection.
3. Enable CORS settings for your domain.
4. Implement proper security headers.

## Screenshots

![Screenshot 1](/screenshots/ss%20(1).png)
![Screenshot 2](/screenshots/ss%20(2).png)
![Screenshot 3](/screenshots/ss%20(3).png)
![Screenshot 4](/screenshots/ss%20(4).png)
![Screenshot 5](/screenshots/ss%20(5).png)

