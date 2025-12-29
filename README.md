# 💫 NexusPay

> Modern payment platform with MercadoPago integration - Web 4.0 Design

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)
![MercadoPago](https://img.shields.io/badge/MercadoPago-SDK-009ee3)

## ✨ Features

- 🎨 **Premium UI** - Glassmorphism design with animated gradients
- 🌙 **Dark/Light Mode** - Seamless theme switching
- 💳 **MercadoPago Integration** - Complete payment flow
- 🔔 **Real-time Webhooks** - Payment status notifications
- ⚡ **Server Actions** - Next.js 15 server-side processing
- 📱 **Responsive** - Mobile-first design

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and add your MercadoPago credentials:

```env
MERCADOPAGO_ACCESS_TOKEN=your_access_token
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=your_public_key
WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Get your credentials from [MercadoPago Developers](https://www.mercadopago.com.ar/developers/panel/app)

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
src/
├── actions/          # Server Actions
│   └── payment.ts    # Payment processing
├── components/
│   ├── layout/       # Header, Footer, Layout
│   └── ui/           # Button, GlassCard, Input
├── lib/
│   └── mercadopago.ts # MercadoPago SDK wrapper
├── pages/
│   ├── api/webhooks/ # MercadoPago webhooks
│   ├── checkout.tsx  # Checkout page
│   ├── dashboard.tsx # Transactions dashboard
│   ├── success.tsx   # Payment success
│   ├── failure.tsx   # Payment failed
│   └── pending.tsx   # Payment pending
├── styles/
│   └── globals.css   # Design system
└── types/
    └── index.ts      # TypeScript definitions
```

## 🎨 Design System

- **Colors**: Violet/Magenta gradient palette
- **Typography**: Inter, Outfit, JetBrains Mono
- **Effects**: Glassmorphism, animated gradients, glow shadows
- **Animations**: Framer Motion for smooth transitions

## 🔧 Tech Stack

- **Framework**: Next.js 15 (Pages Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS + Custom CSS
- **Animations**: Framer Motion
- **Payments**: MercadoPago SDK
- **State**: React hooks + Zustand
- **Notifications**: Sonner

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with features |
| `/checkout` | Product selection & cart |
| `/dashboard` | Transaction history |
| `/success` | Payment successful |
| `/failure` | Payment failed |
| `/pending` | Payment pending |

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/webhooks/mercadopago` | POST | Receive payment notifications |

## 📝 License

MIT © NexusPay
