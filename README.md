# CHENGETO - Private AI Health & Self-Care Platform

CHENGETO is a Progressive Web Application (PWA) powered by **PodMyth**, designed to provide confidential, reliable, and accessible information on reproductive health, contraception, and HIV prevention for all Zimbabweans. The platform operates offline-first to remain highly accessible across the country.

---

## 🌟 Key Features

* **Confidential & Anonymous**: No accounts, profile registration, or personal details are required to use the core application. User data remains local to their device.
* **Offline-First Support**: Key educational guides, interactive modules, and calculations are loaded locally, allowing the application to work seamlessly without internet connectivity.
* **Multilingual Localization**: Full user interface and content switching between **English**, **Shona** (chiShona), and **Ndebele** (isiNdebele).
* **AI Health Assistant (Coming Soon)**: An interactive chat interface providing instant, judgment-free answers about health methods, costs, locations, and directions.
* **Health Tracker & Tutor**: Keep track of health goals and learn with interactive educational modules and quizzes.
* **Interactive Method Comparison**: Compare different contraceptive methods, check lifestyle eligibility, and explore visual mind maps for both HIV prevention and pregnancy care.
* **Visual Guides**: Interactive custom SVG anatomical guides showing contraceptive placements and step-by-step procedures.
* **Admin Dashboard**: A secure portal for administrators to manage active clinics, health alerts, AI bot triggers (Bot Brain), educational content, and view platform analytics.

---

## 🛠️ Technology Stack

* **Frontend Framework**: React (JavaScript / JSX)
* **Build Tooling**: Vite
* **Styling**: Vanilla CSS (Responsive Flexbox & Grid, Glassmorphic component styles)
* **Offline Support**: Progressive Web App (Service Workers, Manifest configuration)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16.0 or higher) and `npm` installed.

### Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/chipsuineg-droid/chengeto.git
   cd chengeto
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

### Running the Project

#### 1. Development Server
Start the local development server with hot-module reloading:
```bash
npm run dev
```
By default, the application will run at [http://localhost:5173/](http://localhost:5173/).

To share the development server over your local network (e.g., to test on mobile devices connected to the same Wi-Fi), run:
```bash
npm run dev -- --host
```

#### 2. Production Build
To build and optimize the application for production deployment:
```bash
npm run build
```
This generates optimized static files inside the `dist/` directory.

#### 3. Preview Production Build
To run and preview the production build locally before deploying:
```bash
npm run preview
```
