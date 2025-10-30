# CardioPredict - Heart Failure Prediction System 🫀# CardioPredict - Heart Failure Prediction System 🫀# CardioPredict - Heart Failure Prediction System 🫀



An advanced web application for heart failure prediction powered by CNN-GNN machine learning models and AI assistance.



## Features ✨An advanced web application for heart failure prediction powered by CNN-GNN machine learning models and AI assistance.An advanced web application for heart failure prediction powered by CNN-GNN machine learning models and AI assistance.



- **ECG Image Analysis**: Upload ECG images (PNG format) for heart disease risk assessment using deep learning

- **CNN-GNN Model**: State-of-the-art hybrid architecture combining Convolutional Neural Networks and Graph Neural Networks

- **5 Condition Classification**: Detects Normal (NORM), Myocardial Infarction (MI), ST/T Change (STTC), Hypertrophy (HYP), and Conduction Disturbance (CD)## Features ✨## Features ✨ 

- **CardioCare AI Assistant**: Interactive AI chatbot for health consultations and guidance

- **User Authentication**: Secure login/registration with JWT and password reset functionality

- **Analysis History**: Track all past ECG uploads with detailed predictions and timestamps

- **Responsive Design**: Modern, mobile-friendly interface with fixed navigation bar- **ECG Image Analysis**: Upload ECG images (PNG format) for heart disease risk assessment using deep learning- **ECG Image Analysis**: Upload ECG images (PNG) for heart disease risk assessment using deep learning

- **Real-time Results**: Instant predictions with risk scores, confidence levels, and probability distributions

- **CNN-GNN Model**: State-of-the-art hybrid architecture combining Convolutional Neural Networks and Graph Neural Networks- **CNN-GNN Model**: State-of-the-art Graph Neural Network combined with Convolutional Neural Networks for accurate predictions

## Tech Stack 🛠️

- **5 Condition Classification**: Detects Normal (NORM), Myocardial Infarction (MI), ST/T Change (STTC), Hypertrophy (HYP), and Conduction Disturbance (CD)- **CardioCare AI Assistant**: Interactive AI chatbot for health consultations and guidance

### Frontend

- **React.js 19.1.1** - Modern UI framework- **CardioCare AI Assistant**: Interactive AI chatbot for health consultations and guidance- **User Authentication**: Secure login/registration with JWT and password reset functionality

- **React Router DOM 7.8.2** - Client-side routing

- **CSS3** - Custom responsive styling with animations- **User Authentication**: Secure login/registration with JWT and password reset functionality via email- **Analysis History**: Track all past ECG uploads and predictions in your profile



### Backend- **Analysis History**: Track all past ECG uploads with detailed predictions and timestamps- **Responsive Design**: Modern, mobile-friendly interface with fixed navigation

- **Node.js & Express.js 4.21.1** - RESTful API server

- **MongoDB Atlas** - Cloud database for user data and analysis history- **Responsive Design**: Modern, mobile-friendly interface with fixed navigation bar- **Real-time Analysis**: Instant prediction results with risk scores, confidence levels, and probability distributions

- **Mongoose 8.18.1** - MongoDB ODM

- **JWT (jsonwebtoken 9.0.2)** - Token-based authentication- **Real-time Results**: Instant predictions with risk scores, confidence levels, and probability distributions

- **Multer 1.4.5** - File upload handling for ECG images

- **bcryptjs 3.0.2** - Password hashing and security## Tech Stack 🛠️



### Machine Learning## Tech Stack 🛠️

- **Python 3.11** - ML model inference engine

- **PyTorch** - Deep learning framework### Frontend

- **CNN-GNN Hybrid Architecture**:

  - **LeadCNN**: 1D CNN for ECG lead-specific feature extraction (12 leads)### Frontend- **React.js 19.1.1** - Modern UI framework

  - **ECG_CNN_GNN**: Graph Neural Network for inter-lead relationship modeling

