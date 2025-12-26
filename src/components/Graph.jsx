import { useState } from "react";
import Form from "./Form";
import Vertex from "./Vertex";
import randomLayout from "../algorithm/RandomLayout";
import welshPowell from "../algorithm/WelshPowell";
import Edge from "./Edge";
import buildAdjMatrix from "../algorithm/BuildAdjMatrix";
import { useMemo } from "react";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 500;
const RADIUS = 25;
const PADDING = 4;
const MIN_DISTANCE = 200;

export default function Graph(){
    // Add vertex mechanism
    // grouping vertex jadi satu kumpulan (array berisi object)
    const [vertices, setVertices] = useState([]);

    const addVertex = (vertexName) => { 
        // tidak ada vertexName
        if(!vertexName.trim()) return;
        // cek apakah sudah pernah digunakan ?
        if(vertices.some(v => v.name === vertexName)){
            alert("Nama Vertex Sudah Ada");
            return;
        }
        // cari posisi random yang available
        const position = randomLayout(vertices, SVG_WIDTH, SVG_HEIGHT, RADIUS, PADDING);

        // buat vertex sesuai posisi yang kita generate
        const newVertex = {
            id: vertices.length,
            name: vertexName,
            x: position.x,
            y: position.y,
            r: RADIUS,
            color: "#646464ff"
        }

        setVertices([...vertices, newVertex]);
    };

    // Dragging mechanism for vertex 
    // ingat kita melakukan manaement vertex secara group, artinya ketika kita mau melakukan perubahan pada vertex
    // kita harus melakuakn perubahan pada group vertex itu

    // dragging mechanism biasanya ada 3 hal, yaitu ketika mouse down lalu ia bergerak dan mouse up/released
    const [draggingID, setDraggingID] = useState(null);
    const [offset, setOffset] = useState({x: 0, y: 0});

    const handleMouseDown = (event, id) => {
        const v = vertices.find(v => v.id == id);
        setDraggingID(id);
        // hitung jarak pusat dengan posisi mouse
        setOffset({
            x: event.clientX - v.x,
            y: event.clientY - v.y
        });
    };

    const handleOnMouseUp = () => {
        setDraggingID(null);
    };

    const handleOnMouseMove = (event) => {
        if(draggingID === null) return;
        setVertices( prev => 
            prev.map(vertex => {
                return vertex.id === draggingID ?
                {
                    ...vertex, // copy semua property dari vertex sebelumnya
                    // lakukan update pada x dan y
                    x: event.clientX - offset.x, // hitung perpindahan mouse secara horizontal
                    y: event.clientY - offset.y // hitung perpindahan mouse secara vertical
                } : vertex
            })
        );
    };

    // welsh powel visualisation
    // 1. buat adj matrix
    // 2. buat edge
    // 3. jalankan algoritma
    const edges = useMemo(() => {
        const adjMatrix = buildAdjMatrix(vertices, MIN_DISTANCE); // buat adj
        const buildEdge = [];
        for(let i = 0; i < adjMatrix.length; i++){ // buat edge
            for(let j = i+1; j < adjMatrix.length; j++){ // menghindari sisi ganda, pake i+1 linear check
                if(adjMatrix[i][j] === 1){
                    buildEdge.push({
                        id: buildEdge.length,
                        uID: vertices[i].id,
                        vID: vertices[j].id
                    });
                }
            }
        }
        return buildEdge;
    }, [vertices]); 
    
    const [chromaticNumber, setChromaticNumber] = useState(null);
    const handleOnVisualize = () => {
        const adjMatrix = buildAdjMatrix(vertices, MIN_DISTANCE);
        const {colors, chromaticNumber} = welshPowell(adjMatrix);

        // update state warna dari vertex
        setVertices(prev => // loop ke vertices
            prev.map(v => { // vertex property sekarang
                const colored = colors.find(c => c.id === v.id);
                return colored ? {...v, color: colored.color} : v;
            })
        );

        // set chromaticNumber
        setChromaticNumber(chromaticNumber);
    };

    // clear button
    const handleOnClear = () => {

    };

    return(
        <div>
            {/* form dengan props function -> {function} artinya pass referensi fungsi */}
            <Form onAddVertex={addVertex} onVisualize={handleOnVisualize}/>
            <p>ChromaticNumber = {chromaticNumber}</p>
            <svg 
            width={SVG_WIDTH} 
            height={SVG_HEIGHT}
            onMouseUp={handleOnMouseUp}
            onMouseMove={handleOnMouseMove}>
                {/* {....} di html artinya masuk ke mode js dan tambahkan .... secara dynamic */}
                {/* keluarkan semua isi dari edges ke svg */}
                {
                    edges.map(
                        (edge) => { // untuk setiap edge di edges
                            // temukan vertex u
                            const u = vertices.find(u => u.id === edge.uID);
                            // temukan vertex v
                            const v = vertices.find(v => v.id === edge.vID);
                            if (!u || !v) return null;

                            return (
                                <Edge
                                    key={edge.id}
                                    x1={u.x}
                                    y1={u.y}
                                    x2={v.x}
                                    y2={v.y}
                                />
                            );
                        }
                    )
                }
                {/* keluarkan semua isi dari vertices ke svg */}
                {
                    vertices.map(
                        (v, i) => (
                        <Vertex 
                        key={i} 
                        id={v.id}
                        name={v.name} 
                        x={v.x} 
                        y={v.y} 
                        r={v.r} 
                        color={v.color}
                        onMouseDown={handleMouseDown}
                        />
                    ))
                }
            </svg>
        </div>
    )
}