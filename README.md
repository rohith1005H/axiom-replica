# Axiom Pulse Replica

A pixel-perfect replica of Axiom Trade's "Pulse" token discovery board, built with Next.js 14, TypeScript, Tailwind CSS, Redux Toolkit, and React Query.

![Axiom Pulse](file:///home/rohtih/.gemini/antigravity/brain/4ee66fe1-b13f-4d28-9a99-fb867a7da9ac/uploaded_image_1763594695625.png)

## Features

- **3-Column Board Layout**: Tokens organized by status (New Pairs, Final Stretch, Migrated)
- **Rich Token Cards**: 
  - Token image with gradient background
  - Name, symbol, and social links (Twitter, Telegram, Website)
  - Time since creation
  - Market cap, volume, and price changes (5m, 1h, 6h)
  - Interactive "Buy" button
- **Real-time Updates**: Simulated WebSocket updates with smooth transitions
- **Color-Coded Metrics**: Green for positive changes, red for negative
- **Atomic Design**: Modular component architecture (Atoms, Molecules, Organisms)
- **Performance**: Memoized components, optimized re-renders
- **Responsive**: Fully responsive down to 320px width (columns stack on mobile)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Redux Toolkit (UI), React Query (Data)
- **Icons**: Lucide React
- **Images**: DiceBear API for avatars

## Setup Instructions

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

3.  **Build for Production**:
    ```bash
    npm run build
    npm start
    ```

## Deployment

To deploy to Vercel:

1.  Push this repository to GitHub
2.  Import the project in Vercel
3.  Deploy! (No special configuration needed)

## Architecture

- `src/components/atoms`: Basic building blocks (StatusBadge)
- `src/components/molecules`: Complex UI components (TokenCard)
- `src/components/organisms`: Major sections (TokenColumn, PulseBoard)
- `src/lib/redux`: Global state management
- `src/hooks`: Custom hooks (useLiveTableData, useMockWebSocket)
- `src/types`: TypeScript type definitions

## Key Components

### TokenCard
Rich card component displaying:
- Token image and branding
- Social media links
- Real-time metrics (MC, Vol, Price changes)
- Time since creation
- Buy action button

### PulseBoard
Main container organizing tokens into 3 columns by status, with:
- Column headers with counts
- Scrollable card lists
- Responsive stacking on mobile
