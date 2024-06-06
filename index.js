const express = require('express'); 
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const mockDataBase =[
    { id: 1, name: 'John Smith', email: 'john.smith@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 4, name: 'Bob Williams', email: 'bob.williams@example.com' },
    { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com' },
    { id: 6, name: 'David Green', email: 'david.green@example.com' },
    { id: 7, name: 'Eva White', email: 'eva.white@example.com' }
];

// async function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//await can only be used with async fucntions
app.get('/api/data', async(req,res) => {
    await delay (1000);
    res.json(mockDataBase);
});

app.post('/api/data', async(req,res) => {
    const newData = req.body;
    await delay(500);
    mockDataBase.push(newData);
    res.status(201).send('Data was added succesfully');
});

app.put('/api/data/:id', async(req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    await delay(700);
    const index = mockDataBase.findIndex(item => item.id === Number(id));
    if (index!== -1) {
        mockDataBase[index] = updateData;
        res.send('Data updated successfully');
    } else {
        res.status(404).send('Data not found');
    }
});

app.delete('/api/data/:id', async(req, res) => {
    const { id } = req.params;
    await delay(300);
    const index = mockDataBase.findIndex(item => item.id === Number(id));
    if (index!== -1) {
        await delay(200);
        mockDataBase.splice(index, 1);
        res.send('Data deleted successfully');
    } else {
        res.status(404).send('Data not found');
    }
});

// lsitens for requests on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});