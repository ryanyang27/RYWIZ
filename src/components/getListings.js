import React, {Fragment, useState, useEffect} from "react";
import EditListing from "./editListing";
import "./getListings.css";

const GetListings = () => {
    const [listings, setListings] = useState([]);
    const getListings = async() => {
        try {
            const response = await fetch("http://localhost:5000/Listings");
            const jsonData = await response.json();
            setListings(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getListings();
    }, []);
    return (
        <div>
            <div className="d-flex">
                <div>
                </div>
                <div>

                </div>
            </div>
            {listings.map(listings => (
                <Fragment key={listings.id}>
                    <div className = "d-flex justify-content-center mt-5">
                        <div className ="d-flex justify-content-end w-25">
                            <img src={"http://localhost:5000/image/" + listings.s3_key} alt="" className = "rounded outline"width={250} height={250}></img>
                        </div>
                        <div className ="w-50 outline">
                            <div className = "d-flex justify-content-between">
                                <h2 className = "mt-4 ml-4">
                                    {listings.name}
                                </h2>
                                <div className = "mt-4 mr-4">
                                    <EditListing listing = {listings}/>
                                </div>
                            </div>
                            <div className = "d-flex justify-content-start">
                                <p className = "ml-4">
                                    {listings.description} 
                                </p>
                            </div>
                        </div>
                    </div>
                </Fragment>
            ))}
        </div>
)};

export default GetListings;