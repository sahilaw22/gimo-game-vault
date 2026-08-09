<h1 align="center"><img src="https://github.com/user-attachments/assets/540bec4e-f097-426a-becd-4530b177e445" alt="logo" width="45"/> Gimo - Store your game accounts </h1>

#### A secure local vault to save your gaming usernames, passwords, and accounts from any platform.
<br>

![Hero GIF](https://github.com/user-attachments/assets/255701af-c81b-472e-a5af-f40e2f4a7ca7)

> I added some demo entries to explore it before adding anything real.

<p align="center">
  <a href="https://gimo-alpha.vercel.app/" target="_blank">
    <img src="https://shieldcn.dev/badge/Try_it_yourself-FF9800?style=for-the-badge" alt="Open App" />
  </a>
</p>

## Content

  - <a href="#why-i-built-it">Why I Built It</a>
  - <a href="#features"> Its Features</a>
  - <a href="#how-to-run-it-locally">How to run Locally</a>
  - <a href="#how-it-works">How Its Work</a>
  - <a href="#tech-stack">Tech tack</a>


## Why I built it

<p>I play elden ring, gtav and fifa, all on different platforms. Every game has its own account, linked email, and password, and some of those emails are random that I created years ago and have almost completely forgotten. Most password managers are built around keeping one login and password together, which doesn’t really fit how gaming accounts work.

That’s where <b>Gimo</b> comes in. It keeps your game account, linked email, and passwords together in one place, so everything is easy to find when you need it. Everything stays in your browser and nothing leaves your device.</p>

## Features

- **Account Management:** Keep game accounts, credentials, linked emails, and notes organized in one centralized vault.
- **Multi-Platform Support:** Manage accounts across popular gaming platforms including Steam, Epic Games, Ubisoft, Xbox and Rockstar.
- **Search & Discover:** Instantly find accounts using game name, username, email, notes, or platform filters.
- **Game Library:** Pin frequently used games and personalize entries with game artwork for quick identification.
- **Seamless Experience:** Keep your data available across sessions with a clean interface optimized for desktop, tablet, and mobile.

## How to run it locally

**Requirements:** Node.js 18+

```bash
git clone https://github.com/sahilaw22/gimo-game-vault.git
cd gimo-game-vault
npm install
npm run dev
```

> Open `http://localhost:5173` in your browser.

## How It Works

Gimo is a React SPA with no backend. 

| Step        | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| **Storage** | Credentials are saved in `localStorage` under a versioned key (`gimo_credentials_vault_v11`). |
| **Startup** | On load, the app reads from storage or falls back to demo entries.          |
| **Updates** | All changes (add, edit, delete, favourite) go through `saveCredentials()`, which updates React state and storage together. |

### Coverflow Carousel

| Aspect            | Details                                                               |
|-------------------|-----------------------------------------------------------------------|
| **Implementation**| Built with CSS 3D transforms (`perspective`, `rotateY`, `translateX`, `translateZ`). |
| **Behavior**      | Each card’s position is based on its offset from the active index, with adjustable depth and falloff. |
| **Libraries**     | None — fully handcrafted.                                             |

### Glitch Effect

| Aspect            | Details                                                               |
|-------------------|-----------------------------------------------------------------------|
| **Renderer**      | `<canvas>`‑based `ASCIIText` renderer.                                |
| **Mechanism**     | Samples character cells at a set frame rate to create a scanline distortion effect. |
| **Animations**    | No CSS animations — entirely canvas logic.                            |

## Tech Stack

<div align="center">

  <!-- First row: main stack -->
  <a href="#technology-stack">
    <img src="https://shieldcn.dev/badge/React_18_+_TypeScript-3178C6?style=flat-square" alt="React + TS" />
  </a>
  <a href="#technology-stack">
    <img src="https://shieldcn.dev/badge/Vite_6-646CFF?style=flat-square" alt="Vite" />
  </a>
  <a href="#technology-stack">
    <img src="https://shieldcn.dev/badge/Tailwind_CSS_v3-06B6D4?style=flat-square" alt="Tailwind CSS" />
  </a>
  <a href="#technology-stack">
    <img src="https://shieldcn.dev/badge/Three.js_+_Canvas-000000?style=flat-square" alt="Three.js + Canvas" />
  </a>

  <br/>

  <!-- Second row: supporting tools -->
  <a href="#technology-stack">
    <img src="https://shieldcn.dev/badge/Lucide_React-FF4088?style=flat-square" alt="Lucide React" />
  </a>
    <a href="#technology-stack">
    <img src="https://shieldcn.dev/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  </a>
  <a href="#technology-stack">
    <img src="https://shieldcn.dev/badge/localStorage-2C2C2C?style=flat-square" alt="localStorage" />
  </a>

</div>


## Contributing
We currently aren't accepting contributions, but I appreciate your interest! If you have suggestions or feedback, please reach out to me at **sahilaw502@gmail.com**

## License

<p>The source code for this project is made available for **viewing and educational purposes only**.  
Unauthorized copying, modification, distribution, or commercial use of this material without explicit written permission from the copyright holder is strictly prohibited.</p>

Copyright © 2026 **Gimo**. All rights reserved.




