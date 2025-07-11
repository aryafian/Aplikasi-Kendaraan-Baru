# Deployment Guide - VehicleFlow

## Option 1: Render.com (Recommended - Free)

### Step 1: Prepare Repository
1. Push your code to GitHub repository
2. Make sure `render.yaml` file exists in root directory

### Step 2: Deploy to Render
1. Go to [render.com](https://render.com) and create account
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically:
   - Create PostgreSQL database (free tier)
   - Deploy web service
   - Set up environment variables

### Step 3: Database Setup
After deployment, run database migration:
1. Go to Render dashboard → Your service → Shell
2. Run: `npm run db:push`

### Environment Variables (Auto-configured by render.yaml):
- `DATABASE_URL` - Automatically set from PostgreSQL database
- `NODE_ENV=production`

---

## Option 2: Railway.app (Alternative)

### Step 1: Setup
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add PostgreSQL database service

### Step 2: Environment Variables
Set these in Railway dashboard:
- `DATABASE_URL` - Copy from PostgreSQL service
- `NODE_ENV=production`
- `PORT=3000`

### Step 3: Deploy
Railway will automatically deploy when you push to GitHub.

---

## Option 3: Koyeb.com (Limited Free Hours)

### Step 1: Prepare
1. Create Dockerfile (if needed)
2. Push to GitHub

### Step 2: Deploy
1. Connect GitHub repository to Koyeb
2. Add PostgreSQL database from their marketplace
3. Set environment variables

---

## Database Options (If using separate DB service):

### Neon.tech (Free PostgreSQL)
- 1 project, 3GB data, 1GB RAM
- Get connection string from Neon dashboard

### Aiven.io (Free Tier)
- 1GB RAM, 5GB storage
- San Francisco, NYC, Toronto locations

---

## Important Notes:

1. **Free Tier Limitations:**
   - Render: Service sleeps after 15 mins, DB deleted after 90 days
   - Railway: $5 one-time credits
   - Koyeb: 50 active hours/month

2. **Build Command:** `npm install && npm run build`
3. **Start Command:** `npm start`

4. **Database Migration:** 
   After first deployment, run `npm run db:push` to create tables.

---

## Quick Deploy to Render (Langkah Mudah):

1. **Upload ke GitHub:**
   - Push semua code ke repository GitHub Anda
   - Pastikan file `render.yaml` ada di root folder

2. **Deploy ke Render:**
   - Buka [render.com](https://render.com) dan buat akun gratis
   - Klik "New" → "Blueprint"
   - Connect repository GitHub Anda
   - Render akan otomatis setup database dan web service

3. **Setup Database:**
   - Setelah deployment selesai, buka Render dashboard
   - Pilih service Anda → klik "Shell" 
   - Jalankan: `npm run db:push`
   - Jalankan: `npm run db:seed` (untuk data sample)

4. **Akses Aplikasi:**
   - URL aplikasi akan tersedia di dashboard Render
   - Format: `https://vehicleflow-xxxx.onrender.com`

**Login Default:**
- Username: admin / Password: admin123
- Username: approver1 / Password: approver123

## Kenapa Vercel Tidak Bisa?

Vercel hanya untuk frontend statis atau serverless functions. Project ini butuh:
- ✗ Node.js server yang selalu running (Express)
- ✗ PostgreSQL database dengan persistent connection
- ✗ File uploads dan session management

Render/Railway/Koyeb lebih cocok untuk full-stack apps seperti ini.

🚀 **Render.com adalah pilihan terbaik untuk project ini - benar-benar gratis!**