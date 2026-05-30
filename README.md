# CHENGETO - Youth Health & Self-Care Platform

CHENGETO is a Progressive Web Application (PWA) designed to provide confidential, reliable, and accessible information on reproductive health, contraception, and HIV prevention for tertiary students in Zimbabwe. Developed in alignment with CeSHHAR Zimbabwe and MASCOT standards, the platform operates offline-first to remain highly accessible.

---

## 🌟 Key Features

* **confidential & Anonymous**: No accounts, profile registration, or personal details are required. User data remains local to their device.
* **Offline-First Support**: Key educational guides, search indexes, and calculations are loaded locally, allowing the application to work without internet connectivity.
* **Multilingual Localization**: Full user interface and content switching between **English**, **Shona** (chiShona), and **Ndebele** (isiNdebele).
* ** Confidentially Pickup Code Portal**: Allows students to generate a private pickup code to obtain condoms or self-testing kits anonymously from campus health services.
* **Confidential Health Assistant**: An interactive chat interface providing instant answers about costs, locations, and directions without judgement.
* **Interactive Method Comparison & Quizzes**: Features contraceptive method comparisons, lifestyle eligibility quizzes, and visual mind maps.
* **Visual Guides**: Interactive custom SVG anatomical guides showing contraceptive placements and step-by-step procedures.
* **Multilingual Testimonials**: Real-time rotating and swipeable carousel showcasing feedback from students across various universities in Zimbabwe (e.g. UZ, MSU, CUT, GZU).

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
