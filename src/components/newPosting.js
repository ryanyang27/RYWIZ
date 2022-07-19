import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SubmissionPage() {
    const [file, setFile] = useState()
    const [info, setInfo] = useState({
        name: "",
        description: ""
    });
    const navigate = useNavigate();
    const uploadListing = async() => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", info.name);
        formData.append("description", info.description);
        try {
            const response = await axios.post('http://localhost:5000/Listings', formData, {
                headers: {'Content-Type' : 'multipart/form-data'}
            });
        } catch (err) {
            console.error(err.message);
        }
    }
    const handleSubmit = async(submission) => {
        submission.preventDefault();
        await uploadListing();
        navigate('/');
    };

    const handleFormChange = (submission) => {
        const { name, value } = submission.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };
    const fileUploaded = (event) => {
        const file = event.target.files[0];
        setFile(file);
    }

    
    return (
    <div className = "d-flex justify-content-center align-items-center flex-column text-left">
        <div>
            <h1>Create a listing</h1>
            <form onSubmit = {handleSubmit}>
                <div className="d-flex">
                    <p className="mr-5 font-weight-bold">Name:</p> 
                    <textarea
                    type="text"
                    value={info.name}
                    required
                    name="name"
                    placeholder="Name"
                    onChange={handleFormChange}
                    rows = "1"
                    cols = "100"
                    />
                    <br/>
                </div>
                <div className="d-flex">
                    <p className="mr-5 font-weight-bold">About:</p> 
                    <textarea
                    className = "rounded-10"
                    type="text"
                    value={info.description}
                    required
                    name="description"
                    placeholder="Description of your product"
                    onChange={handleFormChange}
                    rows="4" 
                    cols="100"
                    />
                    <br/>
                </div>
                <div className="d-flex">
                    <p className="mr-5 font-weight-bold">Image:</p>  
                    <input
                    required
                    type="file"
                    name="image"
                    onChange={fileUploaded}
                    />
                </div>
                <div className="text-right">
                    <button className="btn btn-primary rounded-5">Submit</button>
                </div>
            </form>
        </div>
    </div>
    )
}
export default SubmissionPage;