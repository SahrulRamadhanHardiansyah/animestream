# Otakudesu Anime Explorer

**Otakudesu Anime Explorer** adalah aplikasi web untuk menjelajahi dan mencari anime dari situs Otakudesu menggunakan API tidak resmi. Dibuat dengan Next.js 13 dan Tailwind CSS.

> 🎯 Proyek ini menggunakan API dari: [https://github.com/wajik45/wajik-anime-api](https://github.com/wajik45/wajik-anime-api)

## ✨ Fitur

- ✅ Menampilkan daftar anime *Ongoing* dan *Completed*
- 🔍 Fitur pencarian anime berdasarkan kata kunci
- 📄 Halaman detail anime
- ⏫ Scroll-to-top button
- 🔁 Navigasi dengan pagination
- 📱 Tampilan responsif (Mobile & Desktop)

## ⚙️ Teknologi

- [Next.js 13+](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Wajik Anime API (Unofficial Otakudesu API)](https://github.com/wajik45/wajik-anime-api)

## 📦 Instalasi

```bash
# Clone project
git clone https://github.com/username/otakudesu-anime-explorer.git
cd otakudesu-anime-explorer

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka browser dan akses: [http://localhost:3000](http://localhost:3000)

## 🗂️ Struktur Proyek

```
.
├── app/
│   ├── page.jsx                     # Halaman utama
│   ├── search/[keyword]/            # Halaman hasil pencarian
│   ├── anime/[id]/                  # Detail anime
│   ├── otakudesu/episode/[id]/      # Detail episode
│   ├── completed/page.jsx           # Completed anime
│   └── ongoing/page.jsx             # Ongoing anime
├── components/
│   ├── AnimeList/
│   ├── Dashboard/
│   └── utilities/
├── libs/
│   └── api-libs.js                  # Fungsi fetch API
├── public/
└── README.md
```

## 🔗 API

Aplikasi ini menggunakan API dari [wajik45/wajik-anime-api](https://github.com/wajik45/wajik-anime-api) yang menyediakan data anime dari Otakudesu.

Contoh endpoint:
- `/ongoing`
- `/completed`
- `/anime/{id}`
- `/search?q=naruto`

## 📸 Screenshot

![image](https://github.com/user-attachments/assets/f5e82ab3-daf0-45e1-b111-8962c7c1be23)

![image](https://github.com/user-attachments/assets/de8eb7e6-06ea-415d-89eb-45eb78cbcb8e)

![image](https://github.com/user-attachments/assets/fc8300d3-b866-455d-a87d-8089d11f8946)

![image](https://github.com/user-attachments/assets/a610f05b-c7ed-4f2c-9f76-6fbd0016319d)

![image](https://github.com/user-attachments/assets/82dff883-dc1e-4c4b-96c7-1998047b32af)

## 📄 Lisensi

Proyek ini hanya untuk pembelajaran dan **tidak berafiliasi dengan Otakudesu** atau pihak resmi manapun.

---
