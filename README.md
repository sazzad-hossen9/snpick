# 📰 `snpick` — World News, Picked & Explained

> A modern, responsive editorial news & deep-dive analysis website built with semantic **HTML5**, modern **Vanilla CSS3**, and **Vanilla JavaScript (ES6+)**. Features seamless **Light & Dark Mode** switching, real-time article search with keyboard shortcuts, and interactive editorial widgets.

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Preview-FA4616?style=for-the-badge&logo=github)](https://sazzad-hossen9.github.io/snpick/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#)

---

## ✨ Key Features

- 🌓 **Dual Themes (Light & Dark Mode)**:
  - **Light Mode**: Warm, editorial paper aesthetics (`#FAF8F5`) inspired by modern journalism publications (*The Verge*, *Semafor*, *Rest of World*).
  - **Dark Mode**: High-contrast, OLED-friendly matte black theme (`#0E0E10`).
  - Seamless toggle with state persisted in `localStorage` and automatic OS system theme detection (`prefers-color-scheme`).
- 🧭 **Interactive Animated Navigation**:
  - Smooth underline hover expansion across all category links.
  - Active page retention (current page stays highlighted with a crisp solid underline).
  - Dedicated pages for all 6 categories: **World**, **Middle East**, **Asia**, **Economy**, **Climate**, and **Opinion**.
- ⚡ **Instant Live Search (`Ctrl + K` / `Cmd + K`)**:
  - Modal overlay with real-time story, topic, and author searching with matched query highlighting.
- 📱 **100% Fully Responsive Layout**:
  - Handcrafted CSS Grid and Flexbox layouts.
  - Smooth mobile hamburger drawer navigation.
- 📖 **Editorial Longform Reading Experience**:
  - Top reading progress indicator bar that updates smoothly as you read.
  - "Key Takeaways" quick summary box.
  - Pull quotes with brand signature accent border.
  - Sourced citations list and interactive topic tags.
  - Author bio cards and "Read next" article recommendations.
- 🏷️ **Dynamic Category Filtering**:
  - Live filtering tabs on section pages (`All`, `Analysis`, `Opinion`, `Explainer`).
- 📬 **Interactive Newsletter Widget**:
  - Client-side validation and toast notifications for "The Morning Pick" daily newsletter.
- 🔗 **Social & Engagement Actions**:
  - One-click "Copy Share Link" to clipboard with interactive feedback toast.
  - Toggleable "Bookmark Article" reading list saver.
- 🚀 **Zero Dependencies**:
  - 100% pure Vanilla Web Standards. No npm build steps required, loads instantly anywhere!

---

## 📂 Project Structure

```
snpick/
│
├── index.html               # Homepage (Hero story, Ticker, Latest Analysis, Newsletter, Opinion)
├── world.html               # World Category Page (Diplomacy, Security, Governance stream)
├── section.html             # Middle East Category Page (64 Stories, Filter Tabs, Sidebar)
├── asia.html                # Asia Category Page (Geopolitics, Tech hubs, Regional trade)
├── economy.html             # Economy Category Page (Markets, Central Banks, Remittances)
├── climate.html             # Climate Category Page (Energy transition, Loss & Damage finance)
├── opinion.html             # Opinion & Essays (Columns, Editorial voices, Author cards)
├── article.html             # Article details page (Takeaways, Content, Author bio, Read next)
├── about.html               # About snpick (Mission, 3 Pillars of Work, Editorial Policy)
│
├── css/
│   ├── style.css            # Design tokens, CSS variables, typography, reset & base layout
│   └── components.css       # Header, Cards, Ticker, Newsletter, Modals, Footer, Responsive
│
├── js/
│   ├── data.js              # Centralized news story data store
│   └── main.js              # Theme engine, Search modal, Reading progress, Toasts, Drawer
│
├── assets/
│   └── images/              # Scalable SVG brand logo and editorial geometric artwork
│
├── README.md                # Project documentation and portfolio guide
└── .gitignore               # Git ignore rules
```

---

## 🚀 How to Run Locally

Because this project is built with clean vanilla web standards, you don't need Node.js or any compilation!

1. Clone or download the repository:
   ```bash
   git clone https://github.com/sazzad-hossen9/snpick.git
   cd snpick
   ```
2. Simply double-click **`index.html`** in your file manager to open it in any web browser.
3. Or open with VS Code's **Live Server** extension for live reloading.

---

## 🌐 How to Connect to GitHub & Deploy to GitHub Pages (Portfolio)

Follow these simple steps to make your site accessible worldwide:

### Step 1: Push Local Code to GitHub
```bash
git add .
git commit -m "feat: complete responsive snpick editorial news website with light/dark mode"
git push -u origin main
```

### Step 2: Enable Free Live Hosting on GitHub Pages
1. Go to your repository on GitHub: **https://github.com/sazzad-hossen9/snpick**
2. Click **Settings** (top tab) → **Pages** (left sidebar).
3. Under **Branch**, select `main` and root `/ (root)`.
4. Click **Save**.
5. Your live portfolio website will be ready in under 1 minute at:
   👉 **`https://sazzad-hossen9.github.io/snpick/`**

---

## 🎨 Color Palette & Typography

| Token | Light Theme | Dark Theme |
| :--- | :--- | :--- |
| **Background** | `#FAF8F5` (Paper Cream) | `#0E0E10` (Deep Matte Black) |
| **Card / Surface** | `#FFFFFF` (Pure White) | `#151518` (Graphite) |
| **Brand Accent** | `#FA4616` (Editorial Orange) | `#FA4616` (Editorial Orange) |
| **Text Primary** | `#121214` (Near Black) | `#F4F4F6` (Crisp White) |
| **Newsletter Box**| `#FEEFE7` (Peach Cream) | `#231713` (Dark Ember) |

**Typography**:
- **Headings & UI**: `Plus Jakarta Sans` (Google Fonts)
- **Longform Article Deck & Body**: `Newsreader` (Google Fonts)

---

## 👨‍💻 Author

Crafted for professional web development portfolio demonstration.
- GitHub: [@sazzad-hossen9](https://github.com/sazzad-hossen9)
