const COLOR_PALATTE = [
    "#c4b5a9ff",
    "#6af104ff",
    "#192cc0ff",
    "#30750bff",
    "#bc176fff",
    "#06825bff",
    "#a58bbbff",
    "#d45bf5ff",
    "#ffff",
    "#727a06ff",
    "#fc70b1ff",
    "#234703ff"
];

export default function welshPowell(adjMatrix){
    // penerapan welsh powell
    // 1. hitung degree dari setiap vertex
    let listOfVertex = [];
    for(let i = 0; i < adjMatrix.length; i++){
        let degree = 0;
        for(let j = 0; j < adjMatrix.length; j++){
            if(adjMatrix[i][j] === 1) degree++;
        }
        listOfVertex.push({
                id : i, 
                degree : degree, 
                color: null
            }
        );
    }

    // 2. urutkan vertex berdasarkan degreenya secara menurun
    listOfVertex.sort((a, b) => b.degree - a.degree);
    // 3. warnai vertex dengan degree terbanyak yang belum
    // diwarnai serta vertex tidak bertetangga dengan vertex yang sudah diwarnai dengan warna saat ini
    // 4. ulangi proses 3 sampai semau vertex diberi warna
    // inti welsh powell -> warna ini bisa digunakan untuk berapa banyak vertex (jumlah maksimum)
    let colorIndex = 0;
    for(let i = 0; i < listOfVertex.length; i++){
        // jika sudah diwarnai, maka lanjut
        if(listOfVertex[i].color !== null) continue;
        // jika belum maka warnai pakai warna sekarang
        const currentColor = COLOR_PALATTE[colorIndex];
        listOfVertex[i].color = currentColor;

        // simpan vertex sekarang sebagai vertex yang sudah diwarnai dengan warna ini
        const coloredSet = [listOfVertex[i]];

        for(let j = i + 1; j < listOfVertex.length; j++){
            if(listOfVertex[j].color !== null) continue;

            // cek konflik dengan semua vertex di colored set (warna ini)
            const conflict = coloredSet.some(v => adjMatrix[v.id][listOfVertex[j].id] === 1);

            if(!conflict){
                listOfVertex[j].color = currentColor;
                coloredSet.push(listOfVertex[j]);
            }
        }
        colorIndex++;
    }

    const chromaticNumber = new Set(
        listOfVertex.map(v => v.color)
    ).size;

    // return type harus berupa array of object dengan isi {colors: listOfVertex, chromatic}
    return {
        colors: listOfVertex,
        chromaticNumber
    };
}