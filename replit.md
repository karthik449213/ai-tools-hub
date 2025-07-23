# AI Tools Hub

## Overview

AI Tools Hub is a single-page web application showcasing a curated collection of AI tools organized by categories. It's built as a modern React application with a Node.js/Express backend, using PostgreSQL for data persistence and styled with Tailwind CSS and shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack monorepo structure with clear separation between client and server code:

- **Frontend**: React SPA with TypeScript, built using Vite
- **Backend**: Express.js REST API with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Vite** as the build tool and development server
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and caching
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with CSS variables for theming

### Backend Architecture
- **Express.js** server with TypeScript
- **Drizzle ORM** for database operations and migrations
- **Neon Database** as the PostgreSQL provider (configured but can use any PostgreSQL instance)
- **Memory storage** as fallback for development
- RESTful API design with `/api` prefix

### Database Design
- Uses Drizzle ORM with PostgreSQL dialect
- Schema definitions in `shared/schema.ts` for code sharing
- Migrations stored in `/migrations` directory
- Currently includes a basic users table structure

### UI Components
- Complete shadcn/ui component library implementation
- Consistent design system with CSS variables
- Dark/light theme support
- Mobile-responsive design
- Accessibility-focused with Radix UI primitives

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data
2. **API Layer**: Express routes handle requests and validate data
3. **Storage Layer**: Drizzle ORM interfaces with PostgreSQL database
4. **Response**: JSON data flows back through the same path

The application currently implements a memory storage fallback for development, allowing the app to run without a database connection.

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm & drizzle-kit**: Type-safe ORM and migration tools
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant styling
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool and dev server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Development
- Uses Vite dev server with HMR for frontend
- tsx for running TypeScript backend in development
- Memory storage for quick local development

### Production Build
- Frontend built with Vite to `dist/public`
- Backend bundled with esbuild to `dist/index.js`
- Serves static files from Express in production
- Database migrations run via `drizzle-kit push`

### Environment Configuration
- `DATABASE_URL` required for PostgreSQL connection
- Development vs production modes configured via `NODE_ENV`
- Replit-specific configurations for cloud deployment

The application is designed to be deployed on platforms like Replit, with automatic static file serving and database provisioning through environment variables.