# Terminal News Summary

A terminal-based news summarization application with TUI (Terminal User Interface) and AI-powered summaries.

## Overview

This project is inspired by the [OpenCode](https://github.com/sst/opencode) architecture, specifically its use of:
- **Ink** for React-like components in the terminal
- **Streaming responses** for real-time AI-generated content
- **Command orchestration** for managing complex CLI workflows
- **Component composition** for building interactive terminal interfaces

## Features (Planned)

- Interactive TUI for browsing news sources
- AI-powered article summarization using LLM APIs
- Support for multiple news sources (BBC, CNN, HackerNews, etc.)
- Real-time streaming of summaries
- Export summaries to clipboard or markdown files
- Customizable configuration for sources and models
- Batch summarization of multiple articles

## Architecture

```
TUI Frontend (Ink + React)
    ↓
News Fetching Service (Axios + Cheerio)
    ↓
Content Extraction (Readability)
    ↓
LLM Summarization (OpenAI/Anthropic)
    ↓
Export & Display
```

## Tech Stack

- **TypeScript** - Type-safe development
- **Ink** - React for terminal UIs
- **React** - Component-based UI architecture
- **OpenAI SDK** - LLM integration for summaries
- **Commander** - CLI argument parsing
- **Cheerio** - HTML parsing for news extraction
- **Axios** - HTTP client for fetching content

## Installation

```bash
npm install
```

## Development

```bash
# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## Project Status

Currently in **CMD-1: Project Bootstrap** phase. This is a structured development approach using Continuous Micro-Delivery (CMD) blocks.

### CMD Progress

- [x] CMD-1: Project Bootstrap & OpenTUI Study
- [ ] CMD-2: News Source Configuration Module
- [ ] CMD-3: Basic News Fetcher Service
- [ ] CMD-4: LLM Summarization Service
- [ ] CMD-5: Basic TUI Source Selection Component
- [ ] CMD-6: Article Fetching Integration
- [ ] CMD-7: Article Content Fetching
- [ ] CMD-8: Article Selection & Summary UI
- [ ] CMD-9: Streaming Summary Display
- [ ] CMD-10: CLI Argument Parsing & Shortcuts
- [ ] CMD-11: Summary Copy & Export
- [ ] CMD-12: Configuration & Customization
- [ ] CMD-13: Error Handling & Logging
- [ ] CMD-14: Performance Optimization & Caching
- [ ] CMD-15: Testing Suite & CI
- [ ] CMD-16: Documentation & Release Prep
- [ ] CMD-17: NPM Package Publishing
- [ ] CMD-18: Advanced Features & Polish

## OpenCode Patterns Applied

This project implements several key patterns from OpenCode:

1. **Component-Based TUI**: Using Ink's React components for terminal UI
2. **Streaming Responses**: Async generators for real-time content display
3. **State Management**: React hooks for managing application state
4. **Command Orchestration**: Structured CLI with clear workflows
5. **Modular Services**: Separation of concerns (fetching, summarization, export)

## License

MIT

## Contributing

Contributions welcome! Please read the CMD blocks in the source code to understand the development workflow.
