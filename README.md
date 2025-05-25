
# EnglishMaster - Progressive Web Application

A comprehensive English learning platform built with React, TypeScript, and Tailwind CSS. Features interactive lessons, AI-powered writing assistance, idioms library, and offline capabilities.

## 🚀 Features

### Core Learning Features
- **Interactive Lessons**: Grammar, vocabulary, and writing skills from beginner to advanced
- **AI Writing Assistant**: Real-time feedback on grammar, style, and clarity
- **Idioms & Expressions Library**: Learn common phrases with examples and origins
- **Daily Writing Prompts**: Creative exercises to enhance fluency
- **Metaphor Training**: Learn to identify and use metaphors effectively
- **Progress Tracking**: Personal dashboard with achievements and skill levels

### Technical Features
- **Progressive Web App (PWA)**: Works offline with service worker
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Mode Support**: Toggle between light and dark themes
- **Real-time Sync**: Progress syncs when back online
- **Accessible**: Built with accessibility best practices

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Build Tool**: Vite
- **PWA**: Service Worker, Web App Manifest
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Routing**: React Router DOM

## 📱 PWA Features

- **Offline Support**: Core functionality works without internet
- **App-like Experience**: Install on home screen
- **Fast Loading**: Cached resources for instant startup
- **Push Notifications**: Coming soon for daily reminders
- **Background Sync**: Sync progress when connection restored

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with PWA support

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd englishmaster-pwa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

### Building for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

### PWA Installation

1. Open the app in a supported browser
2. Look for "Install" prompt or "Add to Home Screen"
3. Follow browser-specific installation steps

## 🔧 Configuration

### Environment Variables
Currently no environment variables required for basic functionality.

For AI features integration (future):
- `VITE_OPENAI_API_KEY`: OpenAI API key for enhanced writing assistance
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

### Service Worker
The service worker (`public/sw.js`) handles:
- Caching static assets
- Offline functionality
- Background sync (planned)

### Manifest Configuration
PWA settings in `public/manifest.json`:
- App name and description
- Icons and theme colors
- Display mode and orientation
- Screenshots for app stores

## 📖 Usage Guide

### For Learners

1. **Start Learning**: Choose your level and begin with grammar or vocabulary
2. **Daily Practice**: Complete daily writing prompts and challenges
3. **Get Feedback**: Use the AI writing assistant for instant feedback
4. **Learn Idioms**: Explore the idioms library with real-world examples
5. **Track Progress**: Monitor your improvement in the dashboard

### For Developers

Key components:
- `Navigation.tsx`: App header with theme toggle
- `LessonCard.tsx`: Interactive lesson cards
- `WritingAssistant.tsx`: AI-powered writing feedback
- `IdiomsLibrary.tsx`: Searchable idioms database
- `DailyPrompts.tsx`: Writing challenge system
- `ProgressDashboard.tsx`: User progress visualization

## 🔮 Future Enhancements

### Planned Features
- **Supabase Integration**: User authentication and cloud sync
- **OpenAI Integration**: Enhanced AI writing assistance
- **Speech Recognition**: Pronunciation practice
- **Multiplayer**: Learning with friends
- **Gamification**: Points, levels, and competitions
- **Advanced Analytics**: Detailed learning insights

### AI Integration Options

**Option 1: OpenAI Integration**
```typescript
// Example OpenAI integration
const analyzeWriting = async (text: string) => {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
};
```

**Option 2: Local LLM (Transformers.js)**
```typescript
// Example local AI integration
import { pipeline } from '@huggingface/transformers';

const classifier = await pipeline(
  'text-classification',
  'microsoft/DialoGPT-medium'
);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Join our community discussions

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Lucide](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- English language learning community for inspiration

---

**Happy Learning! 🎓**