- **Fine-tuned Model**: Trained on cardiovascular datasets with calibrated thresholds- **React.js 19.1.1** - Modern UI framework- **React Router DOM** - Client-side routing

- **Risk Calibration**: Disease-specific threshold tuning (MI: 0.92, STTC: 0.78, HYP: 0.92, CD: 0.91)

- **OpenCV & SciPy**: ECG image digitization and signal processing- **React Router DOM 7.8.2** - Client-side routing- **CSS3** - Responsive styling



## Project Structure 📁- **CSS3** - Custom responsive styling with animations



```### Backend

heartprediction/

├── frontend/                  # React.js frontend### Backend- **Node.js & Express.js** - RESTful API server

│   ├── src/

│   │   ├── components/- **Node.js & Express.js 4.21.1** - RESTful API server- **MongoDB Atlas** - Cloud database for user data and analysis history

│   │   │   └── Navigation.jsx # Navigation bar component

│   │   ├── pages/- **MongoDB Atlas** - Cloud database for user data and analysis history- **Mongoose** - MongoDB object modeling

│   │   │   ├── Index.jsx      # Landing page

│   │   │   ├── Upload.jsx     # ECG upload & prediction- **Mongoose 8.18.1** - MongoDB ODM- **JWT** - Secure authentication with token-based sessions

│   │   │   ├── Ai.jsx         # CardioCare AI chat

│   │   │   ├── Profile.jsx    # User profile- **JWT (jsonwebtoken 9.0.2)** - Token-based authentication- **Multer** - File upload handling for ECG images

│   │   │   ├── History.jsx    # Analysis history

│   │   │   ├── Login.jsx      # Authentication- **Multer 1.4.5** - File upload handling for ECG images- **Python 3.11** - ML model inference

│   │   │   ├── ForgotPassword.jsx

│   │   │   ├── ResetPassword.jsx- **bcryptjs 3.0.2** - Password hashing and security- **PyTorch** - Deep learning framework for CNN-GNN model

│   │   │   ├── Contact.jsx

│   │   │   └── Styles.css     # Global styles- **bcrypt** - Password hashing

│   │   ├── AuthContext.js     # Authentication context

│   │   ├── AuthModal.js       # Auth modal component### Machine Learning

│   │   ├── App.js             # Main app component

│   │   └── index.js           # Entry point- **Python 3.11** - ML model inference engine### Machine Learning

│   ├── public/

│   └── package.json- **PyTorch** - Deep learning framework- **CNN-GNN Architecture** - Hybrid model combining CNNs and Graph Neural Networks

│

├── backend/                   # Node.js backend API- **CNN-GNN Hybrid Architecture**:- **LeadCNN** - ECG lead-specific feature extraction

│   ├── models/

│   │   ├── User.js           # User schema with auth  - **LeadCNN**: 1D CNN for ECG lead-specific feature extraction (12 leads)- **PyTorch Model** - Fine-tuned model for 5 heart condition classifications

│   │   ├── AnalysisHistory.js # Prediction history

│   │   ├── ChatHistory.js     # AI chat logs  - **ECG_CNN_GNN**: Graph Neural Network for inter-lead relationship modeling- **Risk Calibration** - Threshold-based risk level assessment

│   │   ├── PatientData.js     # Patient records

│   │   └── finetuned_model.pt # PyTorch CNN-GNN model (232KB)- **Fine-tuned Model**: Trained on cardiovascular datasets with calibrated thresholds

│   ├── routes/

│   │   ├── auth.js           # Authentication endpoints- **Risk Calibration**: Disease-specific threshold tuning (MI: 0.92, STTC: 0.78, HYP: 0.92, CD: 0.91)## Project Structure 📁

│   │   ├── analysis.js       # ECG prediction API

│   │   ├── chat.js           # AI chat endpoints- **OpenCV & SciPy**: ECG image digitization and signal processing

│   │   └── patients.js       # Patient management

│   ├── middleware/```

│   │   └── auth.js           # JWT verification

│   ├── config/## Project Structure 📁heart/

