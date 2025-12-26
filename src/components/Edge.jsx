// komponen edge
// menerima object notation yang divariablekan dengan parameter;
// x1, y1, x2, y2 -> semuanya berupa int
export default function Edge({ id, x1, y1, x2, y2 }){
    return ( // render line
        <line id={id} x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="2"/>
    );
};
