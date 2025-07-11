
# Gaza Aid & Trust: Crisis Connect

**An AI-powered triage and medical aid platform for Gaza, designed to streamline patient intake and connect resources where they're needed most.**

![Gaza Aid & Trust Hero Image](https://iili.io/FENr48F.md.png)

> This project addresses the **"Streamlining On-the-Ground Patient Intake with Efficient Triage System"** challenge for the "Hack for Gaza" hackathon. Its goal is to demonstrate a viable, technology-driven solution that enables medics to post urgent triage alerts via voice, displays them on an offline-capable map with AI-powered trust scores, and connects critical medical aid with donors.

---

## Table of Contents

- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [Project Philosophy](#project-philosophy)
- [Key Features](#key-features)
- [Live Demo & Screenshots](#live-demo--screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Future Roadmap](#future-roadmap)

---

## The Problem

In a crisis zone like Gaza, the healthcare system is under unimaginable strain. Medics and doctors face a chaotic environment where efficient patient intake and resource allocation can mean the difference between life and death. The core challenges are:
1.  **Overwhelmed Intake Process:** Manual, paper-based patient intake is slow, error-prone, and impossible to scale during mass casualty events.
2.  **Lack of Real-Time Visibility:** There is no centralized system for doctors to see which clinics are overwhelmed, what specific supplies are needed, or where the most urgent patients are.
3.  **Misinformation and Trust:** Unverified reports about clinic capacity or available resources can lead to fatal delays.

## Our Solution

**Gaza Aid & Trust** is a web platform designed for medics on the ground. It combines a real-time **Triage Map** with a **Medical Aid Connection** system, all underpinned by an AI-powered trust mechanism. Our goal is to create a reliable, fast, and accessible tool for streamlining patient triage and resource management.

The platform is built as a Progressive WebApp (PWA) with **offline-first functionality** and **bilingual voice-to-text input**, ensuring it works in low-connectivity environments and allows for hands-free operation.

## Project Philosophy

Our approach is guided by three principles:
-   **Trust through Technology**: We use AI not just as a feature, but as a core mechanism to build a self-policing information ecosystem. By analyzing community confirmations and disputes, our **AI Trust Score** helps medics instantly gauge the reliability of a triage alert.
-   **Accessibility for Medics**: From a fully responsive, bilingual (Arabic RTL) interface to **voice-to-text triage notes**, we've prioritized making the platform a seamless tool for doctors working under extreme pressure.
-   **Dignity in Aid**: We empower clinics by giving them a platform to voice their specific medical needs. This connects donors directly to the front lines, ensuring the right aid gets to the right place at the right time.

## Key Features

-   **Real-Time Triage Map**: Medics can post and view geo-tagged triage alerts with priority levels (High, Medium, Low), allowing for quick assessment of the most critical needs.
-   **AI-Powered Trust Score**: To combat misinformation, each alert has a "Trust Score" that is dynamically calculated by a **Google Gemini** model. The model considers user confirmations (+1) and disputes (-1), creating a transparent, community-driven reputation system.
-   **Voice-to-Text Triage Notes**: For speed and accessibility, medics can record triage alerts simply by speaking in Arabic or English. The system can even auto-detect keywords like "urgent" to set the priority.
-   **Direct Medical Aid Connection**: A dedicated portal where clinics can request specific medical supplies (e.g., insulin, bandages) and donors can fund these needs directly. The feed is prioritized to show high-priority needs first.
-   **Recipient Feedback Loop**: To close the loop and build trust, the platform includes a prominent feedback field where clinics can confirm receipt of aid, turning a transaction into a human connection.
-   **Zakat Calculator**: An integrated tool to help users calculate their Zakat, which can then be donated to medical aid requests on the platform, aligning with Islamic principles of charity.
-   **Offline-First (PWA)**: Designed as a Progressive Web App, ensuring that critical map data and alerts are cached and available even without a stable internet connection.

## Live Demo & Screenshots

*(This is where you would link to your live demo and add compelling screenshots of the app in action)*

![Screenshot 1](https://news.freefirecommunity.com/wp-content/uploads/2025/07/image-2-1024x464.png)
**Screenshot 1: The Triage Map with priority-coded alerts.**
![Screenshot 2](https://news.freefirecommunity.com/wp-content/uploads/2025/07/image-1-1024x576.png)
**Screenshot 2: The Medical Aid feed showing prioritized requests.**
![Screenshot 3](https://news.freefirecommunity.com/wp-content/uploads/2025/07/image-3-1024x646.png)
**Screenshot 3: The mobile UI in Arabic (RTL).**

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI**: [React](https://reactjs.org/), [ShadCN UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
-   **AI**: [Google Gemini](https://deepmind.google.com/technologies/gemini/) via [Firebase Genkit](https://firebase.google.com/docs/genkit)
-   **Database**: [Cloud Firestore](https://firebase.google.com/docs/firestore)
-   **Mapping**: [Mapbox](https://www.mapbox.com/)
-   **Offline Support**: Progressive Web App (PWA) using `next-pwa`

## Getting Started

### Prerequisites

-   Node.js (v18 or newer)
-   npm or yarn
-   A Firebase project with Firestore enabled.

### Local Development Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/iamaanahmad/gaza-aid-trust.git
    cd gaza-aid-trust
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Firebase and Mapbox credentials:

    ```env
    # Firebase Client SDK Config
    NEXT_PUBLIC_FIREBASE_API_KEY=
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=

    # Firebase Admin SDK for Seeding (Optional)
    # A base64 encoded JSON string of your service account key
    GOOGLE_APPLICATION_CREDENTIALS_JSON=

    # Mapbox
    NEXT_PUBLIC_MAPBOX_TOKEN=

    # Google AI (Gemini)
    GOOGLE_API_KEY=
    ```

4.  **Seed the database (Optional but Recommended):**
    To populate your Firestore database with realistic mock data, run the seed script:
    ```bash
    npm run seed-firestore
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## Future Roadmap

This prototype lays a strong foundation. Future enhancements could include:
-   **Secure User Authentication**: Implementing phone number-based authentication for medics to verify identity.
-   **End-to-End Encrypted Chat**: A secure communication channel between medics and donors.
-   **Supply Chain Integration**: Partnering with on-the-ground NGOs to track medical aid delivery from pledge to fulfillment.
-   **Expanded AI Capabilities**: Using AI to detect duplicate alerts, analyze satellite imagery for damage assessment, and predict areas of greatest need.
-   **Wider Language Support**: Adding more languages spoken by international aid workers.
