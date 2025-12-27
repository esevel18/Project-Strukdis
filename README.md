# Pengaplikasian Graph Coloring pada Frekuensi Radio Tower yang Berdekatan untuk Mengurangi Intervensi

## Limitasi
1. Pada program ini kami mengasumsikan bahwa 1px di dalam web setara dengan 1km di dunia nyata
2. Kita mengasumsikan jangkauan radiasi sinyal dari setiap tower itu sama dan konstan, yaitu sebesar 200Km  luas lingkaran untuk setiap tower yang ada
3. Warna yang digunakan dalam program ini hanyalah 12 warna berbeda, artinya lebih dari itu tower akan mengalami bug warna

## Cara Menjalankan Aplikasi
Alamat web bisa langsung diakses pada link berikut:
https://esevel18.github.io/Project-Strukdis/
*Sangat Direkomendasikan untuk menggunakan komputer/laptop dalam mengakses link di atas, karena web tidak responsif untuk mobile*

Atau cara lain adalah dengan menjalankan program di komputer lokal, berikut langkah-langkahnya:
1. Pastikan `npm` dan `node.js` sudah terinstall pada komputer lokal anda
2. Download file zip dari project ini
3. Ekstrak file zip
4. Buka command prompt pada komputer anda, lalu lakukan navigasi pada file project yang sudah di ekstrak sebelumnya contoh: (../Downloads/Project-Strukdis-main)
5. Ketik `npm run dev` pada command prompt
6. Tunggu beberapa detik, maka akan terbuka sebuah alamat local host biasanya (`http://localhost:5173/`)
7. Klik (ctrl+klik) pada alamat tersebut, anda akan langsung diarahkan pada laman web

## Teknologi yang digunakan
Pada aplikasi ini teknologi yang digunakan adalah `HTML`, `CSS`, dan `Javascript` dengan framework yang digunakan adalah `React + Vite`

## Penjelasan Fitur
1. Input field tower name untuk memasukkan nama dari tower yang diinginkan untuk dicek intervesinya
2. Tombol add tower untuk menambahkan vertex(tower) kedalam canvas disebelah kanan
3. Akan ada radiasi pancaran warna biru disekitar vertex yang menandakan jangkauan radiasi pancaran dari tower
4. Setiap ada pancaran radiasi yang saling overlapping antara vertexnya, vertex-vertex tersebut akan secara otomatis membentuk sisi(edge) satu sama lainnya
5. Vertex(tower) bisa di-drag sesuai kemauan selama masih ada di dalam canvas
6. Tombol visualize digunakan untuk menjalankan algoritma graph coloring dari welsh powell
7. Tombol clear digunakan untuk mereset semua pekerjaan 

## Screenshoot Tampilan
![Screenshot](</public/ScreenshootWeb.png>)