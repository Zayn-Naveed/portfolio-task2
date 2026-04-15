# Dynamic About Page with Team Management System

A full-stack web application featuring a professional About page with dynamic team member management.

## Live Demo
> Running locally — backend requires Node.js and MongoDB

## GitHub Repository
[View Code](https://github.com/Zayn-Naveed/portfolio-task2)

## Technologies Used
### Frontend
- HTML5 (Semantic)
- CSS3 (Flexbox, Animations, Responsive Design)
- JavaScript (Vanilla JS, Fetch API)
- Font Awesome (Icons)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)

### Packages
- express
- mongoose
- cors
- dotenv
- nodemon

## Features
- Professional About section with Mission, Vision and Services
- Dynamic team members loaded from MongoDB database
- Search team members by name
- Filter team members by role
- Fully responsive (Desktop, Tablet, Mobile)
- Hover effects on cards
- Social media links (LinkedIn, GitHub)

## Admin Panel Features
- Add new team member
- Edit existing team member
- Delete team member
- Real-time updates without page refresh

## Project Structure

portfolio-task2/
│
├── server.js              # Express server & MongoDB connection
├── .env                   # Environment variables
├── models/
│   └── Team.js            # MongoDB team member schema
├── routes/
│   └── teamRoutes.js      # API routes (GET, POST, PUT, DELETE)
└── public/
├── index.html         # About page (frontend)
├── admin.html         # Admin panel
├── style.css          # All styling
├── script.js          # Frontend JS (fetch & display)
└── admin.js           # Admin panel JS (CRUD operations)

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/team | Fetch all team members |
| POST | /api/team | Add new team member |
| PUT | /api/team/:id | Update team member |
| DELETE | /api/team/:id | Delete team member |

## Setup Instructions
1. Clone the repository
2. Run `npm install`
3. Create `.env` file with:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/portfolio_db

4. Make sure MongoDB is running
5. Run `nodemon server.js`
6. Open `http://localhost:3000`

## Developer
**Zain Naveed**
BS Software Engineering Graduate
[GitHub Profile](https://github.com/Zayn-Naveed)

