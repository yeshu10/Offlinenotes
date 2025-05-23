Notes Application

A modern, offline-capable notes application built with React, Redux Toolkit, and IndexedDB for local storage.

## Features

- Create, read, update, and delete notes
- Offline support with local storage
- Real-time synchronization when online
- Modern UI with Tailwind CSS
- Responsive design

## Tech Stack

- React 19
- Redux Toolkit for state management
- IndexedDB for offline storage
- Axios for API communication
- Tailwind CSS for styling
- Vite for build tooling

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd notes
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API configuration:
```env
VITE_API_BASE_URL=your_api_url_here
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Design Decisions and Tradeoffs

### State Management
- Used Redux Toolkit for predictable state management
- Tradeoff: Added complexity but provides better debugging and state predictability

### Offline Support
- Implemented IndexedDB for offline storage
- Tradeoff: Increased bundle size but provides robust offline capabilities

### UI Framework
- Chose Tailwind CSS for rapid development and consistent styling
- Tradeoff: Larger CSS bundle but better development experience

### Build Tool
- Selected Vite for faster development experience
- Tradeoff: Newer tool with smaller ecosystem but better performance

## Assumptions and Limitations

1. Browser Support
   - Requires modern browsers that support IndexedDB
   - Minimum browser versions: Chrome 24+, Firefox 16+, Safari 10+

2. Storage Limitations
   - IndexedDB storage is limited by browser quotas
   - Default limit varies by browser and available disk space

3. API Requirements
   - Backend API must support RESTful endpoints
   - API must handle CORS for cross-origin requests

## Testing

1. Run linting:
```bash
npm run lint
```

2. Start development server:
```bash
npm run dev
```

3. Preview production build:
```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/     # React components
├── store/         # Redux store and slices
├── services/      # API and database services
└── App.jsx        # Root component
``