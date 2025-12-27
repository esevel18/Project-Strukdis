export default function welshPowell(adjMatrix) {
    if (adjMatrix.length == 0) return [];

    const matrixLength = adjMatrix.length;

    // penerapan welsh powell
    // 1. hitung degree dari setiap vertex
    let vertexDegree = adjMatrix.map((row, id) => {
        let degree = 0;

        for (const connection of row) {
            if (connection == 1) degree++;
        }

        return { id: id, degree: degree }
    });

    // 2. urutkan vertex berdasarkan degreenya secara menurun
    vertexDegree.sort((a, b) => b.degree - a.degree);

    // 3. warnai vertex dengan degree terbanyak dan vertex yang tidak bertetangga dengan vertex saat ini
    // 4. ulangi proses 3 sampai semau vertex diberi warna
    const result = new Array(matrixLength).fill(null);
    let colouredCount = 0;
    let currentColour = 1; 

    while (colouredCount < matrixLength) {
        const current = [];

        for (let i = 0; i < matrixLength; i++) {
            const vertex = vertexDegree[i];

            if (result[vertex.id] == null) {
                let canBeColoured = true;

                for (let colouredVertexId of current) {
                    if (adjMatrix[vertex.id][colouredVertexId] == 1) {
                        canColour = false;
                        break;
                    }
                }

                if (canBeColoured) {
                    result[vertex.id] = currentColour;
                    current.push(vertex.id);
                    currentColour++;
                }
            }
        }

        currentColour++;
    }

    // return type harus berupa array of obecjt dengan inis {idVertex: id, color: c} 
    return result.map((color, id) => ({ idVertex: id, color: color }));
}