import { useState } from "react"

// komponen form hanya untuk mengumpulkan input
// state dari setiap component (algoritma pembuatan vertex) akan kita proses sebagai group di parent component yaitu graph

// Form akan menerima function untuk add vertex yang bisa digunakan sebagai event handler dari button 
// add vertex
export default function Form({ onAddVertex, onVisualize, onClear }){
    const [vertexName, setVertexName] = useState("")

    return(
        <>
            <label className="labelVertex">
                Vertex: 
                <input 
                className="inputField"
                type = "text" 
                value = {vertexName} // ambil value dari input field
                placeholder="vertex name"
                onChange={(event) => {setVertexName(event.target.value)}} // setiap kali ada perubahan di input field kita rubah juga value dari vertexName
                />
            </label>
            <button className="addVertexButton" onClick = {() => {
                onAddVertex(vertexName);
                setVertexName("");
            }}>
                add vertex
            </button>
            <button className="visualizeButton" onClick={onVisualize}>visualize</button>
            <button className="clearButton" onClick={onClear}>clear</button>
        </>
    )
}