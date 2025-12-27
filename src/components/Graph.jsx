import { useState } from "react";
import Form from "./Form";
import Vertex from "./Vertex";
import randomLayout from "../algorithm/RandomLayout";
import welshPowell from "../algorithm/WelshPowell";
import Edge from "./Edge";
import buildAdjMatrix from "../algorithm/BuildAdjMatrix";
import { useMemo } from "react";
import { useRef } from "react";
import { useEffect } from "react";

// const SVG_WIDTH = 900;
// const SVG_HEIGHT = 500;
const RADIUS = 25;
const PADDING = 4;
const MIN_DISTANCE = 200;

export default function Graph(){
    // mencoba membuat svg mengikuti div
    const containerRef = useRef(null);
    const [svgSize, setSvgSize] = useState({
        svg_width: 0,
        svg_height: 0,
    });

    // setiap kali ada render i.e div berubah
    useEffect(() => {
        const ref = containerRef.current;
        if (!ref) return;

        const ro = new ResizeObserver(([entry]) => {
            setSvgSize({
            svg_width: entry.contentRect.width,
            svg_height: entry.contentRect.height,
            });
        });

        ro.observe(ref);
        return () => ro.disconnect();
    }, []);
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
        const position = randomLayout(vertices, svgSize.svg_width, svgSize.svg_height, RADIUS, PADDING);

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
    const [frequencies, setFrequencies] = useState([]);
    const COLOR_CORRESPODENCE_WITH_FREQUENCIES = {
        "#c4b5a9ff" : "90Hz",
        "#6af104ff" : "90.2Hz",
        "#192cc0ff" : "90.4Hz",
        "#30750bff" : "90.6Hz",
        "#bc176fff" : "90.8Hz",
        "#06825bff" : "91Hz",
        "#a58bbbff" : "91.2Hz",
        "#d45bf5ff" : "91.4Hz",
        "#ffff" : "91.6Hz",
        "#727a06ff" : "91.8Hz",
        "#fc70b1ff" : "92Hz",
        "#234703ff" : "92.2Hz"
    }

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

        // set frequencies
        setFrequencies(
            vertices.map( v => {
                // find vertex di colors dengan id yang sama dengan v
                const c = colors.find(u => u.id === v.id);
                return{
                    id: c.id,
                    name: v.name,
                    color: c.color,
                    frequency: COLOR_CORRESPODENCE_WITH_FREQUENCIES[c.color]
                }
            })
        );
    };

    // clear button
    const handleOnClear = () => {
        setVertices([]);
        setChromaticNumber(0);
        setFrequencies([]);
    };

    return(
        <div className="graphwrapper">
            {/* form dengan props function -> {function} artinya pass referensi fungsi */}
            <div className="info">
                <div className="formWrapper">
                    <Form onAddVertex={addVertex} onVisualize={handleOnVisualize} onClear={handleOnClear}/>
                </div>
                <div className="chromaticFreqWrapper">
                    <p className="chromaticNumberDisplay">ChromaticNumber = {chromaticNumber ?? 0}</p>
                    <div className="frequencyAssignmentWrapper">
                        <p className="frequenciesTitle">Frequencies Assignment</p>
                        {
                            frequencies.map( (f, i) => (
                                <p key={i}>
                                    Tower "{f.name}" : {f.frequency}
                                </p>
                                )
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="containerSvg" ref={containerRef}>
                <svg 
                    className="svgPlaygroud"
                    onMouseUp={handleOnMouseUp}
                    onMouseMove={handleOnMouseMove}>
                        {/* {....} di html artinya masuk ke mode js dan tambahkan .... secara dynamic */}
                        {/* keluarkan semua isi dari edges ke svg */}
                        {
                            edges.map(
                                (edge) => { // untuk setiap edge di edges
                                    // temukan vertex u di vertices
                                    const u = vertices.find(u => u.id === edge.uID);
                                    // temukan vertex v di vertices
                                    const v = vertices.find(v => v.id === edge.vID);
                                    if (!u || !v) return null;

                                    return (
                                        <Edge
                                            key={edge.id}
                                            id={edge.is}
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
                                draggingID={draggingID}
                                />
                            ))
                        }
                </svg>
            </div>
        </div>
    )
}