# Recovery Report — Production DB Wipe (10 May 2026)

## Apa yang terjadi

`deploy.sh` versi sebelum ditambal melakukan rsync dengan `--delete` ke folder
`/www/wwwroot/ferhatmuhamad.web.id/` **tanpa exclude `database/`**, sehingga
file `database/database.sqlite` produksi (yang berisi ~22 project hasil input
manual) tertimpa oleh seeder lokal (hanya 6 project: ID 7–12).

`deploy.sh` sudah ditambal (bagian rsync sekarang exclude `database/*.sqlite*`).

## Hasil recovery dari raw block `/dev/sda1`

| Asset                                    | Status                                                                  | Lokasi / Detail                                                                     |
| ---------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Project text (titles, descriptions, dll) | **1 dari ~22 ter-recover**                                              | "Infrastructure Metal Casting Company Profile — Futago Karya" — utuh dari WAL block |
| Cover images                             | **18 file** masih ada                                                   | `storage/app/public/projects/covers/` (tidak disentuh deploy)                       |
| Gallery images                           | **~60 file** masih ada                                                  | `storage/app/public/projects/gallery/` (tidak disentuh deploy)                      |
| Project IDs yang sempat dibuat/edit      | 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 28 | Dari nginx access log                                                               |
| WAL/journal SQLite                       | **Tidak ada**                                                           | Ikut ter-overwrite                                                                  |
| Backup BT-Panel                          | **Tidak ada**                                                           | `/www/backup/` cuma berisi config; tidak ada cron untuk DB SQLite                   |

### Kenapa cuma 1 yang ter-recover

SQLite menulis perubahan via WAL → checkpoint ke file utama. Saat deploy
mengoverwrite `database.sqlite`, ext4 langsung menjadikan blok-blok lama
"freed" dan kernel memakai ulang sebagian besarnya untuk file baru
(termasuk nginx access log yang sangat aktif). Hanya 3 page (di offset
`0x788…`, `0x970…`, `0xa30…`) yang masih utuh berisi data project baru —
ketiganya kebetulan **mirror data yang sama** (Futago Karya), bukan
project berbeda.

Project lain (Futake Indonesia, Kembar Teknika, TVILING, Ayem Tentrem,
Solusi3M, SIAKAD UM OKU Timur, dst.) sudah ter-overwrite di area b-tree
SQLite. Page-page indeks `(cover_url, rowid)` masih ada di `0x9877fd000`
tapi hanya berisi nama file cover + ID, bukan field text lengkap.

## Project yang BISA langsung dipulihkan

### Futago Karya — full data ter-recover

```php
\App\Models\Project::create([
    'title'        => 'Infrastructure Metal Casting Company Profile — Futago Karya',
    'slug'         => 'infrastructure-metal-casting-company-profile-futago-karya-R0ReJS',
    'category'     => 'wordpress',
    'client'       => 'Personal Project',
    'summary'      => 'Developed a professional company profile website for Futago Karya using WordPress with responsive design, product showcase features, WhatsApp integration, and SEO-friendly architecture.',
    'summary_id'   => 'Mengembangkan website company profile profesional untuk Futago Karya menggunakan WordPress dengan desain responsif, fitur showcase produk, integrasi WhatsApp, dan arsitektur SEO-friendly.',
    'description'  => "Developed a professional company profile website for Futago Karya using WordPress with a responsive and modern design. The website was built to showcase the company's street furniture and metal casting products, including product catalogs, project galleries, company information, and customer contact integration. Features include responsive UI/UX, custom page layouts, product showcase sections, WhatsApp contact integration, SEO-friendly structure, and easy content management for business scalability and online brand presence.",
    'description_id' => "Membangun website company profile profesional untuk Futago Karya menggunakan WordPress dengan tampilan modern dan responsive. Website ini dirancang untuk menampilkan produk street furniture dan metal casting perusahaan, termasuk katalog produk, galeri proyek, informasi perusahaan, serta integrasi kontak pelanggan.\n\nFitur utama yang dikembangkan meliputi responsive UI/UX, custom page layout, section showcase produk, integrasi WhatsApp, struktur SEO-friendly, serta sistem manajemen konten yang mudah digunakan. Website dibangun untuk mendukung skalabilitas bisnis, memperkuat branding digital perusahaan, dan meningkatkan visibilitas online kepada calon pelanggan maupun partner bisnis.",
    'cover_url'    => 'projects/covers/LYfHi8yURdRqcXChvlQ3JWhgV2bMilulvF96PfpN.png',
    'gallery'      => [
        'projects/gallery/jEmAZkou5ViYzzl7L5loJLMosXYx0HXER8HMzeaW.png',
        'projects/gallery/SLQLrLsilcFNzaNiLsq6vKTc6BcSPogvDZ3Pf07q.png',
        'projects/gallery/bZRb7iics39gt1ArOd5AiqZVHSyvY6R1SDIvfZuF.png',
        'projects/gallery/uij7HCRzuI0QENyokgesYhBg3LqTZ0LMAcwaiki7.png',
    ],
    'tech_stack'   => ['Wordpress', 'Elementor', 'SEO', 'MySQL'],
    'live_url'     => 'https://futagotrotoar.co.id/',
    'completed_at' => '2022-08-25',
    'is_active'    => true,
    'is_featured'  => false,
    'order'        => 6,
]);
```

