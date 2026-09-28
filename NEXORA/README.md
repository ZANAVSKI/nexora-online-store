# NEXORA — Production-ready store build

Node.js 22+ / built-in SQLite.

## Local
1. Run `start-server.bat` or `npm start`.
2. Open `http://localhost:3000`.
3. Admin: `http://localhost:3000/admin.html`.

## Admin
Admin credentials are controlled by `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Never commit `.env`.

## Production
Set `PORT`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `DB_PATH` in your host environment. Mount `/app/data` as persistent storage and use HTTPS.

## Features
Real DB-backed products, product variants, inventory, orders, status updates, support tickets/replies, reviews, promo codes, notifications, admin product photo upload/delete/restore, and settings.
