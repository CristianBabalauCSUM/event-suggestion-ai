# Event Scheduler with AI Integration (React Native + Python)

## Project Overview

This project is part of an Intelligent User Interfaces (IUI) assignment, integrating a React Native + Expo frontend with a Python backend using the Ollama 3.1 model. The application helps users schedule events on a calendar. Users can manually input events or, by leveraging AI, get smart suggestions for activities and events based on their preferences.

## Core Features

	•	Manual Event Creation: Users can manually add events to a calendar using an intuitive mobile interface.
	•	AI-Assisted Event Suggestions: By clicking a button, users can get AI-suggested activities/events, making the scheduling process faster and more personalized.
	•	Cross-Platform Compatibility: Built with React Native, the app runs on both iOS and Android.

## Architecture Overview

This project follows a client-server architecture where the frontend (React Native) interacts with the backend (Python) using HTTP requests. The user input from the mobile app is sent to the backend, which processes it with AI and returns event suggestions or handles event creation tasks.