│   │   └── database.js       # MongoDB connection

│   ├── predict.py            # Python ML inference script├── frontend/          # React.js frontend application

│   ├── requirements-ml.txt   # Python dependencies

│   ├── server.js             # Express server```│   ├── src/

│   └── package.json

│heartprediction/│   │   ├── components/    # Reusable components

└── README.md

```├── frontend/                  # React.js frontend│   │   ├── pages/         # Page components (Prediction, AI Chat, etc.)



## Getting Started 🚀│   ├── src/│   │   └── AuthContext.js # Authentication context



### Prerequisites│   │   ├── components/│   ├── public/           # Static assets

- **Node.js** v16 or higher

- **Python 3.11**│   │   │   └── Navigation.jsx # Navigation bar component│   └── package.json      # Frontend dependencies

- **MongoDB Atlas** account

- **Git**│   │   ├── pages/├── backend/           # Node.js backend API



### Installation│   │   │   ├── Index.jsx      # Landing page│   ├── models/           # Database models (User, ChatHistory, etc.)



1. **Clone the repository**│   │   │   ├── Upload.jsx     # ECG upload & prediction│   ├── routes/           # API routes (auth, chat, analysis)

   ```bash

   git clone https://github.com/PranavKarne/heartprediction.git│   │   │   ├── Ai.jsx         # CardioCare AI chat│   ├── middleware/       # Custom middleware

   cd heartprediction

   ```│   │   │   ├── Profile.jsx    # User profile│   ├── config/           # Configuration files



2. **Install Backend Dependencies**│   │   │   ├── History.jsx    # Analysis history│   └── server.js         # Main server file

   ```bash

   cd backend│   │   │   ├── Login.jsx      # Authentication└── README.md         # Project documentation

   npm install

   ```│   │   │   ├── ForgotPassword.jsx```



3. **Install Python ML Dependencies**│   │   │   ├── ResetPassword.jsx

   ```bash

   cd backend│   │   │   ├── Contact.jsx## Getting Started 🚀

   pip install -r requirements-ml.txt

   ```│   │   │   └── Styles.css     # Global styles

   Required packages:

   - torch│   │   ├── AuthContext.js     # Authentication context### Prerequisites

   - torch-geometric

   - opencv-python│   │   ├── AuthModal.js       # Auth modal component- Node.js (v16 or higher)

   - scipy

   - numpy│   │   ├── App.js             # Main app component- MongoDB Atlas account



4. **Install Frontend Dependencies**│   │   └── index.js           # Entry point- Git

   ```bash

   cd frontend│   ├── public/

   npm install

   ```│   └── package.json### Installation



5. **Environment Setup**│

   

   Create a `.env` file in the `backend/` directory:├── backend/                   # Node.js backend API1. **Clone the repository**

   

   ```env│   ├── models/   ```bash

   # MongoDB Atlas Connection

   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/heartprediction?retryWrites=true&w=majority│   │   ├── User.js           # User schema with auth   git clone https://github.com/PranavKarne/heart.git

   

   # JWT Secret (generate a secure random string)│   │   ├── AnalysisHistory.js # Prediction history   cd heart

   JWT_SECRET=your_secure_jwt_secret_key_at_least_32_characters

   JWT_EXPIRE=7d│   │   ├── ChatHistory.js     # AI chat logs   ```

   

   # Server Configuration│   │   ├── PatientData.js     # Patient records

   PORT=5000

   NODE_ENV=development│   │   └── finetuned_model.pt # PyTorch CNN-GNN model2. **Install Backend Dependencies**

   ```

│   ├── routes/   ```bash

6. **Run the Application**

   │   │   ├── auth.js           # Authentication endpoints   cd backend

   **Terminal 1 - Start Backend:**

   ```bash│   │   ├── analysis.js       # ECG prediction API   npm install

   cd backend

   npm run dev│   │   ├── chat.js           # AI chat endpoints   ```

   ```

   Backend runs on `http://localhost:5000`│   │   └── patients.js       # Patient management

   

   **Terminal 2 - Start Frontend:**│   ├── middleware/3. **Install Frontend Dependencies**

   ```bash

   cd frontend│   │   └── auth.js           # JWT verification   ```bash

   npm start

   ```│   ├── config/   cd ../frontend

   Frontend runs on `http://localhost:3000`

