const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var ObjectId = require('mongodb').ObjectID;

const url = 'mongodb+srv://ludji:root@test-w7rhz.mongodb.net/test?retryWrites=true&w=majority';
//const url = 'mongodb://localhost:27017';

const client = new MongoClient(url, { useNewUrlParser: true });

client.connect(function(err) {
	assert.equal(null, err);
	console.log("Connection établie");

});

function cl(a) {console.log(a);}

const querynatorinator = function(db){
    db.collection('ingredients').find({}).sort({Nom: 1}).toArray(function(err, a) {
        assert.equal(err, null);
        
        f=0;
        cl('\n\n<div class="liste"> <div class="repo">');
        for (var i = 0; i < a.length; i++) {
            if (i>a.length/2 && f == 0) { cl('</div> <div class="repo">'); f++; }
            cl(`<input type="checkbox" value="${a[i].Nom}" id="${a[i]._id}" class="ingredient"> <div class="no">${a[i].Nom}</div> <input class="${a[i]._id}" value="0"></input> </br> <hr>`);
        }
        cl('</div>\n<div> <button onclick="querynator()">Query !</button> <div id="query"></div> </div> </div>\n');

        client.close();  
    });
}

const ajouterDoc = function(collectionName, docList,) {
	client.db('Project-R').collection(collectionName).insertMany(docList);
};

const findDoc = function(collectionName) {
	return client.db('Project-R').collection(collectionName).find({}).toArray();
};

const findThis = function(collectionName, filtre, callback) {
	return client.db('Project-R').collection(collectionName).find(filtre).toArray();
};

const remplacer = function(collectionName, filtre, newObject) {
	return client.db('Project-R').collection(collectionName).updateOne(filtre, { $set: newObject} );
};

const querinator = {
	querynatorinator : querynatorinator,
	addDoc : ajouterDoc,
	findDoc : findDoc,
	fintItem : findThis,
	updateItem : remplacer
};

module.exports = querinator;
