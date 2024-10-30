//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';


//import axios
import axios from 'axios';
import Datauser from './Datauser';
import { Link } from 'react-router-dom/cjs/react-router-dom';


function Dashboard() {

    //state user
    const [user, setUser] = useState({});
    
    const [loading, setLoading] = useState(true);

    //define history
    const history = useHistory();

    //token
    const token = localStorage.getItem("token");

    //function "fetchData"
    const fetchData = async () => {

        try{
            setLoading(true);
            //set axios header dengan type Authorization + Bearer token
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            //fetch user from Rest API
            await axios.get('http://localhost:8000/api/user')
            .then((response) => {
                //set response user to state
                setUser(response.data);
            })
        } finally {
            setLoading(false);
        }
    }

    //hook useEffect
    useEffect(() => {
        
            fetchData();
        
       
    }, []);

    //function logout
    const logoutHanlder = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch Rest API
        await axios.post('http://localhost:8000/api/logout')
        .then(() => {

            //remove token from localStorage
            localStorage.removeItem("token");

            //redirect halaman login
            history.push('/');
        });
    };

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <div className='d-flex justify-content-between mb-3'>
                                <div>
                                    SELAMAT DATANG <strong className="text-uppercase"> { loading ? ('...') : user.name}</strong>
                                </div>
                                <button onClick={logoutHanlder} className="btn btn-md btn-danger">LOGOUT</button>
                            </div>

                            <div className='card card-body'>
                                <div className="text-end mb-3">
                                    <Link to="/create" className="btn btn-primary w-auto">Create</Link>
                                </div>

                                <div className='table-responsive'>
                                    <table className='table table-bordered table-sm table-hover'>
                                        <thead>
                                            <tr className='text-center'>
                                                <th>No</th>
                                                <th>Nama</th>
                                                <th>Email</th>
                                                <th>Opsi</th>
                                            </tr>
                                        </thead>
                                        <Datauser />
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Dashboard;