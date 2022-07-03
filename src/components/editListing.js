import React, { Fragment, useState} from "react";

const EditListing = ({ listing }) => {
    const [info, setInfo] = useState({
        name: listing.name,
        description: listing.description,
        aws_key: listing.s3_key
    });
    const handleSubmit = async(submission) => {
        submission.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/Listings/' + listing.id, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(info)
            });
            console.log(response);
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleFormChange = (submission) => {
        const { name, value } = submission.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };
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