const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const fs = require('fs')
const jsdom = require('jsdom');
const { parse } = require('path');
const { JSDOM } = jsdom;
const port = 3007
let jsonData = []; 
app.use(express.static('Assignment10'))
app.use(bodyParser.json())

//read the already created json file and save it to jsonData variable
fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    jsonData = JSON.parse(data);
    //console.log(jsonData)
});

//gets to the main page
app.get('/', (req, res) => {
    const myPage = fs.readFileSync('../pages/index.html', 'utf8');
    res.setHeader('Content-Type', 'text/html'); // Set Content-Type header
    res.send(myPage);
  });

//handles the post request for adding into the file system.
app.post('/api/json/:ID',(req,res)=>{
    const id = parseInt(req.params.ID); 
    const data = req.body;
    const newData = {
        "id": id,
        "data": data
    };
    jsonData.push(newData);
    //console.log(jsonData);
    fs.writeFileSync('./data.json',JSON.stringify(jsonData),'utf8', (err) => {
        if (err) {
            console.log("Error writing file:", err);
            return;
        }
        console.log("Data added successfully.");
    });
    console.log('Received data for ID:', id);
  });

//API route to the JSON data.
app.get('/api/json/:ID',(req,res)=>{
    const id = parseInt(req.params.ID);
    const apiJSON = jsonData.find(item => item.id === id);
    if(!apiJSON){
        res.send("404 Error Not Found")
    }
    res.json(apiJSON.data);
});

//Route to the previously created json for updating and deleting.
app.get('/json/:ID',(req,res)=>{
    const id = parseInt(req.params.ID)
    console.log("logging on page with id:", id)
    const myPage = fs.readFileSync('../pages/update.html', 'utf8');
    const dom = new JSDOM(myPage);
    const document = dom.window.document;
    const jsonAPIData = document.getElementById("preJsonData");
    const apiID = jsonData.find(item => item.id === id);
    if(!apiID){
        res.send("404 Error")
    }
    else
    {
        jsonAPIData.innerHTML = JSON.stringify(apiID.data);
        res.send(dom.serialize());
}
})

//Handle the update post request.
app.post('/json/:ID',(req,res)=>{
    const id = parseInt(req.params.ID); 
    const newData = req.body;
    console.log(JSON.stringify(jsonData));
    const index = jsonData.findIndex(item => item.id === id);
    jsonData[index].data = newData;
    console.log(JSON.stringify(jsonData));
    fs.writeFileSync('./data.json',JSON.stringify(jsonData),'utf8', (err) => {
        if (err) {
            console.log("Error writing file:", err);
            return;
        }
        console.log("Data added successfully.");
    });
    console.log('Updated data for ID:', id);
  });
  //Handle the delete request.
  app.delete('/json/:ID',(req,res)=>{
    const id = parseInt(req.params.ID); 
    console.log(JSON.stringify(jsonData));
    const index = jsonData.findIndex(item => item.id === id);
    jsonData.splice(index, 1);
    console.log(JSON.stringify(jsonData));
    fs.writeFileSync('./data.json',JSON.stringify(jsonData),'utf8', (err) => {
        if (err) {
            console.log("Error writing file:", err);
            return;
        }
        console.log("Data added successfully.");
    });
    console.log('Deleted ID:', id);
  });
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

 