│   │   └── database.js       # MongoDB connection   npm install

7. **Access the Application**

   │   ├── predict.py            # Python ML inference script   ```

   Open your browser and navigate to: `http://localhost:3000`

│   ├── requirements-ml.txt   # Python dependencies

## Usage Guide 💡

│   ├── server.js             # Express server4. **Environment Setup**

### 1. Authentication

- **Sign Up**: Create a new account with email, password, name, phone, and date of birth│   └── package.json   

- **Login**: Access your account with email and password

- **Forgot Password**: Request password reset link│   Create `.env` files in both frontend and backend directories by copying the example files:

- **Reset Password**: Set new password using the reset token

└── README.md   

### 2. ECG Analysis

- Navigate to **"Prediction"** page```   **Backend Environment:**

- Upload a **PNG ECG image** (6x2 grid format preferred)

- Maximum file size: **10MB**   ```bash

- Receive instant prediction with:

  - **Risk Level**: Low/Medium/High/Critical## Getting Started 🚀   cd backend

  - **Risk Score**: Numerical assessment (0-100)

  - **Confidence**: Model certainty percentage   cp .env.example .env

  - **Predicted Condition**: Primary diagnosis

  - **Probability Distribution**: Confidence for all 5 conditions### Prerequisites   # Edit .env with your actual values



### 3. CardioCare AI Assistant- **Node.js** v16 or higher   ```

- Navigate to **"CardioCare AI"** page

- Chat with the AI for:- **Python 3.11**   

  - Heart health guidance

  - Interpretation of prediction results- **MongoDB Atlas** account   **Frontend Environment:**

  - Risk factor information

  - General cardiovascular questions- **Git**   ```bash

- All conversations are saved to your chat history

   cd frontend

### 4. Analysis History

- View in **"Profile"** page or dedicated **"History"** page### Installation   cp .env.example .env

- Track all past ECG uploads with:

  - Upload date and time   # Edit .env with your actual values

  - Risk assessment results

  - Probability scores1. **Clone the repository**   ```

  - File information

   ```bash   

## API Endpoints 🔗

   git clone https://github.com/PranavKarne/heartprediction.git   **Required Backend Environment Variables:**

### Authentication

- `POST /api/auth/register` - Register new user   cd heartprediction   ```env

- `POST /api/auth/login` - User login

- `GET /api/auth/me` - Get current user (protected)   ```   MONGODB_URI=your_mongodb_connection_string

- `PUT /api/auth/profile` - Update user profile (protected)

- `POST /api/auth/forgot-password` - Request password reset   JWT_SECRET=your_jwt_secret_key

- `POST /api/auth/reset-password` - Reset password with token

2. **Install Backend Dependencies**   PORT=5000

### Analysis

- `POST /api/analysis/predict` - Upload ECG and get prediction (protected)   ```bash   ```

- `GET /api/analysis/history` - Get user's analysis history (protected)

- `GET /api/analysis/:analysisId` - Get specific analysis (protected)   cd backend   

- `DELETE /api/analysis/:analysisId` - Delete analysis (protected)

   npm install   **Required Frontend Environment Variables:**

### Chat

- `POST /api/chat/session/start` - Start new chat session (protected)   ```   ```env

- `POST /api/chat/message` - Send message to AI (protected)

- `GET /api/chat/session/:sessionId` - Get chat session (protected)   REACT_APP_API_URL=http://localhost:5000

- `GET /api/chat/sessions` - Get all user sessions (protected)

- `PUT /api/chat/session/:sessionId/end` - End chat session (protected)3. **Install Python ML Dependencies**   ```

