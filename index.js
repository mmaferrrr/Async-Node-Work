const express = require('express');
const bodyParser = require('body-parser');

let db = [];

const app = express();
app.use(bodyParser.json());

// async function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//await can only be used with async fucntions
app.get('/api/data',  async (req,res) => {
    await delay (1000);
    res.json(db);
});

app.post('/api/data', async (req,res) => {
    const { name, age } = req.body;
    const id = Date.now();
    await delay(500);
    db.push({ id,...req.body });
    res.status(201).json({ message: "Entry added", data: db[db.length - 1] });
});

app.put('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    const index = db.findIndex(entry => entry.id === Number(id));

    if (index!== -1) {
        await delay(300);
        db[index] = {...req.body };
        res.json({ message: "Entry updated" });
    } else {
        res.status(404).json({ message: "Entry not found" });
    }
});

app.delete('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    const index = db.findIndex(entry => entry.id === Number(id));

    if (index!== -1) {
        await delay(200);
        db.splice(index, 1);
        res.json({ message: "Entry deleted" });
    } else {
        res.status(404).json({ message: "Entry not found" });
    }
});

// lsitens for requests on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});