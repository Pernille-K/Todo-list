<!--Badges -->

<p align="center">
  <img src="https://img.shields.io/badge/npm-installed-brightgreen" />
  <img src="https://img.shields.io/badge/Electron-%5E35.2.0-red" />
  <img src="https://img.shields.io/badge/Built%20with-Electron%20Forge-orange" />
  <img src="https://img.shields.io/badge/HTML-Used-yellow" />
  <img src="https://img.shields.io/badge/CSS-Used-purple" />
  <img src="https://img.shields.io/badge/JavaScript-Used-blue" />
</p>


# 📝 Todo-list

A simple and colorful to-do list app created with **Electron.js**.

Stay organized with your daily tasks, and get visual feedback with a background that changes color to track your progress. Perfect for simple planning and satisfying completions ✨

<p align="center">
<img src="./assets/display_complete.png">
</p>

## ⚙️ Features

- ✅ Add, edit, and delete todos
- 🎨 Background color changes depending on how many tasks you've completed
- 🪟 Custom title bar with minimize, maximize, and close buttons (window controls)
- 📦 Lightweight and easy to install on Windows

## 🚀 Why Electron?

Electron makes it possible to build **cross-platform desktop apps** using web technologies (HTML, CSS, and JavaScript). I chose Electron because:

- I wanted to learn desktop app development
- It's beginner-friendly with great documentation
- It works on multiple platforms (Windows, macOS, Linux)
- It gave me full control over design and features (like the custom title bar ✨)

## 🔨 How to run the App (as a developer)

1. Clone or download this repo
2. Open a terminal in the project folder
3. Run:

   ```bash
   npm install
   npm start
   ```

The app will start in development mode.

## 📦 How to Create a Desktop Installer

> You can install this on your dekstop, or send it to friends and family, and they can install it like a regular program 💻

### 🪟 For Windows

1. Run

   ```bash
   npm run make
   ```

2. Your _.exe_ file will be located at:
   ```csharp
   out\make\squirrel.windows\x64\TodoApp-1.0.0 Setup.exe
   ```

### 🍏 For macOS

You can only build a macOS installer **on a Mac**.

1. Run

   ```bash
   npm run make
   ```

2. Electron Forge will automatically detect the system and create a _.dmg_ or _.zip_ file under:
   ```csharp
   out/make/zip/darwin/x64/
   ```

## 🧠 Credit & Notes

- Build using Electron Forge
- Custom checkbox styling from [Moderncss.dev](https://moderncss.dev/pure-css-custom-checkbox-style/)
- App icon created with Canva

## 📜 License

This project is licensed under the **ISC License**

---

<p align="center"> <img src="./assets/icon.ico" alt="App Icon" width="50" style="margin-top: 20px;"/> </p>
