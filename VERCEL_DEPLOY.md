# 🚀 Deploy VehicleFlow ke Vercel

Saya sudah mengkonversi project VehicleFlow agar kompatibel dengan Vercel menggunakan serverless functions.

## 📁 Struktur Baru untuk Vercel:

```
project/
├── api/                     # Serverless Functions
│   ├── db.js               # Database connection pooling
│   ├── auth/
│   │   ├── login.js        # POST /api/auth/login
│   │   └── me.js           # GET /api/auth/me
│   ├── vehicles.js         # GET/POST /api/vehicles
│   ├── bookings.js         # GET/POST /api/bookings
│   ├── drivers.js          # GET/POST /api/drivers
│   └── dashboard/
│       └── stats.js        # GET /api/dashboard/stats
├── client/                 # React Frontend
├── vercel.json             # Vercel configuration
├── package-vercel.json     # Dependencies untuk Vercel
└── vite-vercel.config.ts   # Vite config untuk build
```

## 🛠️ Yang Sudah Diubah:

✅ **Backend ke Serverless Functions:**
- Konversi Express routes ke Vercel serverless functions
- Database connection pooling untuk menghindari "too many connections"
- CORS headers untuk semua API endpoints
- Error handling yang proper

✅ **Frontend Optimizations:**
- Konfigurasi Vite untuk build static files
- API client yang kompatibel dengan Vercel
- Environment variables support

✅ **Database Integration:**
- PostgreSQL connection pooling
- Support untuk environment variables
- Query optimization untuk serverless

## 📋 Langkah Deploy ke Vercel:

### 1. **Persiapan Files:**
```bash
# Backup original files
cp package.json package-original.json
cp vite.config.ts vite-original.config.ts

# Use Vercel-ready configs (sudah diperbaiki)
cp package-vercel.json package.json
cp vite-vercel.config.ts vite.config.ts

# Commit changes
git add .
git commit -m "Fix: Update Vercel deployment with CommonJS and proper runtime"
git push origin main
```

**⚠️ Error sudah diperbaiki:**
- ✅ Runtime format `"@vercel/node"` yang benar (tanpa version number)
- ✅ Semua API functions menggunakan CommonJS (bukan ES modules)
- ✅ Struktur build dan output directories yang benar

### 2. **Setup Database:**
Pilih salah satu opsi database PostgreSQL gratis:

**Option A: Neon (Recommended)**
- Buka [neon.tech](https://neon.tech) 
- Buat database baru
- Copy connection string

**Option B: Supabase**  
- Buka [supabase.com](https://supabase.com)
- Buat project baru
- Copy connection string dari Settings > Database

**Option C: Vercel Postgres**
- Langsung terintegrasi saat deploy
- Otomatis setup dari Vercel dashboard

### 3. **Deploy ke Vercel:**

**Via GitHub (Recommended):**
```bash
# Push ke repository GitHub
git add .
git commit -m "Convert to Vercel serverless"
git push origin main
```

1. Buka [vercel.com](https://vercel.com)
2. Import repository GitHub
3. Vercel akan otomatis detect sebagai Vite project
4. Add environment variable: `DATABASE_URL`
5. Deploy!

**Via Vercel CLI:**
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 4. **Environment Variables di Vercel:**

Tambahkan di Vercel Dashboard > Settings > Environment Variables:
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
NODE_ENV=production
```

### 5. **Setup Database Tables:**

Setelah deploy, import schema SQL ke database Anda:

1. **Connect ke database** menggunakan tools seperti:
   - pgAdmin, DBeaver, atau TablePlus
   - Database dashboard (Neon/Supabase web console)
   - psql command line

2. **Import schema:**
   - Copy isi file `sql/schema.sql`
   - Paste dan jalankan di database console
   - Atau upload file `sql/schema.sql` via web interface

3. **Verify tables:**
   ```sql
   \dt -- List all tables
   SELECT * FROM users LIMIT 5; -- Check sample data
   ```

## 🔧 API Endpoints yang Tersedia:

- `GET /api/auth/me` - Get current user  
- `POST /api/auth/login` - User login
- `GET /api/vehicles` - List vehicles
- `POST /api/vehicles` - Create vehicle
- `GET /api/bookings` - List bookings  
- `POST /api/bookings` - Create booking
- `GET /api/drivers` - List drivers
- `POST /api/drivers` - Create driver
- `GET /api/dashboard/stats` - Dashboard statistics

## 🎯 Keunggulan Vercel Version:

✅ **Gratis selamanya** untuk tier hobby
✅ **Auto-scaling** sesuai traffic  
✅ **Global CDN** untuk performa cepat
✅ **SSL certificate** otomatis
✅ **GitHub integration** untuk auto-deploy
✅ **Database support** via partnerships

## ⚠️ Batasan Serverless:

- No persistent sessions (gunakan JWT/localStorage)
- Cold start bisa lambat di request pertama
- Connection pooling penting untuk database
- File uploads perlu external storage (Cloudinary, AWS S3)

## 🚀 Ready to Deploy!

Project sudah siap deploy ke Vercel. Ikuti langkah di atas dan dalam 5 menit aplikasi Anda akan live dengan domain `.vercel.app`!

**URL Format:** `https://vehicleflow-username.vercel.app`