- `DELETE /api/chat/sessions/:sessionId` - Delete session (protected)

   ```bash

### Patients

- `POST /api/patients` - Create patient record (protected)   cd backend5. **Run the Application**

- `POST /api/patients/analyze` - Analyze patient data (protected)

- `GET /api/patients/history` - Get patient history (protected)   pip install -r requirements-ml.txt   



## Model Details 🧠   ```   **Start Backend Server:**



### Architecture   Required packages:   ```bash

The prediction system uses a hybrid CNN-GNN architecture:

   - torch   cd backend

1. **LeadCNN Module**

   - 1D Convolutional layers for feature extraction   - torch-geometric   npm start

   - Processes each of the 12 ECG leads independently

   - BatchNorm and ReLU activations   - opencv-python   ```

   - Adaptive pooling for fixed-size output

   - scipy   

2. **ECG_CNN_GNN Module**

   - GCN (Graph Convolutional Network) layers   - numpy   **Start Frontend (in a new terminal):**

   - Models relationships between ECG leads

   - Global mean pooling for graph-level features   ```bash

   - Fully connected classifier

4. **Install Frontend Dependencies**   cd frontend

3. **Output**

   - 5-class classification: NORM, MI, STTC, HYP, CD   ```bash   npm start

   - Softmax probabilities for each condition

   - Calibrated thresholds for risk assessment   cd frontend   ```



### Training   npm install

- Fine-tuned on cardiovascular datasets

- Calibrated thresholds for optimal sensitivity/specificity   ```6. **Access the Application**

- Model file: `backend/models/finetuned_model.pt` (232KB)

   - Frontend: `http://localhost:3000`

## Development 👨‍💻

5. **Environment Setup**   - Backend API: `http://localhost:5000`

### Available Scripts

   

**Backend:**

```bash   Create a `.env` file in the `backend/` directory:## Usage 💡

npm start       # Start with node

npm run dev     # Development with nodemon (auto-restart)   

```

   ```env1. **Register/Login**: Create an account or sign in

**Frontend:**

```bash   # MongoDB Atlas Connection2. **Upload Medical Reports**: Go to Prediction page and upload JPEG/PDF files

npm start       # Start development server

npm run build   # Production build   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/heartprediction?retryWrites=true&w=majority3. **Get Predictions**: Receive AI-powered heart disease risk assessment

npm test        # Run tests

npm run eject   # Eject from Create React App   4. **Chat with CardioCare AI**: Get health guidance and ask questions

```

   # JWT Secret (generate a secure random string)5. **View History**: Track your previous analyses and consultations

### Python Script

The `predict.py` script:   JWT_SECRET=your_secure_jwt_secret_key_at_least_32_characters

- Accepts ECG image path as command-line argument

- Digitizes 6x2 grid ECG images   JWT_EXPIRE=7d## Features in Detail 🔍

- Runs inference with PyTorch model

- Returns JSON output with predictions   



## Security Features 🔒   # Server Configuration### Prediction System



- **JWT Authentication**: Secure token-based sessions (7-day expiry)   PORT=5000- Accepts JPEG and PDF medical reports

- **Password Hashing**: bcrypt with salt rounds

- **Protected Routes**: Middleware-based authorization   NODE_ENV=development- File size limit: 10MB

- **Input Validation**: File type and size restrictions

- **MongoDB Atlas**: Encrypted cloud database   ```- Drag-and-drop interface

- **Environment Variables**: Sensitive data protection

- Real-time validation

## Contributing 🤝

6. **Run the Application**

1. Fork the repository

2. Create a feature branch (`git checkout -b feature/AmazingFeature`)   ### CardioCare AI Assistant

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the branch (`git push origin feature/AmazingFeature`)   **Terminal 1 - Start Backend:**- 24/7 health consultation

5. Open a Pull Request

   ```bash- Personalized responses

## Known Issues & Limitations ⚠️

   cd backend- Chat history storage

- ECG images must be in PNG format (6x2 grid layout preferred)

- Python 3.11 specifically required for ML inference   npm run dev- Medical disclaimer included

- Model file size: 232KB

- CardioCare AI requires internet connection   ```

