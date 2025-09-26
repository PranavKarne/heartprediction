# Heart Disease Prediction System 🫀

A comprehensive web application for heart disease prediction powered by machine learning and AI assistance.

## Features ✨

- **AI-Powered Prediction**: Upload medical reports (JPEG/PDF) for heart disease risk assessment
- **CardioCare AI Assistant**: Interactive AI chatbot for health consultations and guidance
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Modern, mobile-friendly interface
- **Real-time Analysis**: Instant prediction results with detailed explanations

## Tech Stack 🛠️

### Frontend
- **React.js 19.1.1** - Modern UI framework
- **React Router DOM** - Client-side routing
- **CSS3** - Responsive styling

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **JWT** - Authentication
- **Mongoose** - MongoDB object modeling

## Project Structure 📁

```
heart/
├── frontend/          # React.js frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components (Prediction, AI Chat, etc.)
│   │   └── AuthContext.js # Authentication context
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── backend/           # Node.js backend API
│   ├── models/           # Database models (User, ChatHistory, etc.)
│   ├── routes/           # API routes (auth, chat, analysis)
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   └── server.js         # Main server file
└── README.md         # Project documentation
```

## Getting Started 🚀

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PranavKarne/heart.git
   cd heart
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` files in both frontend and backend directories:
   
   **Backend `.env`:**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
   
   **Frontend `.env`:**
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

5. **Run the Application**
   
   **Start Backend Server:**
   ```bash
   cd backend
   npm start
   ```
   
   **Start Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm start
   ```

6. **Access the Application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## Usage 💡

1. **Register/Login**: Create an account or sign in
2. **Upload Medical Reports**: Go to Prediction page and upload JPEG/PDF files
3. **Get Predictions**: Receive AI-powered heart disease risk assessment
4. **Chat with CardioCare AI**: Get health guidance and ask questions
5. **View History**: Track your previous analyses and consultations

## Features in Detail 🔍

### Prediction System
- Accepts JPEG and PDF medical reports
- File size limit: 10MB
- Drag-and-drop interface
- Real-time validation

### CardioCare AI Assistant
- 24/7 health consultation
- Personalized responses
- Chat history storage
- Medical disclaimer included

### Security
- JWT-based authentication
- Secure file upload
- Input validation
- Protected routes

## API Endpoints 🔗

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/analysis/predict` - Heart disease prediction
- `GET /api/chat/history` - Chat history
- `POST /api/chat/message` - Send chat message

## Development 👨‍💻

### Available Scripts

**Backend:**
```bash
npm start       # Start server with nodemon
npm run dev     # Development mode with auto-restart
```

**Frontend:**
```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests
```

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact 📧

**Pranav Karne** - [GitHub](https://github.com/PranavKarne)

Project Link: [https://github.com/PranavKarne/heart](https://github.com/PranavKarne/heart)

## Acknowledgments 🙏

- React.js community for excellent documentation
- MongoDB Atlas for cloud database services
- OpenAI for AI integration possibilities
- Healthcare professionals for domain expertise

---

⭐ Star this repository if you found it helpful!

