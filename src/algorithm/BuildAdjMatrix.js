export default function buildAdjMatrix(vertices, MIN_DISTANCE){
    // vertices berisi array of obejct of vertex
    // [{id, name, x, y, r, color}, {....}]
    // buat jadi adj matrix
    // 1. hitung jarak antara vertexnya
    // 2. asumsikan radius aura pancaran sinyal adalah 200km (1px dalam web mewakili 1km)
    //    jika jarak antara vertex <= 200px, maka edge akan terbentuk i.e saling bertetangga 
    //    untuk menghilangkan intervensi antara tower
    // 3. kita akan buat adjacancy matrix berdasarkan informasi dari nomor 2
    // 4. dari adjacancy matrix itulah kita akan menerapkan graph coloring welsh powell

    let adjMatrix = [];
    for(let i = 0; i < vertices.length; i++){
        let tmp = []
        for(let j = 0; j < vertices.length; j++){
            const distance = Math.sqrt(
                Math.pow(vertices[i].x - vertices[j].x, 2) + 
                Math.pow(vertices[i].y - vertices[j].y, 2)
            );
            tmp.push((distance <= MIN_DISTANCE && i !== j) ? 1 : 0);
        }
        adjMatrix.push(tmp);
    }
    return adjMatrix;
}