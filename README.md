
# AgentForce Frontend.

AgentForce is a modern AI agent platform built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**. This frontend provides users with authentication, professional chat, browsing agent teams, and interactive UI components.

---

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Authentication**  
  - Sign Up with Email, Password, Confirm Password, and Role selection  
  - Login page with validation and toast notifications  

- **Professional Chat Page**  
  - Real-time chat interface for AI agents or team collaboration  
  - Logs panel for tracking chat history  

- **Agent Dashboard**  
  - Browse Agent Teams  
  - Watch Demo functionality  
  - Interactive UI components (buttons, inputs, cards, sidebar, etc.)  

- **Responsive Design**  
  - Works across desktop, tablet, and mobile screens  
  - Smooth animations and hover effects  

---

## Folder Structure

```text
imama-kainat-royal-agent-forge/
├── public/                   # Public assets like favicon, robots.txt
├── src/
│   ├── components/           # Reusable components
│   │   ├── ui/               # UI primitives (buttons, inputs, modals)
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   └── Sidebar.tsx
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── pages/                # Page-level components
│   │   ├── Index.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── ProfessionalChat.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
````

---

## Tech Stack

* **Framework:** React + TypeScript + Vite
* **Styling:** TailwindCSS
* **Components:** shadcn/ui & custom UI components
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Routing:** React Router
* **Notifications:** `use-toast` for toast messages

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Imama-Kainat/AgentForce.git
cd AgentForce
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## Available Scripts

* `npm run dev` — Runs the app in development mode
* `npm run build` — Builds the app for production
* `npm run preview` — Serves the production build
* `npm run lint` — Lints the code using ESLint

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add some feature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## License

MIT License © 2025 [Imama Kainat](https://github.com/Imama-Kainat)

---

> **Note:** This project focuses on frontend features. Backend integration (authentication, chat API) should be added separately.

```


