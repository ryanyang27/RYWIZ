const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

const {uploadFile, getFileStream, deleteFile} = require('./s3access.js')


app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("server has started on port 5000");
});

//Create a Listing

app.post("/Listings", async(req, res) => {
    try {   
        const {name, description, aws_key} = req.body;
        const newListing = await pool.query(
            "INSERT INTO listings (name, description, s3_key) VALUES($1, $2, $3) RETURNING *", 
            [name, description, aws_key]
        );
        res.json(newListing.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Get all Listings
app.get("/Listings", async(req, res) => {
    try {   
        const {name, description} = req.body;
        const Listings = await pool.query(
            "SELECT * FROM listings", 
        );

        res.json(Listings.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Edit a Listing
app.put("/Listings/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { name, description, aws_key} = req.body;
        const editListing = await pool.query(
            "UPDATE listings SET name = $1, description = $2, s3_key = $3 WHERE id = $4",
            [name, description, aws_key, id]
        );
        res.json("Listing was updated!")
    } catch (err) {
        console.error(err.message);
    }
})

//Upload an Image
app.post('/image', upload.single('image'), async(req, res) => {
    const file = req.file;
    try {
        const result = await uploadFile(file);
        res.send(result.Key);

    } catch(err) {
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