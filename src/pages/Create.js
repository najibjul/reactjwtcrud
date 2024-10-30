//import hook react
import React, { useState} from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Button, Modal } from 'react-bootstrap';


function Create() {

    const token = localStorage.getItem("token");

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const store = async (e) => {        
        e.preventDefault();

        setShow(false);

        const formData = new FormData();

        formData.append('name', name)
        formData.append('email', email)

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        await axios.post('http://localhost:8000/api/users', formData)
            .then(() => {
                
                history.push('/dashboard')

            })
            .catch(error => {
                
                //set errors response to state "errors"
                setErrors(error.response.data);
            })

    }
    

    return (
        <>
            <div className='container mt-5'>
                <div className='card shadow'>
                    <div className='card-header'>
                        <div className='d-flex justify-content-between'>
                            <h3>Create User</h3>
                            <Link to="/dashboard" className='btn btn-warning mt-1'>Back</Link>
                        </div>
                    </div>
                    {/* <form onSubmit={store}> */}
                        <div className='card-body'>
                            <div className='mb-3'>
                                <label htmlFor='name'>Name</label>
                                <input type='text' className='form-control mt-2' onChange={(e) => setName(e.target.value)} placeholder='Type name here...' id='name' autoFocus />
                                {
                                    errors.name && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.name[0]}
                                        </div>
                                    )
                                }
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='email'>Email</label>
                                <input type='email' className='form-control mt-2' onChange={(e) => setEmail(e.target.value)} placeholder='Type email here...' id='email' />
                                {
                                    errors.email && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.email[0]}
                                        </div>
                                    )
                                }
                            </div>

                            <Button variant="primary" onClick={handleShow}>
                                Save
                            </Button>

                            <Modal show={show} onHide={handleClose} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Save data?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button type="submit" variant="primary" onClick={store}>
                                        Yeayyy
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    {/* </form> */}
                </div>
            </div>
        </>
    )

}

export default Create;