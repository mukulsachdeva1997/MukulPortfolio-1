# Developer Portfolio - Mukul Sachdeva

## Overview

This is a modern, single-page developer portfolio application for Mukul Sachdeva, a full-stack developer specializing in React/Angular, FastAPI/.NET, and AWS. The portfolio showcases projects, experience, skills, education, and personal information in a clean, professional design with accessibility features and responsive layout.

The application is built as a full-stack web application with a React frontend using modern UI components and an Express.js backend with contact form functionality. It emphasizes performance, accessibility (WCAG AA compliance), and user experience with features like light/dark mode theming and mobile-first responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing, though primarily designed as a single-page application with anchor navigation
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design system
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and data fetching
- **Theme System**: Custom theme provider supporting light/dark mode with localStorage persistence and system preference detection
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful API endpoints for contact form submission and message retrieval
- **Data Storage**: In-memory storage implementation with interface-based design for easy database integration
- **Middleware**: Custom logging middleware for API request monitoring and error handling
- **Development**: Hot module replacement and development server integration with Vite

### Data Storage Solutions
- **Current Implementation**: In-memory storage using Maps for development and demonstration
- **Database Ready**: Drizzle ORM configured for PostgreSQL with schema definitions for users and contact messages
- **Migration Support**: Database migration system set up with Drizzle Kit for schema management
- **Connection**: Neon Database serverless PostgreSQL integration configured

### Design System and User Experience
- **Color Palette**: Professional developer-focused color scheme with primary blue (#5B8CFF) and secondary teal (#00C2A8)
- **Typography**: Inter font family for clean, modern readability
- **Component System**: Consistent spacing, shadows, and rounded corners (2xl) throughout the application
- **Accessibility**: WCAG AA compliant with proper ARIA labels, keyboard navigation, and screen reader support
- **Performance**: Optimized images, lazy loading, and minimal bundle size for fast loading

### Contact Management
- **Form Handling**: React Hook Form with Zod validation for type-safe form submission
- **Spam Protection**: Honeypot field implementation to prevent automated submissions
- **User Feedback**: Toast notifications for success/error states with proper error handling
- **Data Validation**: Schema validation on both client and server sides using Zod

## External Dependencies

### UI and Design
- **@radix-ui/**: Comprehensive set of accessible UI primitives for building the design system
- **class-variance-authority**: Type-safe variant API for component styling
- **tailwindcss**: Utility-first CSS framework for responsive design and theming
- **lucide-react**: Icon library providing consistent, scalable SVG icons

### Data Management and Forms
- **@tanstack/react-query**: Server state management with caching, synchronization, and error handling
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Integration layer between React Hook Form and Zod validation
- **zod**: TypeScript-first schema validation library
- **drizzle-orm**: Type-safe ORM for database operations with PostgreSQL support

### Database and Storage
- **@neondatabase/serverless**: Serverless PostgreSQL database connection for cloud deployment
- **drizzle-zod**: Integration between Drizzle ORM and Zod for schema validation
- **connect-pg-simple**: PostgreSQL session store for Express sessions (configured but not actively used)

### Development and Build Tools
- **vite**: Fast build tool with hot module replacement for development
- **@vitejs/plugin-react**: React integration for Vite build system
- **tsx**: TypeScript execution for server-side development
- **esbuild**: Fast JavaScript bundler for production builds

### Fonts and Typography
- **Google Fonts**: Inter, Architects Daughter, DM Sans, Fira Code, and Geist Mono for varied typography needs
- **Custom CSS Variables**: Theme-aware color system supporting light and dark modes