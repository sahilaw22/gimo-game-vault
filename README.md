# Gimo/// Gaming Credentials Vault

<div align="center">
  <img width="1280" height="420" alt="Gimo Vault Header" src="https://github.com/user-attachments/assets/e6eb247a-953b-4141-b47d-8b851424f4ca" />

  <h3 align="center">Store. Organize. Play.</h3>
  <p align="center">A sleek, privacy-focused local gaming credentials manager built for speed and visual excellence.</p>

  [![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](#license)
</div>

---

## 🎮 Overview

**Gimo///** is a modern, client-side gaming credentials vault. Keep track of your gaming accounts, passwords, linked emails, and recovery notes across Steam, Epic Games, Ubisoft, Xbox, Rockstar, and mobile platforms — all stored safely in your browser's local storage.

No external databases, no cloud tracking, zero hassle.

---

## ✨ Features

- **3D Coverflow Carousel**: Interactive 3D banner carousel with 3000ms continuous autoscroll and keyboard navigation for your favorite games.
- **Glitch Text Preloader**: Custom glowing neon scanline text preloader.
- **Brand Platform Badges**: Official badges and solid corner color fills for Steam, Epic Games, Ubisoft, Xbox, Rockstar, and Play Store.
- **1-Click Copy**: Copy usernames, passwords, linked emails, or recovery notes to your clipboard with instant feedback.
- **Mobile-First Responsive Layout**: Stacked mobile header with quick search, category filtering pills, and touch-optimized navigation.
- **Client-Side Privacy**: 100% offline data persistence using browser `localStorage` with versioned migrations.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **Animation & Graphics**: Three.js + Framer Motion
- **Icons**: Lucide React + Simple Icons (Official Brand SVGs)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** (v18 or higher) and **npm** installed.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sahilaw22/gimo-game-vault.git

# 2. Enter the project directory
cd gimo-game-vault

# 3. Install dependencies
npm install

# 4. Start the local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The optimized static build files will be generated inside the `dist/` directory.

---

## 📁 Project Structure

```
gimo-game-vault/
├── components/
│   └── ui/
│       └── coverflow-carousel.tsx   # 3D Coverflow Carousel component
├── src/
│   ├── components/
│   │   ├── AddCredentialModal.tsx   # Add/Edit credential modal
│   │   ├── CredentialCard.tsx       # Credential card component with platform badges
│   │   ├── GameDetailsModal.tsx     # Game details pop-up modal
│   │   ├── GimoHeader.tsx           # Responsive header with mobile layout & search
│   │   ├── GimoPreloader.tsx        # React Bits scanline glitch preloader
│   │   └── GlitchText.tsx           # Glitch text animation component
│   ├── data/
│   │   └── initialCredentials.ts    # Initial demo credentials dataset
│   ├── App.tsx                      # Main application logic & LocalStorage manager
│   ├── index.css                    # Design system tokens & scanline styles
│   └── main.tsx                     # React root entry point
├── index.html                       # HTML5 entry page
├── package.json
└── vite.config.ts
```

---

## 👤 Author

Made by **[@sahilaw22](https://github.com/sahilaw22)** — for gamers.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).