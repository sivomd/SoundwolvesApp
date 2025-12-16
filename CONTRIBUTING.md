# Contributing to SOUNDWOLVES

First off, thank you for considering contributing to SOUNDWOLVES! It's people like you that make SOUNDWOLVES such a great platform for the Indian diaspora nightlife community.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the JavaScript/Python styleguides
* Include screenshots in your pull request whenever possible
* End all files with a newline
* Avoid platform-dependent code

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### JavaScript Styleguide

* Use 2 spaces for indentation
* Prefer `const` over `let`. Never use `var`
* Use template literals instead of string concatenation
* Use meaningful variable names
* Add comments for complex logic

### Python Styleguide

* Follow PEP 8
* Use 4 spaces for indentation
* Use snake_case for functions and variables
* Use PascalCase for classes
* Add docstrings to functions and classes

### React Component Guidelines

* Use functional components with hooks
* One component per file
* Use named exports for components
* Props should be destructured
* Use TypeScript types when possible

## Development Process

1. Fork the repo
2. Create a new branch from `main`
3. Make your changes
4. Write or adapt tests as needed
5. Update documentation as needed
6. Submit a pull request

### Setting Up Your Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/soundwolves.git
cd soundwolves

# Install dependencies
cd backend && pip install -r requirements.txt
cd ../frontend && yarn install

# Start development servers
# Backend
cd backend && uvicorn server:app --reload

# Frontend (in another terminal)
cd frontend && yarn start
```

### Running Tests

```bash
# Frontend tests
cd frontend
yarn test

# Backend tests
cd backend
pytest
```

## Project Structure

Please maintain the existing project structure:

```
soundwolves/
├── backend/          # FastAPI backend
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── lib/         # Utilities
└── docs/            # Documentation
```

## Documentation

* Update the README.md if you change functionality
* Comment your code where necessary
* Update API documentation for backend changes
* Keep component documentation up to date

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🐺
