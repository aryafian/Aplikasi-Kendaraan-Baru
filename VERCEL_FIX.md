# 🔧 Fix Error Vercel Deployment

## Masalah yang Sudah Diperbaiki:

### ❌ Error: "Function Runtimes must have a valid version"

**Solusi:**
1. ✅ Update `vercel.json` dengan runtime format yang benar: `"@vercel/node"` (tanpa version number)
2. ✅ Ubah dari ES modules ke CommonJS untuk kompatibilitas Vercel
3. ✅ Perbaiki struktur build commands dan output directories

### ❌ Error: ES Modules di Serverless Functions

**Solusi:**
1. ✅ Ubah semua `import/export` menjadi `require/module.exports`
2. ✅ Update `api/db.js` untuk menggunakan CommonJS
3. ✅ Update semua API endpoints ke CommonJS format

## 📋 Langkah Deploy yang Sudah Diperbaiki:

### 1. **Persiapan Files:**
```bash
# Backup original files
cp package.json package-original.json
cp vite.config.ts vite-original.config.ts

# Use Vercel-ready configs
cp package-vercel.json package.json
cp vite-vercel.config.ts vite.config.ts
```

### 2. **Database Setup (Gratis):**

**Pilihan A: Neon.tech**
```bash
# 1. Buka https://neon.tech
# 2. Sign up dengan GitHub
# 3. Create new project "vehicleflow"
# 4. Copy connection string
```

**Pilihan B: Supabase**
```bash
# 1. Buka https://supabase.com
# 2. Create new project
# 3. Go to Settings > Database
# 4. Copy connection string
```

### 3. **Deploy ke Vercel:**

**Via GitHub:**
```bash
git add .
git commit -m "Fix Vercel deployment configuration"
git push origin main

# 1. Buka vercel.com
# 2. Import GitHub repository
# 3. Vercel akan auto-detect sebagai Node.js project
# 4. Add environment variable: DATABASE_URL
# 5. Deploy!
```

**Via CLI:**
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 4. **Environment Variables:**

Di Vercel Dashboard > Settings > Environment Variables, tambahkan:
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname?sslmode=require
NODE_ENV=production
```

### 5. **Import Database Schema:**

Setelah deploy, connect ke database dan jalankan:
```sql
-- Copy-paste isi file sql/schema.sql
-- Atau gunakan database client seperti:
-- - pgAdmin
-- - DBeaver  
-- - Supabase web console
-- - Neon console
```

## ✅ API Endpoints yang Siap:

- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Check auth status
- `GET /api/vehicles` - List kendaraan
- `POST /api/vehicles` - Tambah kendaraan
- `GET /api/bookings` - List booking
- `POST /api/bookings` - Buat booking baru
- `GET /api/drivers` - List driver
- `POST /api/drivers` - Tambah driver
- `GET /api/dashboard/stats` - Statistik dashboard

## 🔐 Default Login (Setelah Import Schema):

- **Admin**: `admin` / `admin123`
- **Approver L1**: `approver1` / `approver123`  
- **Approver L2**: `approver2` / `approver123`
- **User**: `user1` / `user123`

## 🚀 Deploy URL:

Setelah berhasil deploy, aplikasi akan tersedia di:
`https://vehicleflow-[username].vercel.app`

## ⚠️ Catatan Penting:

1. **CommonJS Format**: Semua API functions sudah diubah ke CommonJS untuk kompatibilitas Vercel
2. **Runtime Format**: Menggunakan `"@vercel/node"` format yang benar (tanpa version number)
3. **Database SSL**: Connection string harus include `?sslmode=require`
4. **CORS Headers**: Sudah ditambahkan ke semua endpoints untuk frontend access

Sekarang project siap deploy ke Vercel tanpa error! 🎉