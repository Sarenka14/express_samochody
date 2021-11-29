const Datastore = require('nedb')

const coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});

var doc = {
    a: "a1",
    b: "b"
}

var doc2 = {
    a: "a2"
}

//coll1.insert(doc);
coll1.insert(doc2);

coll1.findOne({ _id: 'w9bSZCa8XxISDG5m' }, function (err, lol) {
    console.log("----- obiekt pobrany z bazy: ",lol)
    console.log("----- formatowanie obiektu js na format JSON: ")
    console.log(JSON.stringify(lol, null, 5))
});

coll1.find({ }, function (err, docs) {
    //zwracam dane w postaci JSON
    console.log("----- tablica obiektów pobrana z bazy: \n")
    console.log(docs)
    console.log("----- sformatowany z wcięciami obiekt JSON: \n")
    console.log(JSON.stringify({ "docsy": docs }, null, 5))
});

coll1.find({ a: "a1" }, function (err, docs) {    
    console.log(JSON.stringify({ "docsy": docs }, null, 5))
});

coll1.count({}, function (err, count) {
    console.log("dokumentów jest: ",count)
});

coll1.count({ a: "a1" }, function (err, count) {
    console.log("dokumentów z warunkiem jest: ",count)
});

/*coll1.remove({ a:"a2" }, {}, function (err, numRemoved) {
    console.log("usunięto dokumentów: ",numRemoved)
});*/

coll1.remove({ a:"a2" }, { multi: true }, function (err, numRemoved) {
    console.log("usunięto wszystkich dokumentów: ",numRemoved)
});

/*coll1.remove({}, { multi: true }, function (err, numRemoved) {
    console.log("usunięto wszystkie dokumenty: ",numRemoved)  
});*/