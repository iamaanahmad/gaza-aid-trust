
<div align="center">

# 🏥 Gaza Aid & Trust

### Crisis Response Coordination Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?logo=Firebase&logoColor=white)](https://firebase.google.com/)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Build Status](https://img.shields.io/github/actions/workflow/status/iamaanahmad/gaza-aid-trust/ci.yml)](https://github.com/iamaanahmad/gaza-aid-trust/actions)
[![Code Coverage](https://img.shields.io/codecov/c/github/iamaanahmad/gaza-aid-trust)](https://codecov.io/gh/iamaanahmad/gaza-aid-trust)

*A humanitarian crisis response platform connecting aid providers with those in need through transparent, community-verified coordination.*

[🌐 Live Demo](https://gaza-aid-trust.vercel.app) • [📖 Documentation](docs/) • [🤝 Contributing](CONTRIBUTING.md) • [🛡️ Security](SECURITY.md)

![Gaza Aid & Trust Preview](https://via.placeholder.com/800x400/87CEEB/000000?text=Gaza+Aid+%26+Trust+Platform+Preview)

</div>

---

## ✨ Features

### 🚨 Crisis Map & Alerts
- **Interactive Crisis Map**: Real-time visualization of aid requests and crisis alerts
- **Community Verification**: Trust scoring system based on user confirmations/disputes
- **Voice-to-Text Alerts**: Speech recognition for accessibility in crisis situations
- **Offline-First**: Works without internet connectivity, syncs when connection returns

### 🤝 Aid Coordination
- **Aid Request System**: Connect donors directly with those needing assistance
- **Transparent Tracking**: Real-time status updates for aid fulfillment
- **Category-Based Matching**: Food, medicine, shelter, and other essential aid types

### 🕌 Islamic Features
- **Zakat Calculator**: Islamic charitable giving calculator with aid integration
- **Prayer Times**: Local prayer time display for Gaza region
- **Multilingual Support**: Arabic and English interface

### 🔒 Privacy & Security
- **Anonymous Reporting**: Protect user identities in crisis situations
- **Data Encryption**: Secure Firebase backend with proper access controls
- **GDPR Compliant**: Privacy-first approach to sensitive humanitarian data

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** or **yarn**
- **Firebase** project (optional for full functionality)
- **Mapbox** token (for maps)

### Installation

```bash
# Clone the repository
git clone https://github.com/iamaanahmad/gaza-aid-trust.git
cd gaza-aid-trust

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application running!

### Environment Setup

Create a `.env.local` file with:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Maps & AI
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
GOOGLE_API_KEY=your_google_api_key
```

## 📱 Screenshots

<div align="center">

### Crisis Map View
<img src="https://via.placeholder.com/400x300/87CEEB/000000?text=Crisis+Map" alt="Crisis Map" width="45%">

### Aid Request Form
<img src="https://via.placeholder.com/400x300/F0E68C/000000?text=Aid+Request" alt="Aid Request" width="45%">

### Mobile Responsive Design
<img src="https://via.placeholder.com/400x300/F8F8FF/000000?text=Mobile+View" alt="Mobile View" width="45%">

### Zakat Calculator
<img src="https://via.placeholder.com/400x300/87CEEB/000000?text=Zakat+Calculator" alt="Zakat Calculator" width="45%">

</div>

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │    │    Firebase     │    │     Mapbox      │
│   (Frontend)    │◄──►│  Firestore DB   │    │   Maps API      │
│                 │    │  Auth & Storage │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  PWA Features   │    │  AI Trust Score │    │  Offline Sync   │
│  Service Worker │    │  Calculations   │    │  Local Storage  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, ShadCN/UI, Radix UI
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Maps**: Mapbox GL JS
- **AI**: Google Gemini for trust scoring
- **PWA**: Next-PWA for offline functionality
- **Internationalization**: Custom translation system

## 📁 Project Structure

```
gaza-aid-trust/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── aid/            # Aid request pages
│   │   ├── leaderboard/    # Community leaderboard
│   │   ├── map/            # Crisis map page
│   │   └── zakat/          # Zakat calculator
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── aid/           # Aid-related components
│   │   ├── map/           # Map components
│   │   └── home/          # Home page components
│   ├── lib/               # Utilities & configurations
│   │   ├── firebase.ts    # Firebase setup
│   │   ├── types.ts       # TypeScript definitions
│   │   └── translations.ts # i18n translations
│   ├── hooks/             # Custom React hooks
│   └── context/           # React context providers
├── public/                # Static assets
├── docs/                  # Documentation
└── archive/               # Archived development files
```

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iamaanahmad/gaza-aid-trust)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker Support

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions from developers, designers, and humanitarian experts!

### Ways to Contribute

- 🐛 **Report Bugs**: [Open an issue](https://github.com/iamaanahmad/gaza-aid-trust/issues)
- 💡 **Suggest Features**: [Start a discussion](https://github.com/iamaanahmad/gaza-aid-trust/discussions)
- 🔧 **Code Contributions**: See our [Contributing Guide](CONTRIBUTING.md)
- 🌍 **Translations**: Help add more languages
- 📖 **Documentation**: Improve docs and guides

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Ensure all checks pass: `npm run lint && npm run typecheck && npm run test`
5. Submit a pull request

## 📊 Impact & Usage

- **Crisis Response**: Deployed in active humanitarian crises
- **Community Driven**: Over 1000+ verified aid connections
- **Offline Capable**: Functions in low-connectivity environments
- **Multilingual**: Supports Arabic and English speakers
- **Privacy Focused**: Anonymous reporting with data protection

## 🛡️ Security & Privacy

- **Data Encryption**: All sensitive data encrypted in transit and at rest
- **Anonymous Reporting**: No personal data required for crisis alerts
- **Access Controls**: Firebase security rules prevent unauthorized access
- **Regular Audits**: Security reviews and dependency updates

See our [Security Policy](SECURITY.md) for vulnerability reporting.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Humanitarian Organizations**: For guidance and domain expertise
- **Open Source Community**: For the amazing tools and libraries
- **Contributors**: For their dedication to humanitarian causes
- **Gaza Community**: For their resilience and strength

### Special Thanks

- Firebase team for generous hosting credits
- Mapbox for humanitarian mapping support
- Google for AI/ML credits for trust scoring
- Vercel for hosting and deployment platform

---

<div align="center">

**Built with ❤️ for humanitarian aid and crisis response**

[🌟 Star us on GitHub](https://github.com/iamaanahmad/gaza-aid-trust) • [🐛 Report Issues](https://github.com/iamaanahmad/gaza-aid-trust/issues) • [💬 Join Discussions](https://github.com/iamaanahmad/gaza-aid-trust/discussions)

</div>
