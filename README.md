# CardioPredict - Heart Failure Prediction System 🫀

An advanced web application for heart disease prediction powered by CNN-GNN machine learning models and AI assistance. Upload ECG images, get instant risk assessments, and consult with our AI health assistant.

---

## 🌟 Features

### Core Functionality
- **ECG Image Analysis** - Upload PNG ECG images for instant heart disease risk assessment
- **AI-Powered Predictions** - CNN-GNN hybrid model analyzes 12-lead ECG patterns
- **5 Condition Classification** - Detects Normal (NORM), Myocardial Infarction (MI), ST/T Change (STTC), Hypertrophy (HYP), and Conduction Disturbance (CD)
- **CardioCare AI Assistant** - Interactive chatbot for health consultations and medical guidance
- **Analysis History** - Track all past ECG uploads with detailed predictions and timestamps
- **Real-time Results** - Instant predictions with risk scores, confidence levels, and probability distributions

### User Experience
- **Secure Authentication** - JWT-based login/registration system
- **Responsive Design** - Modern, mobile-friendly interface with smooth animations
- **User Profile Management** - Update personal information and view complete medical history
- **Chat History** - Save and review all AI assistant conversations

---

## 🛠️ Tech Stack

### Frontend
- **React.js** `19.1.1` - Modern UI framework
- **React Router DOM** `7.8.2` - Client-side routing
- **CSS3** - Custom responsive styling with animations

### Backend
- **Node.js & Express.js** `4.21.1` - RESTful API server
- **MongoDB Atlas** - Cloud database for user data and analysis history
- **Mongoose** `8.18.1` - MongoDB ODM
- **JWT** `9.0.2` - Token-based authentication (7-day expiry)
- **Multer** `1.4.5` - File upload handling for ECG images (PNG, 10MB max)
- **bcryptjs** `3.0.2` - Password hashing and security

### Machine Learning
- **Python** `3.11` - ML model inference engine
- **PyTorch** - Deep learning framework
- **CNN-GNN Hybrid Architecture**
  - **LeadCNN**: 1D CNN for 12-lead ECG feature extraction
  - **ECG_CNN_GNN**: Graph Neural Network for inter-lead relationship modeling
- **Model File**: `finetuned_model.pt` (232KB)
- **Risk Calibration**: Disease-specific thresholds (MI: 0.92, STTC: 0.78, HYP: 0.92, CD: 0.91)
- **Dependencies**: OpenCV, SciPy, NumPy for ECG image digitization

---

## 📁 Project Structure

```
heartprediction/
├── frontend/                    # React.js frontend application
│   ├── src/
│   │   ├── components/
│   │   │   └── Navigation.jsx   # Fixed navigation bar
│   │   ├── pages/
│   │   │   ├── Index.jsx        # Landing page
│   │   │   ├── Upload.jsx       # ECG upload & prediction
│   │   │   ├── Ai.jsx           # CardioCare AI chat
│   │   │   ├── Profile.jsx      # User profile & history
│   │   │   ├── Login.jsx        # Authentication
│   │   │   ├── Contact.jsx      # Contact page
│   │   │   └── Styles.css       # Page styles
│   │   ├── AuthContext.js       # Authentication state
│   │   ├── AuthModal.js         # Login/signup modal
│   │   ├── App.js               # Main component
│   │   └── index.js             # Entry point
│   ├── public/
│   └── package.json
│
├── backend/                     # Node.js backend API
│   ├── models/
│   │   ├── User.js              # User authentication schema
│   │   ├── AnalysisHistory.js   # Prediction records
│   │   ├── ChatHistory.js       # AI chat logs
│   │   ├── PatientData.js       # Patient information
│   │   └── finetuned_model.pt   # PyTorch CNN-GNN model (232KB)
│   ├── routes/
│   │   ├── auth.js              # Login, register, password reset
│   │   ├── analysis.js          # ECG prediction endpoints
│   │   ├── chat.js              # AI chat endpoints
│   │   └── patients.js          # Patient management
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── config/
│   │   └── database.js          # MongoDB Atlas connection
│   ├── predict.py               # Python ML inference script
│   ├── requirements-ml.txt      # Python dependencies
│   ├── server.js                # Express server
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** 3.11
- **MongoDB Atlas** account
- **Git**

### Installation

**1. Clone the Repository**
```bash
git clone https://github.com/PranavKarne/heartprediction.git
cd heartprediction
```

**2. Install Backend Dependencies**
```bash
cd backend
npm install
```

**3. Install Python ML Dependencies**
```bash
cd backend
pip install -r requirements-ml.txt
```
Required packages: `torch`, `torch-geometric`, `opencv-python`, `scipy`, `numpy`

**4. Install Frontend Dependencies**
```bash
cd frontend
npm install
```

**5. Environment Configuration**

Create a `.env` file in the `backend/` directory:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/heartprediction?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_key_at_least_32_characters
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development
```

**6. Run the Application**

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend runs on `http://localhost:3000`

**7. Access the Application**

Open your browser and navigate to: **`http://localhost:3000`**

---

