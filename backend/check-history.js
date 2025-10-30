// Test script to check MongoDB analysis history
require('dotenv').config();
const mongoose = require('mongoose');
const AnalysisHistory = require('./models/AnalysisHistory');

async function checkAnalysisHistory() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Count total analyses
    const count = await AnalysisHistory.countDocuments();
    console.log(`\n📊 Total analyses in database: ${count}`);

    // Get recent analyses
    const analyses = await AnalysisHistory.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('userId inputData.fileName results.riskLevel results.predictedClass createdAt');

    if (analyses.length > 0) {
      console.log('\n📋 Recent analyses:');
      analyses.forEach((analysis, index) => {
        console.log(`\n${index + 1}. ${analysis.inputData?.fileName || 'Unknown file'}`);
        console.log(`   Risk Level: ${analysis.results.riskLevel}`);
        console.log(`   Predicted: ${analysis.results.predictedClass}`);
        console.log(`   Date: ${analysis.createdAt.toLocaleString()}`);
        console.log(`   User ID: ${analysis.userId}`);
      });
    } else {
      console.log('\n⚠️  No analyses found in database yet.');
      console.log('Upload an ECG file to create your first analysis!');
    }

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkAnalysisHistory();
