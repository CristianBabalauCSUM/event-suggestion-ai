# Event Scheduler with AI Integration (React Native + Python)

## Project Overview

This project is part of an Intelligent User Interfaces (IUI) assignment, integrating a React Native + Expo frontend with a Python backend using the Ollama 3.1 model. The application helps users schedule events on a calendar. Users can manually input events or, by leveraging AI, get smart suggestions for activities and events based on their preferences.

I had the same issue. And I was researching a lot and I found this^

Go to node_modules/@react-native-community/cli-server-api/build/statusPageMiddleware.js
On line 19 wrap process.cwd() to new URL() like this:
new URL(process.cwd())
Before reload clean cache in npm using npm cache clean --force
Run using npm run start / npm run android
I hope this will help you too 😇