## 💡 Usage Guide

### 1. Authentication
1. **Sign Up** - Create an account with email, password, name, phone, and date of birth
2. **Login** - Access your account with email and password

### 2. ECG Analysis
1. Navigate to the **"Prediction"** page
2. Upload a **PNG ECG image** (6x2 grid format, max 10MB)
3. Receive instant prediction results:
   - **Risk Level**: Low / Medium / High / Critical
   - **Risk Score**: Numerical assessment (0-100)
   - **Confidence**: Model certainty percentage
   - **Predicted Condition**: Primary diagnosis
   - **Probability Distribution**: Confidence scores for all 5 conditions

### 3. CardioCare AI Assistant
1. Navigate to the **"CardioCare AI"** page
2. Start a conversation for:
   - Heart health guidance and general wellness tips
   - Interpretation of your prediction results
   - Information about cardiovascular risk factors
   - Answers to general heart health questions
3. All conversations are automatically saved to your chat history

### 4. Analysis History
1. View your complete medical history in the **"Profile"** page
2. Track all past ECG uploads with:
   - Upload date and time
   - Risk assessment results
   - Probability scores for each condition
   - File information

---

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update user profile | Yes |

### Analysis
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/analysis/predict` | Upload ECG and get prediction | Yes |
| GET | `/api/analysis/history` | Get user's analysis history | Yes |
| GET | `/api/analysis/:analysisId` | Get specific analysis | Yes |
| DELETE | `/api/analysis/:analysisId` | Delete analysis record | Yes |

### Chat
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/chat/session/start` | Start new chat session | Yes |
| POST | `/api/chat/message` | Send message to AI | Yes |
| GET | `/api/chat/session/:sessionId` | Get chat session | Yes |
| GET | `/api/chat/sessions` | Get all user sessions | Yes |
| PUT | `/api/chat/session/:sessionId/end` | End chat session | Yes |
| DELETE | `/api/chat/sessions/:sessionId` | Delete chat session | Yes |

### Patients
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/patients` | Create patient record | Yes |
| POST | `/api/patients/analyze` | Analyze patient data | Yes |
| GET | `/api/patients/history` | Get patient history | Yes |

---

## 🧠 Model Architecture

### Hybrid CNN-GNN Design

**1. LeadCNN Module**
- 1D Convolutional layers for ECG feature extraction
- Processes each of the 12 ECG leads independently
- BatchNorm and ReLU activations
- Adaptive pooling for fixed-size output

**2. ECG_CNN_GNN Module**
- Graph Convolutional Network (GCN) layers
- Models complex relationships between ECG leads
- Global mean pooling for graph-level features
- Fully connected classifier for final prediction

**3. Output Classification**
- 5-class classification: **NORM**, **MI**, **STTC**, **HYP**, **CD**
- Softmax probabilities for each condition
- Calibrated thresholds for optimal accuracy

### Training Details
- Fine-tuned on cardiovascular ECG datasets
- Calibrated thresholds for optimal sensitivity/specificity balance
- Model file: `backend/models/finetuned_model.pt` (232KB)

---

## 🔒 Security Features

- ✅ **JWT Authentication** - Secure token-based sessions with 7-day expiry
- ✅ **Password Hashing** - bcrypt with salt rounds for secure password storage
- ✅ **Protected Routes** - Middleware-based authorization for sensitive endpoints
- ✅ **Input Validation** - File type and size restrictions (PNG only, 10MB max)
- ✅ **MongoDB Atlas** - Encrypted cloud database with secure connections
- ✅ **Environment Variables** - Sensitive data protection via `.env` files

---

## 👨‍💻 Development

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

### Python Inference Script
The `predict.py` script handles ML inference:
- Accepts ECG image path as command-line argument
- Digitizes 6x2 grid ECG images using OpenCV
- Runs inference with PyTorch CNN-GNN model
- Returns JSON output with predictions and probabilities

**Usage:**
```bash
python3.11 predict.py /path/to/ecg_image.png
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⚠️ Known Issues & Limitations

- ECG images must be in **PNG format** (6x2 grid layout preferred)
- **Python 3.11** specifically required for ML inference
- Model file size: 232KB
- CardioCare AI requires internet connection
- Analysis history limited to authenticated users

---

## 🚀 Future Enhancements

- [ ] Support for additional ECG formats (DICOM, PDF)
- [ ] Real-time ECG monitoring integration
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Export analysis reports (PDF)
- [ ] Doctor consultation booking
- [ ] Enhanced AI model with more conditions

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Pranav Karne**  
- GitHub: [@PranavKarne](https://github.com/PranavKarne)
- Repository: [heartprediction](https://github.com/PranavKarne/heartprediction)

---

## 🙏 Acknowledgments

- React.js community for excellent documentation
- MongoDB Atlas for reliable cloud database services
- PyTorch team for the deep learning framework
- Healthcare professionals for domain expertise
- Open-source contributors

---

## ⚕️ Disclaimer

**CardioPredict is for educational and research purposes only.** This tool should NOT be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

---

⭐ **Star this repository if you found it helpful!**
