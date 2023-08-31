const express=require("express");
const app=express();
const path=require("path");
const port=2000;
const multer  = require('multer');
const {pdfMerger} = require("./pdf");
const upload = multer({ dest: 'uploads/' })

app.use('/static',express.static('public'));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"template/index.html"));
})



app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
    // console.log(req.files);
    try{
        let d=await pdfMerger(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path));
        res.redirect(`/static/${d}.pdf`);
        next();
    }
    catch(err)
    {   
        console.log("Not able to merge pdf"+err);
    }
   
   
  })

app.listen(port,()=>{
    console.log(`App listening on port http://localhost:${port}`);
})