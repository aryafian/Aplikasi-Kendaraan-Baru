# 🚗 VehicleFlow - Vehicle Booking Management System

Sistem manajemen pemesanan kendaraan perusahaan dengan sistem persetujuan bertingkat dan dashboard analytics real-time.

## ✨ Fitur Utama

- 🔐 **Multi-role Authentication** (Admin, Approver, Requester)
- 🚗 **Vehicle & Driver Management** dengan status tracking
- 📋 **Booking System** dengan approval workflow
- ✅ **Multi-level Approval Process** (Level 1 → Level 2)
- 📊 **Analytics Dashboard** dengan charts dan statistics
- 📱 **Responsive Design** dengan Tailwind CSS
- 🔒 **Role-based Access Control** untuk semua fitur

## 🛠️ Tech Stack

### Frontend
- **React 18** dengan TypeScript
- **Tailwind CSS** + Radix UI components
- **TanStack Query** untuk state management
- **React Hook Form** + Zod validation
- **Chart.js** untuk data visualization
- **Wouter** untuk routing

### Backend Options

#### Vercel (Serverless) - Primary
- **Vercel Serverless Functions** 
- **PostgreSQL** dengan connection pooling
- **CORS-enabled** API endpoints

#### Render.com (Traditional) - Backup
- **Node.js Express** server
- **PostgreSQL** database
- **Session-based** authentication

## 🚀 Quick Deploy ke Vercel (Gratis)

### 1. Persiapan
```bash
# Clone dan setup
git clone [repository-url]
cd vehicleflow

# Setup untuk Vercel
cp package-vercel.json package.json
cp vite-vercel.config.ts vite.config.ts
```

### 2. Database Setup
Pilih database PostgreSQL gratis:
- **[Neon.tech](https://neon.tech)** - 3GB gratis
- **[Supabase.com](https://supabase.com)** - 500MB gratis  
- **Vercel Postgres** - integrated

### 3. Deploy
```bash
# Push ke GitHub
git add .
git commit -m "Deploy to Vercel"
git push origin main

# Atau via CLI
npm i -g vercel
vercel --prod
```

### 4. Environment Variables
Di Vercel Dashboard, tambahkan:
```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
NODE_ENV=production
```

### 5. Import Database Schema
```bash
# Connect ke database dan import
psql $DATABASE_URL < sql/schema.sql
```

## 🔐 Default Login

Setelah import schema:
- **Admin**: `admin` / `admin123`
- **Approver Level 1**: `approver1` / `approver123`  
- **Approver Level 2**: `approver2` / `approver123`
- **Requester**: `user1` / `user123`

## 📁 Project Structure

```
vehicleflow/
├── api/                     # Vercel Serverless Functions
│   ├── auth/               # Authentication endpoints
│   ├── dashboard/          # Dashboard APIs
│   ├── bookings.js         # Booking CRUD
│   ├── vehicles.js         # Vehicle management
│   └── drivers.js          # Driver management
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities & config
│   │   └── hooks/          # Custom hooks
├── sql/                    # Database schema
├── vercel.json             # Vercel configuration
└── VERCEL_DEPLOY.md        # Detailed deploy guide
```

## 🔄 Data Flow

### Booking Process
1. Requester membuat booking request
2. System validasi dan assign booking number
3. Level 1 approver review → approve/reject
4. Level 2 approver final decision
5. Auto-assign vehicle & driver saat approved
6. Activity logging sepanjang proses

### API Endpoints
- `POST /api/auth/login` - User authentication
- `GET /api/vehicles` - List vehicles
- `POST /api/bookings` - Create booking
- `GET /api/dashboard/stats` - Dashboard data
- Dan 10+ endpoints lainnya

## 📊 Dashboard Features

- **Real-time Statistics** - Total bookings, pending approvals
- **Usage Charts** - Weekly/monthly booking trends  
- **Vehicle Status** - Available/in-use/maintenance
- **Recent Activities** - Latest bookings dan approvals

## 🔧 Development

```bash
# Local development
npm install
npm run dev

# Database setup
npm run db:push

# Build for production  
npm run build
```

## 📝 Alternative Deploy (Render.com)

Untuk traditional server deployment, lihat `DEPLOYMENT.md` untuk panduan deploy ke Render.com.

## 🤝 Contributing

Project ini menggunakan:
- **ESLint** + **Prettier** untuk code formatting
- **TypeScript** untuk type safety
- **Conventional Commits** untuk git messages

## 📄 License

MIT License - bebas digunakan untuk project komersial dan personal.

---

**🚀 Deploy sekarang dan dapatkan aplikasi manajemen kendaraan yang lengkap dalam 5 menit!**