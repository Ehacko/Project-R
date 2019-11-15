const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb+srv://ludji:root@test-w7rhz.mongodb.net/test?retryWrites=true&w=majority';
//const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true });

client.connect(function(err) {
	assert.equal(null, err);
	//console.log("Connection établie");
});

const querinator = {
	querynatorinator : 'querynatorinator',
	addDoc : function(collectionName, docList,) {
        client.connect(function(err) {
            assert.equal(null, err);
            console.log("Connection établie");
        });
        client.db('Project-R').collection(collectionName).insertMany(docList);
    },
	findDoc : function(collectionName) {
        return client.db('Project-R').collection(collectionName).find({}).toArray();
    },
	findItem : function(collectionName, filtre, callback) {
        return client.db('Project-R').collection(collectionName).find(filtre).toArray();
    },
	updateItem : function(collectionName, filtre, newObject) {
        return client.db('Project-R').collection(collectionName).updateOne(filtre, { $set: newObject} );
    }
};

module.exports.querinator = querinator;
module.exports.client = client;
