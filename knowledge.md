# Recipe Website React Project

## Overview
A recipe website built with React that allows users to:
- Browse meal categories
- Search for recipes
- View detailed meal information
- Chat with a recipe bot

## Architecture
- React frontend with React Router for navigation
- Uses Context API for state management
- Integrates with TheMealDB API (https://www.themealdb.com/api/json/v1/1/)
- Tailwind CSS for styling

## Key Components
- Header with search functionality
- Category browsing
- Meal details view
- Chatbot interface

## API Integration
Base URL: https://www.themealdb.com/api/json/v1/1/
Endpoints:
- categories.php - Get meal categories
- filter.php?c= - Filter by category
- lookup.php?i= - Get meal details
- search.php?s= - Search meals

## Style Guidelines
- Use Tailwind CSS classes for styling
- Follow existing component structure
- Keep components focused and single-purpose
- Maintain consistent error handling
