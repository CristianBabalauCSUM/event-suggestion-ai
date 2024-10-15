# Event Scheduler with AI Integration

## Project Overview
This project is part of an Intelligent User Interfaces (IUI) assignment. The application allows users to schedule events on a calendar, either by manually inputting details or by leveraging AI-driven suggestions. Built with a **React Native + Expo** frontend and a **Python** backend utilizing the **Ollama 3.1 model**, the app provides personalized event suggestions based on user preferences.

## Features
- **Manual Event Input**: Users can add events to their calendar manually.
- **AI-Powered Event Suggestions**: Based on user preferences, the AI suggests activities and events to schedule.
  
## Installation and Setup

### Prerequisites
- **Node.js**: Ensure you have Node.js installed on your machine.
  
### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/CristianBabalauCSUM/event-suggestion-ai.git
   cd event-suggestion-ai
   ```
2. Install dependencies:
   ```bash
   npm i install
   ```
### Running the Application with Expo
1. Start the application
   ```bash
   npx expo start
   ``` 
2. Install the Expo Go app on your phone
3. Scan the QR code to view the app
4. Optional: Open up http://localhost:8081 in your browser to see a webview, but the webview lacks of styling. The app was primarly developed for mobile devices.

### Technologies Used

- React Native + Expo
- Python: Interface between frontend and AI model
- Ollama 3.1 Model: Used for generating personalized activity suggestions.
