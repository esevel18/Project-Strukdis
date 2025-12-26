// vertex component, hanya untuk generate circle
// circle membutuhkan parameter object dengan variable:
// id, name, x, y, radius, dan warna

import { useState } from "react";

export default function Vertex({ id, name, x, y, r, color, onMouseDown }) {
    return( // render vertex
        <g>
            <circle 
            id={id} 
            cx={x} 
            cy={y} 
            r={r} 
            fill={color} 
            strokeWidth="2" 
            stroke="2"
            />
            <text x={x} y={y+4} textAnchor="middle" fontSize="14" style={{fontWeight : "bolder"}}>
                {name}
            </text>
            <circle
            id={id} 
            cx={x} 
            cy={y} 
            r={100} 
            fill="#0f7cf1df"
            strokeWidth="2" 
            stroke="2"
            opacity={0.2}
            onMouseDown={(event) => onMouseDown(event, id)}
            style={{cursor : "grab"}}>
            </circle>
        </g>
    )
}