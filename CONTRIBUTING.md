# Contributing to Gaza Aid & Trust

Thank you for your interest in contributing to Gaza Aid & Trust! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Contributing Guidelines](#contributing-guidelines)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

This project follows a [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming environment for all contributors.

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- Git
- A Firebase project (for full functionality)
- Mapbox account (for maps)

### Quick Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/gaza-aid-trust.git
   cd gaza-aid-trust
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables (see `.env.example`)

5. Start development server:
   ```bash
   npm run dev
   ```

## Development Setup

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
GOOGLE_API_KEY=your_google_api_key
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run linting
npm run lint

# Run type checking
npm run typecheck

# Format code
npm run format
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── home/              # Home page components
│   ├── map/               # Map-related components
│   ├── aid/               # Aid request components
│   └── ...
├── lib/                   # Utilities and configurations
│   ├── firebase.ts        # Firebase setup
│   ├── types.ts           # TypeScript types
│   ├── translations.ts    # Internationalization
│   └── utils.ts           # Helper functions
├── hooks/                 # Custom React hooks
└── context/               # React context providers
```

## Contributing Guidelines

### Code Style

- **TypeScript**: Strict typing required
- **ESLint**: All code must pass linting
- **Prettier**: Code formatting is enforced
- **Imports**: Use absolute imports with `@/` prefix

### Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure tests pass and linting is clean
4. Update documentation if needed
5. Submit a pull request with:
   - Clear description of changes
   - Reference to any related issues
   - Screenshots for UI changes

### Code Review

- All PRs require review before merging
- Address review comments promptly
- Keep PRs focused on single features/fixes

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Use Jest and React Testing Library
- Place test files next to components: `Component.test.tsx`
- Test user interactions and component behavior
- Mock external dependencies (Firebase, APIs)

## Submitting Changes

### For New Features

1. Discuss the feature in an issue first
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Implement the feature with tests
4. Ensure all tests pass
5. Submit a pull request

### For Bug Fixes

1. Create an issue describing the bug
2. Create a fix branch: `git checkout -b fix/issue-number-description`
3. Write a test that reproduces the bug
4. Fix the bug
5. Ensure the test passes
6. Submit a pull request

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots if applicable

### Feature Requests

For feature requests, please:

- Check if the feature already exists or is planned
- Describe the problem the feature would solve
- Provide mockups or examples if possible
- Consider the impact on existing functionality

## Recognition

Contributors will be recognized in the project README and release notes. Significant contributions may be acknowledged in the project's acknowledgments section.

## Questions?

If you have questions about contributing, please:

1. Check the [README](README.md) for setup instructions
2. Search existing issues and discussions
3. Create a new discussion or issue

Thank you for contributing to Gaza Aid & Trust! 🚀