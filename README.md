<div align="center">
  <img width="1280" height="420" alt="IMG_20260806_215150" src="https://github.com/user-attachments/assets/e6eb247a-953b-4141-b47d-8b851424f4ca" />

  <h2 style="font-size: 18px; color: #94A3B8; margin-top: 4px; font-weight: 600;">𝗦𝘁𝗼𝗿𝗲. 𝗢𝗿𝗴𝗮𝗻𝗶𝘇𝗲. 𝗣𝗹𝗮𝘆.</h2>
</div>
<br>
<div align="center">
  
  [![Tech Stack](https://img.shields.io/badge/Stack-Vanilla_HTML_/_CSS_/_JS-E34F26?style=flat-brutal&logo=html5&logoColor=white)](#technology-stack)
  [![License](https://img.shields.io/badge/License-MIT-blue?style=flat-brutal)](#)
  [![Style](https://img.shields.io/badge/Design-Neo--Brutalist-FFC480?style=flat-brutal)](#design-aesthetics)
  
</div>

## 𝗣𝗿𝗼𝗷𝗲𝗰𝘁 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻

Gimo is a simple, beautiful, and secure local vault to save your gaming usernames, passwords, and accounts. It runs entirely on client-side storage, requires no external databases or servers, and stores all entries inside your browser cache.

Built with a bold, high-contrast dark theme (Neo-Brutalism), it turns into a convenient floating pill button on mobile views so you can copy, edit, or add credentials on the go with single taps.

---

<div align="center"><h2>𝗞𝗲𝘆 𝗙𝗲𝗮𝘁𝘂𝗿𝗲𝘀</h2></div>

| Feature | Description |
| :--- | :--- |
| **Clean Vault** | Organizes usernames, passwords, linked emails, email passwords, and notes. |
| **Platform Badges** | Supports Steam, Epic Games, Ubisoft, Xbox, and Rockstar tags with custom colors. |
| **Floating Action Button** | Relocates to the bottom-right corner on mobile view for easy thumb access. |
| **View Transitions** | Switch themes smoothly with a custom Shigure Ui Dance GIF transition mask. |
| **Dark Theme** | Sleek space black colors designed for visual comfort in low-light environments. |
| **Local Storage Sync** | Automatically saves and reads credentials from your browser with version tracking. |

---

## 𝗔𝗿𝗰𝗵𝗶𝘁𝗲𝗰𝘁𝘂𝗿𝗲

The project is structured modularly for easy editing, production builds, and fast loading speeds:

```mermaid
graph TD
    Root[Gimo Project Root] --> index[index.html]
    Root --> SrcDir[src/]
    Root --> AssetsDir[assets/]
    
    SrcDir --> css[style.css]
    SrcDir --> js[app.js]
    
    AssetsDir --> icon[gimo-controller-icon.png]
```

* **`index.html`**: Core HTML5 markup containing the render-blocking theme detector.
* **`src/style.css`**: CSS stylesheet detailing layouts, animations, and custom media queries.
* **`src/app.js`**: Core controller containing rendering, storage sync, and clipboard functions.
* **`assets/`**: Static logo and cover banner image assets.

---

## Getting Started

No bundlers, dependencies, or build configurations required. Simply load the entry file locally:

```bash
# 1. Clone the project
git clone https://github.com/your-username/Gimo.git

# 2. Enter directory
cd Gimo

# 3. Serve local server or open index.html directly
python -m http.server 8000
```
Then visit `http://localhost:8000` inside your browser.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---