- Analysis history limited to authenticated users

   Backend runs on `http://localhost:5000`### Security

## Future Enhancements 🚀

   - JWT-based authentication

- [ ] Support for additional ECG formats (DICOM, PDF)

- [ ] Real-time ECG monitoring integration   **Terminal 2 - Start Frontend:**- Secure file upload

- [ ] Mobile app (React Native)

- [ ] Multi-language support   ```bash- Input validation

- [ ] Export analysis reports (PDF)

- [ ] Doctor consultation booking   cd frontend- Protected routes

- [ ] Enhanced AI model with more conditions

   npm start

## License 📄

   ```## API Endpoints 🔗

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

   Frontend runs on `http://localhost:3000`

## Contact 📧

- `POST /api/auth/register` - User registration

**Pranav Karne**  

- GitHub: [@PranavKarne](https://github.com/PranavKarne)7. **Access the Application**- `POST /api/auth/login` - User login

- Repository: [heartprediction](https://github.com/PranavKarne/heartprediction)

   Open your browser and navigate to: `http://localhost:3000`- `POST /api/analysis/predict` - Heart disease prediction

## Acknowledgments 🙏

- `GET /api/chat/history` - Chat history

- React.js community for excellent documentation

- MongoDB Atlas for reliable cloud database services## Usage Guide 💡- `POST /api/chat/message` - Send chat message

- PyTorch team for the deep learning framework

- Healthcare professionals for domain expertise

- Open-source contributors

### 1. Authentication## Development 👨‍💻

## Disclaimer ⚕️

- **Sign Up**: Create a new account with email, password, name, phone, and date of birth

**CardioPredict is for educational and research purposes only.** This tool should NOT be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

- **Login**: Access your account with email and password### Available Scripts

---

- **Forgot Password**: Request password reset link via email

⭐ **Star this repository if you found it helpful!**

- **Reset Password**: Set new password using the reset token**Backend:**

```bash

### 2. ECG Analysisnpm start       # Start server with nodemon

- Navigate to **"Prediction"** pagenpm run dev     # Development mode with auto-restart

- Upload a **PNG ECG image** (6x2 grid format preferred)```

- Maximum file size: **10MB**

- Receive instant prediction with:**Frontend:**

  - **Risk Level**: Low/Medium/High/Critical```bash

  - **Risk Score**: Numerical assessment (0-100)npm start       # Start development server

  - **Confidence**: Model certainty percentagenpm run build   # Build for production

  - **Predicted Condition**: Primary diagnosisnpm test        # Run tests

  - **Probability Distribution**: Confidence for all 5 conditions```



### 3. CardioCare AI Assistant## Contributing 🤝

- Navigate to **"CardioCare AI"** page

- Chat with the AI for:1. Fork the repository

  - Heart health guidance2. Create a feature branch (`git checkout -b feature/AmazingFeature`)

  - Interpretation of prediction results3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

  - Risk factor information4. Push to the branch (`git push origin feature/AmazingFeature`)

  - General cardiovascular questions5. Open a Pull Request

- All conversations are saved to your chat history

## License 📄

### 4. Analysis History

- View in **"Profile"** page or dedicated **"History"** pageThis project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

- Track all past ECG uploads with:

  - Upload date and time## Contact 📧

  - Risk assessment results

  - Probability scores**Pranav Karne** - [GitHub](https://github.com/PranavKarne)

  - File information

Project Link: [https://github.com/PranavKarne/heart](https://github.com/PranavKarne/heart)

## API Endpoints 🔗

## Acknowledgments 🙏

### Authentication

- `POST /api/auth/register` - Register new user- React.js community for excellent documentation

- `POST /api/auth/login` - User login- MongoDB Atlas for cloud database services

- `GET /api/auth/me` - Get current user (protected)- OpenAI for AI integration possibilities

- `PUT /api/auth/profile` - Update user profile (protected)- Healthcare professionals for domain expertise

- `POST /api/auth/forgot-password` - Request password reset

- `POST /api/auth/reset-password` - Reset password with token---



### Analysis⭐ Star this repository if you found it helpful!

- `POST /api/analysis/predict` - Upload ECG and get prediction (protected)

- `GET /api/analysis/history` - Get user's analysis history (protected)
- `GET /api/analysis/:analysisId` - Get specific analysis (protected)
- `DELETE /api/analysis/:analysisId` - Delete analysis (protected)

### Chat
- `POST /api/chat/session/start` - Start new chat session (protected)
- `POST /api/chat/message` - Send message to AI (protected)
- `GET /api/chat/session/:sessionId` - Get chat session (protected)
- `GET /api/chat/sessions` - Get all user sessions (protected)
- `PUT /api/chat/session/:sessionId/end` - End chat session (protected)
- `DELETE /api/chat/sessions/:sessionId` - Delete session (protected)

### Patients
- `POST /api/patients` - Create patient record (protected)
- `POST /api/patients/analyze` - Analyze patient data (protected)
- `GET /api/patients/history` - Get patient history (protected)

## Model Details 🧠

### Architecture
The prediction system uses a hybrid CNN-GNN architecture:

1. **LeadCNN Module**
   - 1D Convolutional layers for feature extraction
   - Processes each of the 12 ECG leads independently
   - BatchNorm and ReLU activations
   - Adaptive pooling for fixed-size output

2. **ECG_CNN_GNN Module**
   - GCN (Graph Convolutional Network) layers
   - Models relationships between ECG leads
   - Global mean pooling for graph-level features
   - Fully connected classifier

3. **Output**
   - 5-class classification: NORM, MI, STTC, HYP, CD
   - Softmax probabilities for each condition
   - Calibrated thresholds for risk assessment

### Training
- Fine-tuned on cardiovascular datasets
- Calibrated thresholds for optimal sensitivity/specificity
- Model file: `backend/models/finetuned_model.pt`

## Development 👨‍💻

### Available Scripts

**Backend:**
```bash
npm start       # Start with node
npm run dev     # Development with nodemon (auto-restart)
```

**Frontend:**
```bash
npm start       # Start development server
npm run build   # Production build
npm test        # Run tests
npm run eject   # Eject from Create React App
```

### Python Script
The `predict.py` script:
- Accepts ECG image path as command-line argument
- Digitizes 6x2 grid ECG images
- Runs inference with PyTorch model
- Returns JSON output with predictions

## Security Features 🔒

- **JWT Authentication**: Secure token-based sessions
- **Password Hashing**: bcrypt with salt rounds
- **Protected Routes**: Middleware-based authorization
- **Input Validation**: File type and size restrictions
- **MongoDB Atlas**: Encrypted cloud database
- **Environment Variables**: Sensitive data protection

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Known Issues & Limitations ⚠️

- ECG images must be in PNG format (6x2 grid layout preferred)
- Python 3.11 specifically required for ML inference
- Large model file (~232KB) may cause slow initial load
- CardioCare AI requires internet connection
- Analysis history limited to authenticated users

## Future Enhancements 🚀

- [ ] Support for additional ECG formats (DICOM, PDF)
- [ ] Real-time ECG monitoring integration
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Export analysis reports (PDF)
- [ ] Doctor consultation booking
- [ ] Enhanced AI model with more conditions

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact 📧

**Pranav Karne**  
- GitHub: [@PranavKarne](https://github.com/PranavKarne)
- Repository: [heartprediction](https://github.com/PranavKarne/heartprediction)

## Acknowledgments 🙏

- React.js community for excellent documentation
- MongoDB Atlas for reliable cloud database services
- PyTorch team for the deep learning framework
- Healthcare professionals for domain expertise
- Open-source contributors

## Disclaimer ⚕️

**CardioPredict is for educational and research purposes only.** This tool should NOT be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

---

⭐ **Star this repository if you found it helpful!**
