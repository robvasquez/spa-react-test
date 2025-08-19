# SPA Test - React 19 Authentication App

A production-quality React 19 Single Page Application (SPA) built with TypeScript, Vite, TanStack Query, and Tailwind CSS. This application demonstrates a complete authentication flow with protected routes, form validation, and modern React patterns.

## 🔐 Test Credentials

**Email:** `user@example.com`  
**Password:** `Password123!`

> Use these credentials to test the authentication flow. The application uses MSW (Mock Service Worker) to simulate a real API with realistic delays.

## 🚀 Live Demo

- **Live Application**: [View Live App](https://robvasquez.github.io/spa-react-test/)
- **Source Code**: [View Source](https://github.com/robvasquez/spa-react-test)

## ✨ Features

- **React 19** with latest features and optimizations
- **TypeScript** for type safety and better developer experience
- **Vite** for fast development and optimized builds
- **TanStack Query (React Query)** for server state management
- **Tailwind CSS** for utility-first styling (no UI component libraries)
- **React Router v6** for client-side routing
- **Zod** for form validation and type inference
- **MSW (Mock Service Worker)** for API mocking in development
- **Context API** for authentication state management
- **localStorage** persistence for authentication state
- **Protected Routes** with automatic redirects
- **Comprehensive Testing** with Vitest and Testing Library
- **ESLint & Prettier** for code quality
- **Husky** for pre-commit hooks
- **GitHub Actions** for CI/CD and deployment

## 🏗️ Architecture

This application follows the **React Bulletproof** architecture pattern:

```
/src
  /app                    # Application entry point
  /components             # Reusable UI components
  /features              # Feature-based modules
    /auth                # Authentication feature
      /api              # API functions
      /components       # Auth-specific components
      /hooks           # Custom hooks
      /pages           # Auth pages
      /types           # TypeScript types
      /utils           # Utilities (storage, etc.)
    /dashboard         # Dashboard feature
  /lib                  # Shared libraries
    /msw               # Mock Service Worker setup
  /providers            # React Context providers
  /routes               # Route components
  /styles               # Global styles
  /test                 # Test setup
  /types                # Global type definitions
```

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query, React Context API
- **Routing**: React Router DOM v6
- **Validation**: Zod
- **Testing**: Vitest, Testing Library, MSW
- **Code Quality**: ESLint, Prettier, Husky
- **Deployment**: GitHub Pages, GitHub Actions

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/spa-test.git
cd spa-test
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Start development server

```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

### 4. Run tests

```bash
npm test
# or
pnpm test
```

### 5. Build for production

```bash
npm run build
# or
pnpm build
```

## 🧪 Testing

The application includes comprehensive tests for:

- **Component Testing**: Form validation, user interactions, accessibility
- **Integration Testing**: Authentication flow, protected routes
- **API Testing**: MSW handlers, error scenarios
- **E2E Testing**: Complete user journeys

Run tests with:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## 🔐 Authentication

### Test Credentials

For testing purposes, use these credentials:

- **Email**: `user@example.com`
- **Password**: `Password123!`

### Authentication Flow

1. **Sign In**: Users enter email/password on `/sign-in`
2. **Validation**: Client-side validation with Zod
3. **API Call**: POST to `/api/auth/sign-in` (mocked with MSW)
4. **Success**: Store token/user in localStorage, redirect to `/dashboard`
5. **Failure**: Display error message with aria-live for accessibility
6. **Token Validation**: Periodic validation of stored token
7. **Sign Out**: Clear state and redirect to `/sign-in`

### Protected Routes

- `/dashboard` - Requires authentication
- `/sign-in` - Public route
- `/*` - 404 Not Found

## 🎨 Styling

The application uses **Tailwind CSS** exclusively with:

- Custom color palette with primary colors
- Responsive design patterns
- Focus states for accessibility
- Loading states and animations
- Consistent spacing and typography

**No UI component libraries** are used - all components are built with Tailwind utilities.

## 🔧 Configuration

### Vite Base Path

The Vite configuration includes a base path for GitHub Pages deployment:

```typescript
// vite.config.ts
export default defineConfig({
  base: '/spa-test/', // Change this to match your repository name
  // ...
});
```

**To change the base path:**
1. Update the `base` property in `vite.config.ts`
2. Update the repository name in the GitHub Actions workflow
3. Update the README links

### Environment Variables

No environment variables are required as the application uses MSW for API mocking.

## 🚀 Deployment

### GitHub Pages

The application is automatically deployed to GitHub Pages via GitHub Actions:

1. **Push to main branch** triggers the deployment workflow
2. **Build process** runs tests, linting, and builds the application
3. **Deployment** uploads the build artifact to GitHub Pages

### Manual Deployment

To deploy manually:

1. Build the application: `npm run build`
2. The built files will be in the `dist/` directory
3. Deploy the contents to your hosting provider

## 📝 Code Quality

### Linting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix
```

### Formatting

```bash
# Format code with Prettier
npm run format
```

### Pre-commit Hooks

Husky runs the following on every commit:
- ESLint with auto-fix
- Prettier formatting
- Type checking

## 🧪 Testing Strategy

### Unit Tests
- Component rendering and interactions
- Form validation logic
- Utility functions

### Integration Tests
- Authentication flow
- Protected route behavior
- API interactions

### Accessibility Tests
- ARIA attributes
- Keyboard navigation
- Screen reader compatibility

## 🔒 Security Considerations

- **No data attributes** on email/password inputs (per assignment requirements)
- **Token validation** with automatic logout on invalid tokens
- **Secure storage** using localStorage with error handling
- **Input validation** with Zod schema validation
- **Error boundaries** for graceful error handling

## 📚 Key Implementation Details

### Form Validation
- **Zod schemas** for type-safe validation
- **Real-time validation** with field-level error messages
- **Accessible error display** with proper ARIA attributes

### Authentication Context
- **Reducer pattern** for predictable state updates
- **localStorage persistence** with error handling
- **Token validation** with automatic cleanup
- **Extensible design** for future auth providers

### API Mocking
- **MSW handlers** for realistic API responses
- **Simulated delays** (800-1200ms for sign-in, 300-500ms for getMe)
- **Error scenarios** for comprehensive testing
- **Token-based authentication** simulation

### Protected Routes
- **Loading states** during authentication check
- **Automatic redirects** for unauthenticated users
- **Token validation** with periodic checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- React team for React 19
- TanStack for React Query
- Vite team for the build tool
- Tailwind CSS for the utility-first framework
- MSW team for API mocking
- Testing Library for testing utilities

---

**Note**: Per assignment requirements, we did not add data-* attributes to the email/password inputs. The application uses proper labels, ARIA attributes, and semantic HTML for accessibility instead.
