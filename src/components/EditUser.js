import React, { useState, useEffect, useCallback } from 'react';
import api from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [gender, setGender] = useState("Male");
const navigate = useNavigate();
const { id } = useParams();

const getUserById = useCallback(async () => {
    try {
    const response = await api.get(`/users/${id}`);
    setName(response.data.name || "");
    setEmail(response.data.email || "");
    setGender(response.data.gender || "Male");
    } catch (error) {
    console.error("Failed to fetch user:", error);
    }
    }, [id]);

    useEffect(() => {
    getUserById();
}, [getUserById]);

const updateUser = async (e) => {
    e.preventDefault();
    try {
    await api.patch(`/users/${id}`, {
        name,
        email,
        gender
    });
    navigate("/");
    } catch (error) {
    console.log(error);
    }
};

return (
    <div className="columns mt-5 is-centered">
    <div className="column is-half">
        <form onSubmit={updateUser}>
        <div className="field">
            <label className="label">Name</label>
            <div className="control">
            <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            />
            </div>
        </div>
        <div className="field">
            <label className="label">Email</label>
            <div className="control">
            <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            </div>
        </div>
        <div className="field">
            <label className="label">Gender</label>
            <div className="control">
            <div className="select is-fullwidth">
                <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
            </div>
            </div>
        </div>
        <div className="field">
            <button type="submit" className="button is-success">
            Update
            </button>
        </div>
        </form>
    </div>
    </div>
);
};

export default EditUser;
