//=======
// Package importing section
//=======
const express = require('express'),
    PORT = 100,
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload');

//========
// Middleware
//========
app.use(express.json());
// default options
app.use(fileUpload());

//--------
// CORS CFG 
//--------
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.get('/' , (req , res)=>{
    res.send("okay");
})
app.post("/image_upload" ,async (req , res)=>{
    console.log();
    let userFile = req.files.userFile;
    try{
       await userFile.mv( `./upload/${userFile.name}` , (err)=>{
            if(err)
                console.log(err);
            console.log('File uploaded');
        });
    }catch(e){
        console.log("error" , e);
    }
})
//=======    
// local listing 
//=======
app.listen(PORT, () => {
    console.log(`✔ Server start running on Port:${PORT}`);
})


