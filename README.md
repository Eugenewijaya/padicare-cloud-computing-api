Padicares API - Capstone Project

API untuk platform artikel informasi tentang tanaman padi.
Dikembangkan sebagai bagian dari capstone project untuk memberikan berita dan pengetahuan tentang tanaman padi.

🎯 Deskripsi
Padicares API adalah backend RESTful API sederhana yang berfokus pada penyediaan artikel seputar tanaman padi. Artikel mencakup informasi tentang budidaya, inovasi pertanian, dan pengelolaan padi. API ini:

Belum mendukung CRUD artikel, tetapi mampu menampilkan artikel statis.
Artikel disimpan di Google Cloud Storage dalam format JSON atau teks.
API ini di-deploy menggunakan Google Cloud Functions dengan integrasi ke Google Cloud Storage untuk penyimpanan data artikelnya.

📦 Fitur yang Tersedia
Menampilkan Artikel
Endpoint untuk mendapatkan daftar artikel yang tersedia.
Google Cloud Storage Integration
Artikel disimpan dalam bucket Cloud Storage dan diambil oleh API.
Deployment di Google Cloud Functions
API berjalan secara serverless menggunakan Google Cloud Functions.
