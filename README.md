# Synca - Task Management App

A modern React Native task management application built with Expo and TypeScript.

## Features

- **Focused Tab**: View and manage your current priority tasks with priority levels, categories, and due dates
- **Backlogs Tab**: Organize and prioritize your pending tasks and future planning
- **Goals Tab**: Set and track your long-term objectives and milestones
- **Progress Tab**: Track your task completion progress with visual charts and statistics
- **Icon-Based Navigation**: Modern tab bar with intuitive icons (target for focused, tasks for backlogs, flag for goals, trending-up for progress)
- **Long Press Toast**: Long press on tab icons to see tab names
- **Floating Action Button**: Add new tasks from the Backlog tab with mini FAB options for regular or recurring tasks
- **Modern UI**: Clean, intuitive interface with smooth animations and responsive design
- **TypeScript**: Fully typed for better development experience and code quality

## Project Structure

```
synca/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── CustomTabBar.tsx
│   │   └── FloatingActionButton.tsx
│   ├── screens/        # Screen components
│   │   ├── FocusedScreen.tsx
│   │   ├── BacklogScreen.tsx
│   │   ├── GoalsScreen.tsx
│   │   └── ProgressScreen.tsx
│   ├── types/          # TypeScript type definitions
│   │   ├── task.ts
│   │   └── index.ts
│   └── assets/         # App icons and images
├── App.tsx             # Main application component
└── package.json        # Dependencies and scripts
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on your preferred platform:
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

## Dependencies

- React Native 0.79.6
- Expo SDK 53
- React Navigation 6
- TypeScript 5.8.3

## Task Management Features

- **Task Properties**: Title, description, completion status, priority, category, and due dates
- **Priority Levels**: High, Medium, Low with color-coded badges
- **Categories**: Organize tasks by work, development, documentation, meetings, etc.
- **Progress Tracking**: Visual progress bars and completion statistics
- **Interactive UI**: Tap tasks to mark them as complete/incomplete

## Development

The app follows React Native best practices:
- Functional components with React Hooks
- TypeScript for type safety
- Clean separation of concerns
- Modern styling with StyleSheet
- Responsive design principles
