const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var ObjectId = require('mongodb').ObjectID;

const url = 'mongodb+srv://ludji:root@test-w7rhz.mongodb.net/test?retryWrites=true&w=majority';
//const url = 'mongodb://localhost:27017';

const dbName = 'Project-R';
const client = new MongoClient(url, { useNewUrlParser: true });

client.connect(function(err) {
	assert.equal(null, err);
	console.log("Connection établie");

    const db = client.db(dbName);

    const collRecette    = db.collection('recettes');
    const collmenu      = db.collection('menus');
    const collIngredient = db.collection('ingredients');

    // collRecette.deleteMany({});
    querynatorinator(db);


});

function cl(a) {console.log(a);}

function querynatorinator(db){
    db.collection('ingredients').find({}).sort({Nom: 1}).toArray(function(err, a) {
        assert.equal(err, null);
        
        f=0;
        cl('\n\n<div class="chose"> <div class="repo">');
        for (var i = 0; i < a.length; i++) {
            if (i>a.length/2 && f == 0) { cl('</div> <div class="repo">'); f++; }
            cl(`<input type="checkbox" value="${a[i].Nom}" id="${a[i]._id}" class="marqueur"> <div class="no">${a[i].Nom}</div> <input class="${a[i]._id}" value="0"></input> </br> <hr>`);
        }
        cl('</div>\n<div> <button onclick="querynator()">Query !</button> <div id="query"></div> </div> </div>\n');

        client.close();  
    });
}

const ajouterDoc = function(db, collectionName, docList, callback) {
	const collection = db.collection(collectionName);

	collection.insertMany(docList, 
		function(err, result) {
	    assert.equal(err, null);
	    assert.equal(docList.length, result.result.n);
	    assert.equal(docList.length, result.ops.length);
	    console.log( docList.length + " documents ajoutés dans " + collectionName );
	    callback(result);
	});
};

const findDoc = function(db, collectionName, callback) {
	const collection = db.collection(collectionName);

	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log('Résultats trouvés dans ' + collectionName + ' : ');
		console.log(docs);
		callback(docs);
	});
};

const findThis = function(db, collectionName, filtre, callback) {
	const collection = db.collection(collectionName);
	
		collection.find(filtre).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log('Résultats trouvés dans ' + collectionName + ' : ');
		console.log(docs);
		callback(docs);
	});
};

const remplacer = function(db, collectionName, filtre, newObject, callback) {
	const collection = db.collection(collectionName);

	collection.updateOne(filtre, { $set: newObject}, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("mise a jour effectuée");
		callback(result);
	});
};