## Project yang harus diinput ulang manual — tapi dengan banyak hint

Cover image masih utuh di server. Berikut mapping `cover filename → upload time`
(urut waktu — kemungkinan urutan input project):

| #   | Cover (di `storage/app/public/projects/covers/`) | Uploaded                                    |
| --- | ------------------------------------------------ | ------------------------------------------- |
| 1   | `XU30FDro3WAtklJ2M4OrGJsI1QH5KJZkgQfPzhLA.png`   | May 10 11:15                                |
| 2   | `DEQ40Dqzk2Zzr56h90XB7B5MR4qut8rx0f0niMuR.png`   | May 10 14:21                                |
| 3   | `V2ZGJZ8vbYcl9HxiLdaLlEXmuwA2yMvme0UkzwnS.png`   | May 10 14:43                                |
| 4   | `SWamZAFAZ9mcRV7ElVES1DnoE6EqF7lwWTgeyON5.png`   | May 10 14:51                                |
| 5   | `lL183m5F20xXNx7FlZtgezV1lAnbvGwghaHTHMHJ.png`   | May 10 15:00                                |
| 6   | `KMEZ7KvddRZ9KlQTfbJGsNNwJtmVyBadYcwuyKqi.png`   | May 10 15:08                                |
| 7   | `42XxxmZsZAfteBfIRIhbStXz5b9fQKFxHHmvJkUQ.png`   | May 10 15:11                                |
| 8   | `LYfHi8yURdRqcXChvlQ3JWhgV2bMilulvF96PfpN.png`   | May 10 15:16 ← **Futago Karya (sudah ada)** |
| 9   | `A6B6hSGaLmPzLteK3TQxMP0oUuqyJgzasPVzzyL2.png`   | May 10 15:20                                |
| 10  | `WGRbKBW6dMYjyKdBMvVQLpHnGDiXF4HxFw8pAjK6.png`   | May 10 15:25                                |
| 11  | `s0q8KRER4UdVxYzi3ABwHcLMiNbZfkT1522YhSym.png`   | May 10 15:33                                |
| 12  | `wsjukKbKXvuSg1B7BCerSacKXXlMZnlJCxNZVfvn.png`   | May 10 15:45                                |
| 13  | `iMIYcGrBkmNtIh5cObS1QlodaDb3BIPrxsYjpJKY.png`   | May 10 15:54                                |
| 14  | `VXKrlI4fZD60IwGFtxMGfN46FgVPmNVSiBHVJzDY.png`   | May 10 15:58                                |
| 15  | `T4ZgtxRisJdZd7zi96J2037Lh9amCeBlc2KvIBKp.png`   | May 10 16:04                                |
| 16  | `LFqOIGbZfPWdlw8riFXtmXpVJAPHun7SOleLGqDN.png`   | May 10 16:08                                |
| 17  | `eD0qv5nRxKvXw7NYss5jXgdeq56snH1OoPy6eTce.png`   | May 10 16:15                                |
| 18  | `80J0zUkaUkfMdCTOkYklkhZbFn36PahZk1Z0qlbP.png`   | May 10 16:24                                |

Cover #8 sudah dipakai Futago Karya. Sisanya **17 cover image** yang harus
dipasangkan ulang dengan title/description-nya. Anda bisa buka satu per satu
file PNG-nya untuk mengingat project-nya.

Project name yang anda pernah sebutkan dan kemungkinan masuk dalam 17 itu:

- SIAKAD UM OKU Timur (vue)
- Industrial Solutions Company Profile Website — Futake Indonesia (wordpress)
- Industrial Machinery Manufacturing Company Profile — Kembar Teknika (wordpress)
- Technical Supply Company Profile Website — TVILING (wordpress)
- Metal Casting & Ornamental Manufacturing Website — Ayem Tentrem (wordpress)
- Aquaculture Cooperative Company Profile Website — Solusi3M (wordpress)

## Hardening berikutnya (penting!)

1. **`deploy.sh` sudah ditambal** dengan `--exclude='/database/*.sqlite*'`.
   Verifikasi dengan dry-run sebelum deploy berikutnya:

    ```sh
    rsync -avz --dry-run --delete \
      --exclude='/database/*.sqlite*' \
      --exclude='/.env' --exclude='/storage/' \
      ./ user@host:/dest/
    ```

2. **Tambahkan auto-backup DB** sebelum tiap deploy. Edit `deploy.sh` di blok
   REMOTE_SCRIPT, sebelum step rsync stage→dest:

    ```sh
    if [ -f "$DEST/database/database.sqlite" ]; then
      ts=$(date +%Y%m%d-%H%M%S)
      sudo -u www cp "$DEST/database/database.sqlite" \
        "/www/backup/database/portfolio-$ts.sqlite"
    fi
    ```

    Buat dulu folder targetnya: `sudo mkdir -p /www/backup/database`.

3. **Pertimbangkan migrasi ke MySQL** — BT-Panel bisa auto-backup MySQL via
   cron, sedangkan SQLite di luar cakupannya.

4. **Cron backup harian SQLite** sebagai jaring pengaman:
    ```cron
    30 2 * * * cp /www/wwwroot/ferhatmuhamad.web.id/database/database.sqlite /www/backup/database/portfolio-$(date +\%F).sqlite && find /www/backup/database -name 'portfolio-*.sqlite' -mtime +14 -delete
    ```
