//=======
// Package importing section
//=======
const express = require('express'),
    PORT = 120,
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    sharp = require('sharp'),
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
    
    let {userFile} = req.files,
        {mimetype} = userFile;
    //Check Image type
    if(mimetype != "image/jpeg" | mimetype != "image/png")
        return res.status(406).json({error: "Image type not supported! PNG or JPEG only"});
    
    try{
        sharp(userFile.data)
        .jpeg()
        .toFile('./upload/sharp.jpeg' , (err , info)=>{
            if(err)
                return res.status(406).json({error: err})
            else 
                return res.status(200).json({success: "Image has been stored!"})
        })
    //    await userFile.mv( `./upload/${userFile.name}` , (err)=>{
    //         if(err)
    //             console.log(err);
    //         console.log('File uploaded');
    //     });
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


