//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';

function Datauser() {

    const history = useHistory();

    const [users, setUsers] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if(!token){
            history.push('/')
        }
        fetchData()
    }, []);

    const fetchData = async () => {
        // set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        // fetch user from Rest API
        await axios.get('http://localhost:8000/api/users')
        .then((response) => {

            // set response user to state
            setUsers(response.data.data);
        })
    }

    return (
        
            <tbody>
                {users.map((data) => (
                    <tr key={data.id}>
                        <th className='text-center'>{data.id}</th>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        
    )

}

export default Datauser;