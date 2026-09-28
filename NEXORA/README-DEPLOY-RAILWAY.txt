NEXORA — Railway deployment

1) Create a Railway account and connect GitHub.
2) Put this project in a GitHub repository.
3) Railway -> New Project -> Deploy from GitHub Repo -> choose the repository.
4) Add these Variables in the service:
   JWT_SECRET=your-own-long-random-secret
   ADMIN_EMAIL=your-admin-email
   ADMIN_PASSWORD=your-own-strong-admin-password
   DB_PATH=/data/nexora.db
5) Add a Volume to the service and set Mount Path to /data.
6) Deploy. Railway will use npm start and /health automatically.
7) Open Networking -> Generate Domain.

IMPORTANT:
- SQLite files outside a Railway Volume are ephemeral. The /data volume keeps the database persistent between deployments.
- Never commit a real .env file or real production password to GitHub.
- The project is configured to use Railway's PORT automatically.

Local start:
   start-server.bat
Or:
   npm start
