import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';


export default function EditFamilyMember() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [familyMember, setFamilyMember] = useState({
        name: "",
        username: "",
        email: "",
        age:"",
        gender:"",
        phone:""
    })

    const { name, email, age, gender, phone } = familyMember;

    const onInputChange = (e) => {
        setFamilyMember({ ...familyMember, [e.target.name]: e.target.value })
    };

    useEffect(() => {
        loadFamilyMember();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/familyMember/${id}`, familyMember);
        navigate("/");
    };

    const loadFamilyMember = async () => {
        const result = await axios.get(`http://localhost:8080/familyMember/${id}`)
        setFamilyMember(result.data)
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className="text-center m-4">Edit Family Member</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Name
                            </label>
                            <input
                                type={'text'}
                                className='form-control'
                                placeholder='Name'
                                name='name'
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>
                                Email
                            </label>
                            <input
                                type={'text'}
                                className='form-control'
                                placeholder='Email Address'
                                name='email'
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Phone' className='form-label'>
                                Phone
                            </label>
                            <input
                                type={'text'}
                                className='form-control'
                                placeholder='Phone Number'
                                name='phone'
                                value={phone}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Age' className='form-label'>
                                Age
                            </label>
                            <input
                                type={'text'}
                                className='form-control'
                                placeholder='Age'
                                name='age'
                                value={age}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Gender' className='form-label'>
                                Gender
                            </label>
                            <select
                                className='form-select'
                                name='gender'
                                value={gender}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option value=''>Select Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Apache Attack Helicopter</option>
                            </select>
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
