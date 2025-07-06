# Shōgun DeFi Dashboard

A modern, responsive dashboard for the Shōgun DeFi platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive dark theme design
- Real-time balance display
- Interactive charts using Recharts
- Transaction history
- Social media integration
- Mobile-first approach

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shogun-defi.git
cd shogun-defi
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── components/
│   ├── Header.tsx
│   ├── BalanceCard.tsx
│   ├── ChartCard.tsx
│   ├── HistoryCard.tsx
│   ├── SocialCard.tsx
│   └── Footer.tsx
├── lib/
│   └── colors.ts
├── pages/
│   └── index.tsx
├── public/
│   ├── shogun-logo.svg
│   ├── avalanche-logo.svg
│   └── usdc-logo.svg
└── styles/
    └── globals.css
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT 