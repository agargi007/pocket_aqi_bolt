# pocket_aqi_bolt

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-2cf7x2an)
https://pocket-aqi-app-devel-m14w.bolt.host/

🌍 Pocket AQI - Real-time Air Quality Intelligence




🎯 Mission
Pocket AQI provides actionable air quality information to every person, empowering healthier life choices through real-time, location-specific air quality data with personalized health recommendations.
Built for India, serving the world. 🇮🇳🌍

📱 Features
Core Functionality

Real-time AQI Display - Current air quality for any location worldwide
Location-based Detection - Automatic detection of user's location
24-hour Forecast - Predict air quality trends for the next day
Health Impact Calculator - Personalized risk assessment based on age and health conditions
Smart Recommendations - Actionable advice for different AQI levels
Offline Access - View saved locations without internet
Community Reporting - Crowdsourced pollution data from users

Indian Context Features

City-specific Intelligence - Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad
Seasonal Patterns - Winter smog, monsoon relief, festival pollution alerts
Regional Languages - Hindi and other regional language support
Local Pollution Sources - Traffic, construction, industrial emissions
Festival Alerts - Special warnings during Diwali, Holi, etc.

Technical Features

Global Edge Deployment - Deploy on Fly.io edge locations worldwide
Mobile-First Design - Optimized for Indian smartphones
Progressive Web App - Works offline, installable on home screen
Real-time Updates - Live AQI data with push notifications
Historical Data - 7-day trends and patterns
API Integration - OpenWeatherMap AQI API


🛠️ Technology Stack
Frontend

React 18 - Modern JavaScript framework
TypeScript - Type-safe development
Tailwind CSS - Utility-first styling
Mapbox GL JS - Interactive maps and visualizations
PWA Capabilities - Progressive Web App features

Backend

Node.js 18 - JavaScript runtime
Express.js - Web framework
PostgreSQL - Database (Render free tier)
Redis - Caching layer
Docker - Containerization

APIs & Services

OpenWeatherMap API - Primary AQI data source
Fly.io - Global edge deployment
Cloudflare - CDN and security (free tier)
GitHub Actions - CI/CD pipeline


🚀 Quick Start
Prerequisites
# Node.js 18+ installed
node --version

# Docker installed
docker --version

# Fly.io CLI installed
curl -L https://fly.io/install.sh | sh
flyctl auth loginLocal Development Setup

Clone the Repository

git clone https://github.com/yourusername/pocket-aqi.git
cd pocket-aqi
Install Dependencies

npm install
Set Up Environment Variables

# Create .env file
touch .env.local

# Add your API keys and configuration
echo "AQI_API_KEY=your_openweathermap_api_key" >> .env.local
echo "DATABASE_URL=your_render_database_url" >> .env.local
echo "MAPBOX_TOKEN=your_mapbox_token" >> .env.local
Start Development Server

npm run dev
Access the Application


Open http://localhost:3000 in your browser
Test mobile responsiveness


🗺️ Supported Cities
Indian Cities (Priority)
🔴 Delhi NCR (28.6129°N, 77.2090°E)
🔴 Mumbai (19.0760°N, 72.8777°E)
🔴 Bengaluru (12.9716°N, 77.5946°E)
🔴 Chennai (13.0827°N, 80.2707°E)
🔴 Kolkata (22.5726°N, 88.3639°E)
🔴 Hyderabad (17.3850°N, 78.4867°E)
🔴 Pune (18.5204°N, 73.8567°E)
🔴 Ahmedabad (23.0225°N, 72.5714°E)
🔴 Jaipur (26.9124°N, 75.7873°E)
🔴 Lucknow (26.8467°N, 80.9462°E)International Cities
🌍 Beijing (39.9042°N, 116.4074°E)
🌍 Los Angeles (34.0522°N, 118.2437°W)
🌍 London (51.5074°N, 0.1278°W)
🌍 Tokyo (35.6762°N, 139.6503°E)
🌍 São Paulo (23.5505°S, 46.6333°W)
🌍 Singapore (1.3521°N, 103.8198°E)
🌍 Berlin (52.5200°N, 13.4050°E)
🌍 Toronto (43.6532°N, 79.3832°W)
📊 AQI Scale
Indian AQI Standards
0-50      │ Good        │ 🟢 Green        │ Safe for all activities
51-100    │ Moderate    │ 🟡 Light Green  │ Sensitive groups avoid prolonged outdoor exertion
101-150   │ Unhealthy   │ 🟠 Orange       │ Children, elderly avoid outdoor activities
151-200   │ Very Unhealthy │ 🔴 Red       │ Everyone avoid outdoor activities, wear masks
201-300   │ Hazardous   │ 🟣 Purple      │ Stay indoors, use air purifiers
301-400   │ Severe      │ ⚫ Maroon      │ Emergency conditions, avoid all outdoor activities
401-500   │ Extreme     │ ⚫ Black       │ Health emergency, stay indoors
🛡️ Health Recommendations by AQI Level
🟢 Good (0-50)
✅ Safe for all outdoor activities
✅ Normal exercise and sports
✅ Open windows for fresh air
✅ No restrictions needed🟡 Moderate (51-100)
⚠️ Sensitive groups (children, elderly, asthma patients) limit prolonged outdoor exertion
✅ Normal adults can exercise outdoors
✅ Consider wearing masks in heavy traffic areas🟠 Unhealthy (101-150)
❌ Children and elderly avoid prolonged outdoor exertion
❌ Sensitive groups avoid outdoor activities
⚠️ General public limit prolonged outdoor activities
😷 Wear N95 masks if going outside
🏠 Consider indoor activities🔴 Very Unhealthy (151-200)
❌ Everyone avoid prolonged outdoor exertion
❌ Children and elderly stay indoors
❌ Sensitive groups avoid all outdoor activities
😷 Heavy masks required if going outside
🏠 Use air purifiers indoors
🚗 Avoid traffic areas
🔧 Deployment
Local Deployment
# Build the application
npm run build

# Run production build
npm run startDocker Deployment
# Build Docker image
docker build -t pocket-aqi .

# Run container
docker run -p 3000:3000 pocket-aqi

# Push to registry
docker tag pocket-aqi yourregistry/pocket-aqi
docker push yourregistry/pocket-aqiFly.io Deployment
# Install app
flyctl launch --app=pocket-aqi

# Set secrets
flyctl secrets set AQI_API_KEY=your_api_key
flyctl secrets set DATABASE_URL=your_db_url

# Deploy
flyctl deploy

# Open the app
flyctl open
📈 Architecture
System Overview
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Device   │    │   Fly.io Edge   │    │   Backend API   │
│   (Mobile/Web)  │◄──►│   Deployment    │◄──►│  (Node.js/DB)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   PWA Features  │    │   Global CDN    │    │   Database      │
│   - Offline     │    │   - Caching     │    │   - PostgreSQL  │
│   - Push Notifs │    │   - SSL/TLS     │    │   - Redis Cache │
└─────────────────┘    └─────────────────┘    └─────────────────┘Data Flow
User Request → Fly.io Edge → API Gateway → Business Logic → OpenWeatherMap API → Database Response → User Response
🧪 Testing
Run Tests
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run tests with coverage
npm run test:coverageTest Scenarios
1. App loads on mobile devices
2. AQI data displays correctly for major cities
3. Health recommendations match AQI levels
4. Location detection works properly
5. Offline caching functionality
6. Push notifications trigger correctly
7. Community reporting submits data
📝 API Documentation
Base URL
https://pocket-aqi.fly.dev/api/v1Endpoints
AQI Data
GET /aqi/current?lat={lat}&lon={lon}
GET /aqi/forecast?lat={lat}&lon={lon}
GET /aqi/historical?city={city}&days={days}Health Recommendations
POST /health/recommendations
{
  "age": 25,
  "health_conditions": ["asthma"],
  "aqi": 150,
  "activity": "exercise"
}Community Reports
POST /community/reports
{
  "latitude": 28.6129,
  "longitude": 77.2090,
  "pollution_type": "construction_dust",
  "severity": 8,
  "description": "Heavy dust from nearby construction"
}
🤝 Contributing
Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull RequestCode Standards
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write tests for new features
- Update documentation for API changes
- Use semantic commit messagesFeature Requests
We welcome feature requests! Please open an issue with:

Feature description
Use case/user benefit
Priority level
Implementation suggestions


📊 Performance Metrics
Targets
Performance Goals:
 - Global response time: <200ms
 - Mobile performance score: >90
 - API uptime: 99.9%
 - Cache hit rate: >80%
 - Error rate: <1%Monitoring
- Application logs: Fly.io dashboard
- Performance metrics: Google Analytics
- Error tracking: Sentry (free tier)
- Uptime monitoring: UptimeRobot (free tier)
💰 Cost Structure
Free Tier (Current)
Deployment: Fly.io Free
Database: Render Free Postgres
CDN: Cloudflare Free
API: OpenWeatherMap Free
Domain: cloudflared Free SSLEstimated Monthly Cost: $0
Future Costs (Growth Phase)
Fly.io Pro: $7/month (higher limits)
Render Pro: $7/month (more resources)
Cloudflare Pro: $20/month (advanced features)
Additional API calls: $0-20/month
📞 Support
Get Help
🐛 Bug Reports: github.com/yourusername/pocket-aqi/issues
💬 Questions: Discord/Slack community
📧 Email: support@pocket-aqi.com
📞 Phone: +91 XXXXX XXXXXUser Manual
📖 Getting Started Guide
📱 User Tutorials
🔧 Technical Documentation
📊 Performance Reports
📋 Roadmap
Next 3 Months
✅ Complete core features
✅ Launch with 50+ cities
✅ Mobile optimization
✅ Community reporting
✅ Performance optimizationNext 6 Months
🚀 Regional languages (Hindi, Tamil, etc.)
🚀 Advanced analytics and insights
🚀 Healthcare partnerships
🚀 API for developers
🚀 Premium subscription featuresNext 12 Months
🌟 AI-powered predictions
🌟 Health app integrations
🌟 Government data partnerships
🌟 Global expansion (500+ cities)
🌟 Environmental impact tracking
🌟 Acknowledgments
Contributors
- [Your Name] - Project Lead
- [Contributor Name] - Backend Development
- [Contributor Name] - Frontend Development
- [Contributor Name] - Design & UXPartners
- OpenWeatherMap (AQI Data)
- Fly.io (Global Deployment)
- Render (Database Hosting)
- Cloudflare (CDN & Security)Community
- Beta Testers
- User Feedback Givers
- Bug Reporters
- Feature Suggestors
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Thank You
Pocket AQI is built with the mission to improve air quality awareness and health outcomes. Every download, every report, every check contributes to a healthier planet and healthier lives.
Together, we can breathe cleaner air! 🌍✨


Last updated: April 2026
