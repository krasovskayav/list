const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(bodyParser.json());

let id = 1;
//const items = [];

app.get('/index', (req, res) => {
    setTimeout(() => {
        //res.send(items);
        res.sendFile(__dirname+'/index.html');
    }, 2000);
});

app.post('/index', (req, res) => {
    index.push({
        ...req.body,
        id: id++
    });

    res.json(index[index.length - 1]);
});

app.put('/index/:indexId', (req, res) => {
    const foundItem = index.find(item => item.id === parseInt(req.params.itemId));

    Object.keys(req.body).forEach(key => {
        if (key !== 'id') {
            foundItem[key] = req.body[key];
        }
    });

    res.json(foundItem);
});

app.delete('/index/:itemId', (req, res) => {
    const foundIndex = index.findIndex(item => item.id === parseInt(req.params.itemId));
    const foundItem = index[foundIndex];

    index.splice(foundIndex, 1);

    res.json(foundItem);
});

app.listen(3000, () => {
    console.log('listening on 3000...');
});
