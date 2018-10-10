const express = require('express')
const app = express()

app.use(express.json())

var lastID = 9;
var listado = [
    {id: 1, name: "Spiderman", hero_type: "hero", alter_ego: "Peter Parker", species:"Human Mutate", src:'./img/spidey.jpg'},
    {id: 2, name: "Deadpool", hero_type: "anti-hero", alter_ego: "Wade Wilson", species:"Human Mutate", src:'./img/Deadpool.jpg'},
    {id: 3, name: "Red Hood", hero_type: "anti-hero", alter_ego: "Jason Todd", species:"Human", src:'./img/RedHood.jpg'},
    {id: 4, name: "Batman", hero_type: "hero", alter_ego: "Bruce Wayne", species:"Human", src:'./img/batman.jpg'},
    {id: 5, name: "Flash", hero_type: "hero", alter_ego: "Barry Allen", species:"Metahuman", src:'./img/Flash.jpg'},
    {id: 6, name: "Superman", hero_type: "hero", alter_ego: "Clark Kent", species:"Kryptonian", src:'./img/Superman.jpg'},
    {id: 7, name: "Wonder Woman", hero_type: "hero", alter_ego: "Diana Prince", species:"Amazonian-Olympian", src:'./img/wonderwoman.jpg'},
    {id: 8, name: "Super Girl", hero_type: "hero", alter_ego: "Linda Danvers", species:"Kryptonian", src:'./img/supergirl.jpg'},
    {id: 9, name: "Green Lantern (Jessica Cruz)", hero_type: "hero", alter_ego: "Jessica Cruz", species:"Human", src:'./img/GreenLantern.jpg'}
]

app.get('/api/heroes', (req, res) => {
    res.status(200).send(listado);
});

app.get('/api/heroes/:id', (req, res) => {
    const heroe = listado.find(h => h.id === parseInt(req.params.id))
    if(!heroe) //404
        res.status(404).send('El heroe con el ID brindado no se encontro')

    res.status(200).send(heroe)
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