import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"
import Spinner from "../layout/Spinner"
import { setAlert } from '../../actions/alert.js';
import axios from "axios"
import {Link} from "react-router-dom"


function Reviewpdf({setAlert}) {

    const [loading, setLoading] = useState("true");

    const [res, setRes] = useState([])

    useEffect(() => {

        const getpdf = async () => {
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer " + localStorage.token,
                },
              };
    
    
              try{
                const  result = await axios.get('http://127.0.0.1:5000/admin/getpdf', config)
                
                setRes([...result.data])
                
                setLoading("false")
              }
                catch(err){
                 
                  setAlert(err.response.data.message, "danger")
              }
        }

        getpdf();
        
    }, [])

    const verifyogn = async (id) => {
        console.log(id)
        console.log(res)
        const config = {
            headers: {
                'Content-Type': 'application/json',
              'Authorization': "Bearer " + localStorage.token,
            },
          };

        try{
        
        const result = await axios.post(`http://127.0.0.1:5000/admin/verifyogn`, {id}, config)
        setAlert(result.data.message, "success")
        setRes(res.filter((r) => r._id !== id))
        }
        catch(err){
                console.log("error")
        }

    }
    

    return loading === "true" ? <Spinner /> : (
        <div style={{display:"flex", justifyContent:"space-evenly"}}>
            <table>
                <tr>
                    <th>S.no</th>
                    <th>Ngo name</th>
                    <th>click link to view the pdf</th>
                    <th>Click me to Verify the NGO</th>
                </tr>

            {
                res.map((r, i) => {
                    return(
                        <tr>
                            <th>{i}</th>
                            <th>{r.name}</th>
                            <th><Link to={"/viewpdf/" + r.document.split('.')[0]}>click me</Link></th>
                            <th><a href="#" onClick={()=>verifyogn(r._id)}>click me</a></th>
                        </tr>    
                    )
                })
            }
            </table>
        </div>
    )
}

export default connect(null, {setAlert})(Reviewpdf)
