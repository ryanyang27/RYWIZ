import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SubmissionPage() {
    const [file, setFile] = useState()
    const [info, setInfo] = useState({
        name: "",
        description: "",
        aws_key: ""
    });
    const navigate = useNavigate();
    const uploadImage = async() => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const response = await axios.post('http://localhost:5000/image', formData, {headers: {'Content-Type' : 'multipart/form-data'}});
            setInfo((prevInfo) => ({
                ...prevInfo,
                aws_key: response.data
            }));
        } catch (err) {
            console.error(err.message);
        }
    }
    const writeToDatabase = async() => {
        try {
            const response = await fetch("http://localhost:5000/Listings", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(info),
            });
        
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleSubmit = async(submission) => {
        submission.preventDefault();
        await uploadImage();
        console.log(info.aws_key);
        await writeToDatabase();
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
                    placeholder="School name"
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
                    placeholder="Description of your school"
                    onChange={handleFormChange}
                    rows="4" 
                    cols="100"
                    />
                    <br/>
                </div>
                <div className="d-flex">
                    <p className="mr-5 font-weight-bold">Image:</p>  
                    <input
                    type="file"
                    name="schoolImage"
                    onChange={fileUploaded}
                    />
                </div>
                <div className="text-right">
                    <button className="btn btn-primary rounded-5">Submit</button>
                </div>
            </form>
            <button onClick={() => {console.log(info.aws_key)}}></button>
        </div>
    </div>
    )
}
export default SubmissionPage;