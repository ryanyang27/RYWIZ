const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

const {uploadFile, getFileStream, deleteFile} = require('./s3access.js');
const e = require('express');


app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("server has started on port 5000");
});

//Create a Listing

app.post("/Listings", upload.single('image'), async(req, res) => {
    try { 
        const {name, description} = req.body;
        const file = req.file
        const result = await uploadFile(file);
        const newListing = await pool.query(
            "INSERT INTO listings (name, description, s3_key) VALUES($1, $2, $3) RETURNING *", 
            [name, description, result.Key]
        );
        res.json(newListing.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Get all Listings
app.get("/Listings", async(req, res) => {
    try {   
        const Listings = await pool.query(
            "SELECT * FROM listings", 
        );

        res.json(Listings.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Edit a Listing
app.put("/Listings/:id", upload.single('image'), async(req, res) => {
    try {
        const { id } = req.params;  
        const {name, description} = req.body;
        if (req.file) {
            const file = req.file
            const result = await uploadFile(file);
            const editListing = await pool.query(
                "UPDATE listings SET name = $1, description = $2, s3_key = $3 WHERE id = $4", 
                [name, description, result.Key, id]
            );
        } else if (!req.file) {
            const editListing = await pool.query(
                "UPDATE listings SET name = $1, description = $2 WHERE id = $3", 
                [name, description, id]
            );
        }    
        res.json("Listing was updated!")
    } catch (err) {
        console.error(err.message);
    }
})


//Retrieve an Image
app.get('/image/:key', (req, res) => {
    console.log(req.params)
    const key = req.params.key
    const readStream = getFileStream(key);

    readStream.pipe(res);
})

//Delete an Image
app.delete('/deleteimage/:key', (req, res) => {
    const key = req.params.key;
    deleteFile(key);
})