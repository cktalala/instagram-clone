# 📸 Instagram Clone

A modern Instagram clone built with Next.js, featuring a responsive design and interactive Pokemon-themed posts.

## ✨ Features

### 🎯 Core Functionality

- **📱 Responsive Design** - Fully responsive across desktop, tablet, and mobile devices
- **🖼️ Instagram-like Feed** - Scrollable post feed with Pokemon data
- **❤️ Like & Bookmark System** - Interactive post engagement with persistent state
- **📷 Story Section** - Horizontal scrolling stories with navigation controls
- **🔍 Advanced Search** - Real-time Pokemon search with debouncing
- **♾️ Infinite Scroll** - Automatic loading of more posts as you scroll
- **📱 Mobile Navigation** - Bottom navigation bar for mobile devices

### 🎨 UI/UX

- **🎨 Instagram UI** - Instagram design
- **🌟 Smooth Animations** - Hover effects, click animations, and transitions
- **📐 Responsive Grid Layout** - Adaptive layout for different screen sizes
- **🎯 Interactive Elements** - Buttons, cards, and navigation with feedback

### 🏗️ Technical Features

- **⚛️ Modern React** - Built with React 19 and Next.js 15
- **🔄 State Management** - Zustand for global state management
- **🌐 API Integration** - Pokemon API with React Query for data fetching
- **💨 Performance Optimized** - Turbopack for fast development builds
- **🎨 Styled Components** - CSS-in-JS with styled-components
- **📱 Progressive Web App** - PWA-ready with responsive design

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Styled Components](https://styled-components.com/)** - CSS-in-JS styling
- **[Ant Design](https://ant.design/)** - UI component library

### State & Data Management

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[Axios](https://axios-http.com/)** - HTTP client for API requests

### UI & Icons

- **[Lucide React](https://lucide.dev/)** - Beautiful SVG icons
- **[Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)** - Optimized image component

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[Turbopack](https://turbo.build/pack)** - Ultra-fast bundler

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd instagram-clone
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── AppContent.tsx     # Main app wrapper with responsive layout
│   ├── Header.tsx         # Top navigation header
│   ├── PostCard.tsx       # Instagram-style post cards
│   ├── SearchComponent.tsx # Advanced search functionality
│   ├── SearchDropdown.tsx # Search results dropdown
│   ├── Sidebar.tsx        # Left navigation sidebar
│   ├── StorySection.tsx   # Horizontal story carousel
│   └── UserSection.tsx    # Right sidebar user info
├── containers/            # Page-level components
│   └── home/
│       └── index.tsx      # Home page container
├── services/              # API services
│   ├── api.ts            # Axios instance configuration
│   └── pokrmon.ts        # Pokemon API service
├── store/                 # State management
│   └── pokemon.ts        # Zustand store for Pokemon data
└── utils/                 # Utility functions
    └── index.ts          # Helper functions
```

## 🎮 How It Works

### 🔄 Data Flow

1. **Pokemon API Integration** - Fetches Pokemon data from [PokeAPI](https://pokeapi.co/)
2. **Infinite Scrolling** - Automatically loads more posts as you scroll
3. **State Management** - Likes and bookmarks are stored in Zustand store
4. **Real-time Search** - Debounced search with instant results

### 📱 Responsive Design

- **Desktop (1264px+)** - Full sidebar with labels and right panel
- **Tablet (768px-1263px)** - Collapsed sidebar with icons only
- **Mobile (<768px)** - Bottom navigation bar, full-width content

### 🎨 UI Components

- **PostCard** - Instagram-style posts with like/bookmark functionality
- **StorySection** - Horizontal scrolling stories with navigation
- **SearchComponent** - Advanced search with real-time results
- **Sidebar** - Responsive navigation with Instagram-like design

## 🔧 Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack
npm start           # Start production server
npm run lint        # Run ESLint
```

## 🎨 Customization

### Adding New Features

1. **Create new components** in `src/components/`
2. **Add API services** in `src/services/`
3. **Extend state management** in `src/store/`
4. **Update routing** in `src/app/`

### Styling

- **Global styles** in `src/app/globals.css`
- **Component styles** using styled-components
- **Responsive breakpoints** configured in components

### Data Source

- Currently uses Pokemon API for demo data
- Easily replaceable with any REST API
- Update `src/services/` to integrate new data sources

## 🌟 Key Features Showcase

### ❤️ Interactive Posts

- Click to like/unlike posts with visual feedback
- Bookmark posts for later viewing
- Smooth animations on user interactions

### 🔍 Search

- Real-time search with 300ms debouncing
- Filter Pokemon by name
- Recent searches functionality
- Responsive search dropdown

### 📱 Mobile Experience

- Touch-friendly interface
- Optimized for mobile gestures
- Bottom navigation for easy thumb access
- Responsive image handling

## 🙏 Acknowledgments

- **[Instagram](https://instagram.com)** - UI/UX inspiration
- **[PokeAPI](https://pokeapi.co/)** - Free Pokemon data API
- **[Next.js Team](https://nextjs.org/)** - Amazing React framework
- **[Vercel](https://vercel.com/)** - Deployment platform

---

Built with ❤️ using modern web technologies
Thank you for watching my repository. ❤️❤️❤️
