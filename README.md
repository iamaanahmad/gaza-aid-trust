
# Gaza Aid & Trust: Crisis Connect

**A community-powered crisis map and direct aid platform for Gaza, built with trust and accessibility at its core.**

![Gaza Aid & Trust Hero Image](https://iili.io/FENr48F.md.png)

> This project is built for the **"Hack for Gaza"** hackathon. Its goal is to demonstrate a viable, technology-driven solution to real-world humanitarian challenges.

## The Problem

In times of crisis, access to accurate, real-time information is as vital as food and water. Misinformation can be deadly, and inefficient aid distribution can leave the most vulnerable without support. The people of Gaza face immense challenges in safely navigating their environment and accessing essential humanitarian aid.

## Our Solution

**Gaza Aid & Trust** is a web platform designed to tackle these challenges by empowering the community. It combines a real-time crisis map with a direct aid system, all underpinned by an AI-powered trust mechanism. Our goal is to create a reliable, transparent, and accessible ecosystem for information sharing and humanitarian support.

The platform is fully bilingual (Arabic/English) and built as a Progressive Web App (PWA) with offline capabilities, ensuring it's accessible even with intermittent internet connectivity.

## Key Features

-   **Real-Time Crisis Map**: Users can post and view geo-tagged alerts about aid distribution, safe zones, and critical incidents.
-   **AI-Powered Trust Score**: To combat misinformation, each alert has a "Trust Score" that is dynamically calculated by a **Google Gemini** model. The model considers user confirmations and disputes, creating a self-policing information ecosystem.
-   **Voice-to-Text Alerts**: For accessibility and ease of use in difficult situations, users can report alerts simply by speaking in their native language (Arabic or English).
-   **Direct Aid Connection**: A dedicated portal where families in Gaza can request specific aid (e.g., medicine, food, shelter) and donors can browse and directly fund these needs.
-   **Community Leaderboard**: Recognizes and encourages contributions from the most active and trusted reporters and donors, fostering a strong community.
-   **Zakat Calculator**: An integrated tool to help users calculate their Zakat, which can then be donated to aid requests on the platform.
-   **Bilingual & RTL Support**: Full support for both English and Arabic, with a seamless right-to-left (RTL) layout for Arabic users.
-   **Accessibility Focused**: Includes high-contrast mode and font-size adjustments to ensure the platform is usable by everyone.
-   **Offline First (PWA)**: Designed as a Progressive Web App, ensuring that critical data is cached and available even without a stable internet connection.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI**: [React](https://reactjs.org/), [ShadCN UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
-   **AI**: [Google Gemini](https://deepmind.google/technologies/gemini/) via [Firebase Genkit](https://firebase.google.com/docs/genkit)
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
