import React, { Fragment, useState} from "react";
import axios from 'axios';

const EditListing = ({ listing }) => {
    const [file, setFile] = useState()
    const [info, setInfo] = useState({
        name: listing.name,
        description: listing.description,
    });
    const editListing = async() => {
        const formData = new FormData();
        formData.append("image", file);
        console.log("Ayo sup");
        formData.append("name", info.name);
        formData.append("description", info.description);
        try {
            const response = await axios.put('http://localhost:5000/Listings/' + listing.id, formData, {
                headers: {'Content-Type' : 'multipart/form-data'}
            });
            console.log("Ayo sup");
            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }
    const handleSubmit = async(submission) => {
        submission.preventDefault();
        await editListing();
        window.location = "/";
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
        <Fragment>
            <div className = "text-right">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target={'#id' + listing.id}>
                Edit
                </button>
            </div>
            <div class="modal" id={'id' + listing.id}>
            <div class="modal-dialog">
                <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Edit Listing</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">
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
                            <button className="btn btn-primary rounded">Submit</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </Fragment>
    )
};

export default EditListing;