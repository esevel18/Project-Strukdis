const TRY_LIMITS = 100;

export default function randomLayout(vertices, width, height, radius, padding){
    let x, y;
    let safe = false;

    // kita coba generate random position
    for (let i = 0; i < TRY_LIMITS; i++) {
        // radius + random * padding agar tidak keluar dari svg + padding antar vertices
        x = radius + Math.random() * (width - 2 * radius) + padding;
        y = radius + Math.random() * (height - 2 * radius) + padding;

        // cek tabrakan antar vertex, jika tidak tabrakkan bisa langusng break
        safe = vertices.every(v => {
            const dx = v.x - x;
            const dy = v.y - y;
            // periksa jarak antar vertex apakah lebih besar dari luas lingkaran + padding
            return Math.sqrt(dx * dx + dy * dy) > 2 * radius + padding;
        });

        if (safe) break;
        // jika tabrakkan kita cari lagi posisi yang mumpuni
    }
    // return koordinat dalam bentuk object notation
    return { x, y };
}