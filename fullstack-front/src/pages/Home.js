import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
    const [familyMembers, setFamilyMembers] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // Default to ascending order
    const [displayOptions, setDisplayOptions] = useState({
        name: true,
        email: true,
        age: true,
        gender: true,
        phone: true
    });
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');

    useEffect(() => {
        loadFamilyMembers();
    }, []);

    const loadFamilyMembers = async () => {
        const result = await axios.get('http://localhost:8080/familyMember');
        setFamilyMembers(result.data);
    };

    const deleteFamilyMember = async (id) => {
        await axios.delete(`http://localhost:8080/familyMember/${id}`);
        loadFamilyMembers();
    };

    const handleSortChange = (e) => {
        const selectedOption = e.target.value;
        if (selectedOption === sortOption) {
            // Toggle sort order if the same option is selected again
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Reset sort order to ascending when a different option is selected
            setSortOption(selectedOption);
            setSortOrder('asc');
        }
    };

    const handleDisplayOptionChange = (e) => {
        const { name, checked } = e.target;
        setDisplayOptions({ ...displayOptions, [name]: checked });
    };

    const handleMinAgeChange = (e) => {
        setMinAge(e.target.value);
    };

    const handleMaxAgeChange = (e) => {
        setMaxAge(e.target.value);
    };

    const filterByAgeRange = (members) => {
        return members.filter((member) => {
            if (minAge && maxAge) {
                return member.age >= parseInt(minAge) && member.age <= parseInt(maxAge);
            } else if (minAge) {
                return member.age >= parseInt(minAge);
            } else if (maxAge) {
                return member.age <= parseInt(maxAge);
            }
            return true;
        });
    };

    const sortFamilyMembers = (members) => {
        const compareFunction = (a, b) => {
            if (sortOrder === 'asc') {
                return a[sortOption] > b[sortOption] ? 1 : -1;
            } else {
                return a[sortOption] < b[sortOption] ? 1 : -1;
            }
        };
        return [...members].sort(compareFunction);
    };

    const filteredFamilyMembers = filterByAgeRange(sortFamilyMembers(familyMembers));

    return (
        <div className='container'>
            <div className='py-4'>
                <div className='mb-3' style={{ marginBottom: '20px' }}>
                    <label style={{ marginRight: '10px' }}>Sort By:</label>
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        style={{ marginRight: '10px', padding: '5px' }}
                    >
                        <option value=''>None</option>
                        <option value='age'>Age</option>
                        <option value='name'>Name</option>
                    </select>
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        {sortOrder === 'asc' ? 'Sort Desc' : 'Sort Asc'}
                    </button>
                </div>

                <div className='mb-3' style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Display Options:</span>
                    {Object.keys(displayOptions).map((option) => (
                        <label key={option} style={{ marginRight: '10px', fontSize: '14px' }}>
                            <input
                                type='checkbox'
                                name={option}
                                checked={displayOptions[option]}
                                onChange={handleDisplayOptionChange}
                                style={{ marginRight: '5px' }}
                            />
                            {option}
                        </label>
                    ))}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ marginRight: '10px' }}>Min Age:</label>
                    <input type='number' value={minAge} onChange={handleMinAgeChange} style={{ marginRight: '10px', padding: '5px' }} />
                    <label style={{ marginRight: '10px' }}>Max Age:</label>
                    <input type='number' value={maxAge} onChange={handleMaxAgeChange} style={{ marginRight: '10px', padding: '5px' }} />
                </div>

                <table className='table border shadow'>
                    <thead>
                        <tr>
                            {displayOptions.name && <th scope='col'>Name</th>}
                            {displayOptions.email && <th scope='col'>Email</th>}
                            {displayOptions.age && <th scope='col'>Age</th>}
                            {displayOptions.gender && <th scope='col'>Gender</th>}
                            {displayOptions.phone && <th scope='col'>Phone</th>}
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFamilyMembers.map((familyMember, index) => (
                            <tr key={index}>
                                {displayOptions.name && <td>{familyMember.name}</td>}
                                {displayOptions.email && <td>{familyMember.email}</td>}
                                {displayOptions.age && <td>{familyMember.age}</td>}
                                {displayOptions.gender && <td>{familyMember.gender}</td>}
                                {displayOptions.phone && <td>{familyMember.phone}</td>}
                                <td>
                                    <Link className='btn btn-primary mx-2' to={`/viewfamilymember/${familyMember.id}`}>
                                        View
                                    </Link>
                                    <Link className='btn btn-outline-primary mx-2' to={`/editfamilymember/${familyMember.id}`}>
                                        Edit
                                    </Link>
                                    <button className='btn btn-danger mx-2' onClick={() => deleteFamilyMember(familyMember.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
