 📈 FinTrack 2026 - Monitoring Keuangan Pribadi!
 
 ---
<img width="1920" height="2398" alt="screencapture-monitor-keuangan-vercel-app-2025-12-31-11_32_37" src="https://github.com/user-attachments/assets/31b8c07f-6f75-424d-a450-f16fe6a56f3f" />

---
FinTrack adalah aplikasi web sederhana namun powerful untuk memantau keuangan pribadi. Didesain khusus untuk pekerja Indonesia, aplikasi ini membantu pengguna melacak pemasukan, pengeluaran, mengatur anggaran, serta menetapkan target keuangan masa depan.

Aplikasi ini berjalan sepenuhnya di sisi klien (browser), sehingga data Anda tersimpan aman secara lokal di perangkat Anda (LocalStorage) tanpa perlu koneksi ke server database eksternal.
✨ Fitur Utama

Aplikasi ini memiliki 5 modul utama:

1.  🏠 Dashboard Interaktif

    Ringkasan saldo saat ini, total pemasukan, dan pengeluaran bulan ini.

    Persentase kenaikan/penurunan keuangan dibandingkan bulan lalu.

    Visualisasi Grafik:

        Tren Keuangan 6 Bulan Terakhir (Line Chart).

        Distribusi Pengeluaran per Kategori (Doughnut Chart).

    Daftar transaksi terbaru.

2.  💸 Manajemen Transaksi

    CRUD Lengkap: Tambah, Edit, dan Hapus transaksi.

    Kategorisasi otomatis (Gaji, Makanan, Transportasi, dll).

    Sistem Filter: Filter transaksi berdasarkan Jenis (Pemasukan/Pengeluaran), Kategori, dan Bulan.

3.  💰 Pengelolaan Anggaran (Budgeting)

    Tetapkan batas anggaran bulanan atau tahunan untuk kategori tertentu (misal: Makan, Hiburan).

    Progress Bar: Visualisasi penggunaan anggaran dengan indikator warna (Hijau: Aman, Kuning: Hati-hati, Merah: Over-budget).

4.  🎯 Target Keuangan

    Tetapkan tujuan tabungan (misal: Dana Darurat, Liburan ke Bali, Beli Kendaraan).

    Lacak progres tabungan dengan estimasi waktu tercapai.

    Notifikasi visual jika target mendekati atau melewati tanggal jatuh tempo.

5.  📊 Laporan & Backup

    Laporan detail perbandingan pemasukan vs pengeluaran.

    Ekspor PDF: Unduh laporan keuangan bulanan atau backup seluruh data ke dalam format PDF.

    Reset Data: Fitur untuk menghapus seluruh data dan kembali ke pengaturan awal.

🛠️ Teknologi yang Digunakan

    HTML5: Struktur semantik aplikasi.

    CSS3: Styling modern dengan variabel CSS, Flexbox, dan Grid Layout (Responsif untuk Mobile & Desktop).

    JavaScript (Vanilla ES6+): Logika aplikasi, manipulasi DOM, dan manajemen LocalStorage.

    External Libraries (via CDN):

        Chart.js - Untuk membuat grafik interaktif.

        Font Awesome - Untuk ikon antarmuka.

        jsPDF & html2canvas - Untuk fitur ekspor ke PDF.

🚀 Cara Menjalankan

Karena aplikasi ini berbasis static web, kamu tidak perlu menginstal Node.js atau server backend apa pun.

    Download/Clone semua file (index.html, style.css, script.js).

    Pastikan ketiga file tersebut berada dalam satu folder yang sama.

    Klik dua kali file index.html untuk membukanya di browser (Chrome, Firefox, Edge, Safari).

    Aplikasi siap digunakan!

    Catatan: Saat pertama kali dijalankan, aplikasi akan memuat "Data Contoh" agar kamu bisa melihat visualisasinya. Kamu bisa mereset data ini melalui menu Backup (ikon database di pojok kanan atas).

📂 Struktur Folder
Plaintext

/fintrack-project
│
├── index.html # Struktur utama halaman dan layout
├── style.css # Desain tampilan, warna, dan responsivitas
└── script.js # Logika aplikasi, chart, dan penyimpanan data

💾 Privasi Data

Data disimpan menggunakan Browser LocalStorage.

    Keuntungan: Data tidak dikirim ke server mana pun, privasi terjaga 100% di perangkatmu.

    Peringatan: Jika kamu membersihkan Cache/Browsing Data browser, data keuangan mungkin akan hilang. Gunakan fitur "Ekspor Data ke PDF" secara berkala sebagai cadangan manual.

📱 Tampilan Responsif

Aplikasi ini didesain mobile-first friendly. Tampilan akan menyesuaikan secara otomatis baik dibuka di Laptop, Tablet, maupun Smartphone.
🤝 Kontribusi & Pengembangan

Kode ini bebas untuk dimodifikasi. Beberapa ide untuk pengembangan selanjutnya:

    Menambahkan fitur Dark Mode.

    Menambahkan fitur Ekspor/Impor data via file JSON (untuk memindahkan data antar perangkat).

    Menambahkan konversi mata uang.

Dibuat dengan ❤️ untuk Pekerja Indonesia. © 2026 FinTrack
