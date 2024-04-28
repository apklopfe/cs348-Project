import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddFamilyMember() {
    let navigate = useNavigate();

    const [familyMember, setFamilyMember] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
        phone: ""
    });

    const { name, email, age, gender, phone } = familyMember;

    const onInputChange = (e) => {
        setFamilyMember({ ...familyMember, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/familyMember", familyMember);
        navigate("/");
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className="text-center m-4">Register Family Member</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Name
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Name'
                                name='name'
                                value={name}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>
                                Email
                            </label>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Email Address'
                                name='email'
                                value={email}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Phone' className='form-label'>
                                Phone
                            </label>
                            <input
                                type='tel'
                                className='form-control'
                                placeholder='Phone Number'
                                name='phone'
                                value={phone}
                                onChange={(e) => onInputChange(e)}
                                pattern='(\([0-9]{3}\)[0-9]{3}-?[0-9]{4}|[0-9]{3}-?[0-9]{3}-?[0-9]{4})'
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Age' className='form-label'>
                                Age
                            </label>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Age'
                                name='age'
                                value={age}
                                onChange={(e) => onInputChange(e)}
                                required
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
                                required
                            >
                                <option value=''>Select Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
