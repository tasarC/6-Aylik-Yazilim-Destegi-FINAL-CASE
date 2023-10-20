import { useState,useEffect } from 'react'
import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Read() {
    const {id} = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/read/`+id)
            .then(res => 
                {console.log(res)
                setUser(res.data[0])
            })
            .catch(err => {
                console.error(err); // Hata durumunda veriyi boş bir dizi olarak ayarlayın
            });
    }, []);

  return (
    <div>
          
        <h1>{user.car_id}</h1>
        <h1></h1>
        <h1></h1>
        <h1></h1>
    </div>
  )
}

export default Read
