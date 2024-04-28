import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

export default function ViewFamilyMember() {

    const [familyMember, setFamilyMember] = useState({
        name: "",
        username: "",
        email: "",
        age:"",
        gender:"",
        phone:""
    })

    const { id } = useParams();

    useEffect(() => {
        loadFamilyMember();
    }, [])

    const loadFamilyMember = async () => {
        const result = await axios.get(`http://localhost:8080/familyMember/${id}`)
        setFamilyMember(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className="text-center m-4">Family Member Details</h2>
                    <div className='card'>
                        <div className='card-header'>
                            Details of {familyMember.name}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Name: </b>
                                    {familyMember.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Family Username: </b>
                                    {familyMember.username}
                                </li>
                                <li className='list-group-item'>
                                    <b>Email: </b>
                                    {familyMember.email}
                                </li>
                                <li className='list-group-item'>
                                    <b>Phone: </b>
                                    {familyMember.phone}
                                </li>
                                <li className='list-group-item'>
                                    <b>Age: </b>
                                    {familyMember.age}
                                </li>
                                <li className='list-group-item'>
                                    <b>Gender: </b>
                                    {familyMember.gender}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={"/"}>Home</Link>
                </div>
            </div>
        </div>
    )
}
