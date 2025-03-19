import express from'express';


const app = express();
const port = 3000;


app.get('/', (req,res) => {
    res.send('<h1>Inventory Management System</h2>')
})
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})