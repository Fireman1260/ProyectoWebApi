const express = require('express')
const mongo = require('mongodb').MongoClient;
const app = express()
var assert = require('assert')

var url = 'mongodb://localhost:27017/Heroes'

app.use(express.json())

var lastID = 9;

app.get('/api/heroes', (req, res) => {
    listado  = []
    mongo.connect(url, function(err, db){
        assert.equal(null, err);
        const HeroDatabase = db.db('HeroDatabase')
        var cursor = HeroDatabase.collection('Heroes').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            listado.push(doc)
        },
        function(){
            res.status(200).send(listado);
        });
    })

    
});

app.get('/api/heroes/:id', (req, res) => {
    mongo.connect(url, function(err, db){
        const HeroDatabase = db.db('HeroDatabase')
        var cursor = HeroDatabase.collection('Heroes').find({id: parseInt(req.params.id)});
        cursor.next(function(err, doc) {
            if (doc) {
                res.status(200).send(doc);
            }
            else{
                res.status(404).send('El heroe con el ID brindado no se encontro')
            }
        });
    })
});

app.post('/api/heroes', (req, res) => {

    if(!req.body.name){
        res.status(400).send("Se requiere que el campo 'name' exista y lleve algun valor");
        return;
    }
    if(!req.body.hero_type){
        res.status(400).send("Se requiere que el campo 'hero_type' exista y lleve algun valor");
        return;
    }
    if(!req.body.alter_ego){
        res.status(400).send("Se requiere que el campo 'alter_ego' exista y lleve algun valor");
        return;
    }
    if(!req.body.species){
        res.status(400).send("Se requiere que el campo 'species' exista y lleve algun valor");
        return;
    }
    if(!req.body.src){
        res.status(400).send("Se requiere que el campo 'src' exista y lleve algun valor");
        return;
    }
        
    lastID = lastID + 1;
    const newHero = {
        id: lastID,
        name: req.body.name,
        hero_type: req.body.hero_type,
        alter_ego: req.body.alter_ego,
        species: req.body.species,
        src: req.body.src
    }
    listado.push(newHero)
    res.status(201).send("Heroe insertado exitosamente")
});

app.put('/api/heroes/:id', (req, res) => {
    const heroe = listado.find(h => h.id === parseInt(req.params.id))
    if(!heroe) {
        res.status(404).send('El heroe con el ID brindado no se encontro')
        return;
    }
        
    
    if(!req.body.name){
        res.status(400).send("Se requiere que el campo 'name' exista y lleve algun valor");
        return;
    }
    if(!req.body.hero_type){
        res.status(400).send("Se requiere que el campo 'hero_type' exista y lleve algun valor");
        return;
    }
    if(!req.body.alter_ego){
        res.status(400).send("Se requiere que el campo 'alter_ego' exista y lleve algun valor");
        return;
    }
    if(!req.body.species){
        res.status(400).send("Se requiere que el campo 'species' exista y lleve algun valor");
        return;
    }
    if(!req.body.src){
        res.status(400).send("Se requiere que el campo 'src' exista y lleve algun valor");
        return;
    }
    heroe.name = req.body.name;
    heroe.hero_typev = req.body.hero_type;
    heroe.alter_ego = req.body.alter_ego;
    heroe.species = req.body.species;
    heroe.src ; req.body.src;

    res.status(204).send("Heroe modificado exitosamente")
});

app.delete('/api/heroes/:id', (req, res) => {
    const heroe = listado.find(h => h.id === parseInt(req.params.id))
    if(!heroe) {
        res.status(404).send('El heroe con el ID brindado no se encontro')
        return;
    }

    const index = listado.indexOf(heroe);
    listado.splice(index, 1);

    res.status(204).send("Heroe modificado exitosamente")
});



app.listen(3001, () => console.log('Escuchando en el puerto 3001...'))