const Datastore = require('nedb')

const coll = new Datastore({
    filename: 'kolekcja2.db',
    autoload: true
});

const express = require("express")
var hbs = require('express-handlebars');
let app = express()
var PORT = process.env.PORT || 3000;
app.use(express.static('static'))

app.set('views', __dirname + '/views');

app.engine('hbs', hbs({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    helpers: {
        linijka: function(pierwsze, drugie, opcje){
            if(pierwsze == drugie)
                return opcje.fn(this)
            else
                return opcje.inverse(this)
        }
    }
}));

var doc = {
    a: "",
    b: "",
    c: "",
    d: ""
}

for (var member in doc) delete doc[member];

app.get("/", function(req, res){
    coll.find({}, function (err, newDoc) {
        let docs = {"docsy": newDoc}
        res.render('index.hbs', docs);
    });
});

app.get("/handle", function(req, res){
    if(req.query.checkbox1 == "on"){
        doc.a = "TAK";
    }
    else{
        doc.a = "NIE";
    }
    if(req.query.checkbox2 == "on"){
        doc.b = "TAK";
    }
    else{
        doc.b = "NIE";
    }
    if(req.query.checkbox3 == "on"){
        doc.c = "TAK";
    }
    else{
        doc.c = "NIE";
    }
    if(req.query.checkbox4 == "on"){
        doc.d = "TAK";
    }
    else{
        doc.d = "NIE";
    }
    
    coll.insert(doc)
    res.redirect('/');
});

app.get("/delete", function(req, res){
    coll.remove({ _id:req.query.id })
    res.redirect('/');
});

app.get("/edit", function(req, res){
    coll.find({}, function (err, newDoc) {
        let docs = {"docsy": newDoc}
        docs.id = req.query.id
        console.log(docs)
        res.render('edit.hbs', docs);
    });
});

app.get("/update", function(req, res){
    let obj = {
        a: req.query.ubezpieczony,
        b: req.query.benzyna,
        c: req.query.uszkodzony,
        d: req.query.naped4x4
    };
    console.log(obj, req.query.id)
    coll.update({ _id: req.query.id }, { $set: obj }, {}, function(err, numUpdated){
        console.log(numUpdated)
        res.redirect('/');
    });
    
});

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})