import React from 'react'
import {useParams} from "react-router-dom"
function Viewpdf() {
    const {id} = useParams();
    const src1 = "http://localhost:5000/" + id+".pdf"
    console.log(src1)
    return (
        <div>
        <embed src={src1} width="800px" height="2100px" />
        </div>
    )
}

export default Viewpdf
