# Panduan Kontribusi "Kastau Terjemahan"

Terima kasih atas minat Anda untuk berkontribusi pada proyek "Kastau Terjemahan"! Kami sangat menghargai upaya Anda untuk membantu kami memperbaiki dan mengembangkan aplikasi ini.

## Bagaimana Berkontribusi

**Panduan Kontribusi Video**: Jika Anda lebih suka panduan kontribusi dalam bentuk video, Anda dapat mengunjungi [tautan berikut](https://youtu.be/-95NHeoP-oQ?si=-ez0e6c468CU4ehy) untuk melihat panduan langkah demi langkah.

Jika Anda ingin berkontribusi pada proyek ini, berikut adalah langkah-langkah yang dapat Anda ikuti:

1. Fork repositori ini ke akun GitHub Anda.

2. Clone repositori fork ke komputer lokal Anda:

    ```bash
    git clone https://github.com/antroy-tech/kastau-terjemahan.git
    ```
   
    Gantilah username dengan nama pengguna GitHub Anda.

3. Buat branch baru untuk pekerjaan Anda:

    ```bash
    git checkout -b fitur-baru
    ```
    
    Gantilah fitur-baru dengan nama branch yang sesuai dengan pekerjaan yang akan Anda lakukan.

4. Lakukan perubahan yang diperlukan pada kode.

5. Lakukan commit perubahan Anda dengan mengikuti konvensi commit (contoh: feat: membuat fitur x untuk melakukan fungsi y ):

    ```bash
    git commit -m "feat: membuat fitur x untuk melakukan fungsi y"
    ```

    Tuliskan deskripsi singkat tentang perubahan yang Anda lakukan. Pastikan untuk mengikuti konvensi commit yang telah ditentukan, [baca disini](https://www.conventionalcommits.org/en/v1.0.0/).

6. Push perubahan Anda ke repositori GitHub Anda:

    ```bash
    git push origin fitur-baru
    ```

7. Buat pull request (PR) ke repositori utama:

    - Buka repositori utama Kastau Terjemahan di GitHub Anda.

    - Klik tombol "New Pull Request".

    - Pilih branch Anda (fitur-baru) sebagai branch sumber dan branch utama (misalnya main) sebagai branch tujuan.

    - Berikan deskripsi singkat tentang perubahan yang Anda lakukan dalam PR Anda.

    - Klik tombol "Create Pull Request" untuk mengajukan PR.

    Kami akan meninjau PR Anda secepat mungkin dan memberikan umpan balik jika diperlukan. Setelah PR Anda diterima, perubahan Anda akan disatukan (merged) ke repositori utama.

## Integrasi dengan Database (Supabase)

Aplikasi "Kastau Terjemahan" menggunakan Supabase sebagai platform backend untuk mengelola data terjemahan dan bahasa daerah. Berikut adalah panduan singkat tentang cara melakukan integrasi dengan database Supabase jika Anda ingin berkontribusi pada bagian ini:

1. Buat akun di [Supabase](https://supabase.com/) jika Anda belum memiliki akun.

2. Buat proyek Supabase baru dan dapatkan URL API dan kunci API (API Key). Anda akan menggunakan ini untuk menghubungkan aplikasi dengan basis data Supabase.

3. Salin file `.env.example` menjadi `.env` di direktori proyek Anda, dan pada file `.env` yang baru dibuat dan tambahkan informasi berikut:

   ```plaintext
    PUBLIC_SUPABASE_URL=<your supabase project url>
    PUBLIC_SUPABASE_ANON_KEY=<your public api key>
   ```
   
   Gantilah `<your supabase project url>` dengan URL API yang Anda dapatkan dari Supabase dan `<your public api key>` dengan kunci API Anda.
   
4. Di dalam proyek Supabase Anda, ekspor skema SQL dari file schema.sql yang terletak di dalam folder `db`. Anda dapat melakukannya dengan cara menyalin kode SQL dari file tersebut dan menjalankannya pada editor SQL di Supabase.

5. Setelah skema database telah dibuat, tambahkan data sampel yang ada dalam folder `db` ke dalam tabel yang sesuai di basis data Anda. Anda dapat menggunakan data sampel ini untuk menguji aplikasi dan memeriksa apakah integrasi database berfungsi dengan baik.

## Kode Etik

Kami mendorong setiap kontributor untuk berperilaku dengan sopan dan mengikuti kode etik dalam berkontribusi. Harap lihat [Kode Etik Kami](CODE_OF_CONDUCT.md) untuk informasi lebih lanjut.

## Laporan Masalah

Jika Anda menemui bug atau memiliki ide untuk perbaikan, Anda dapat membuat laporan masalah (issue) di halaman [issues](https://github.com/antroy-tech/kastau-terjemahan/issues) repositori ini.

## Lisensi

Dengan berkontribusi pada proyek "Kastau Terjemahan," Anda setuju untuk merilis kontribusi Anda di bawah [lisensi MIT](LICENSE).

Terima kasih atas kontribusi Anda!