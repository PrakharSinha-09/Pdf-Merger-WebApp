const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const multer  = require('multer')
const {mergePdfs}  = require('./merge')           //used destructuring to get the required function
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/merge', upload.array('pdfs', 15),async (req, res, next)=> {                             //15 passed inside is the maximum page count            
    console.log(req.files)                                                        //Reference: Express Multer 
    let d=await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
    // res.send({data:req.files})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})  