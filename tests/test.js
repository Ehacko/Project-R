/* ---------- Main db Page ---------- */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'Project-R';
const client = new MongoClient(url, { useNewUrlParser: true });

/* ---------- Appel à la bdd ---------- */
client.connect(function(err) {
	assert.equal(null, err);
	console.log("Connection établie");

	const db = client.db(dbName);

	//functions calls here

	client.close(); //à envoyer en tant que callback en cas d'appel a une fonction
});

/* ---------- ajouter une ou plusieurs recettes ---------- */
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
//prototype d'appel à la fonction  --myObject est un tableau d'objets
ajouterDoc(db, collectionAEditer, myObject, function() { client.close(); })


/* ---------- Afficher toute la collection ---------- */
const findDoc = function(db, collectionName, callback) {
	const collection = db.collection(collectionName);

	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log('Résultats trouvés dans ' + collectionName + ' : ');
		console.log(docs);
		callback(docs);
	});
};
//prototype d'appel à la fonction
findDoc(db, collectionATrouver, function() { client.close(); })

/* ---------- filtrer l'affichage de la collection ---------- */
const findThis = function(db, collectionName, filtre, callback) {
	const collection = db.collection(collectionName);
	
		collection.find(filtre).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log('Résultats trouvés dans ' + collectionName + ' : ');
		console.log(docs);
		callback(docs);
	});
};
//prototype d'appel à la fonction  --le termesDeLaRecherche est un objet
findThis(db, collectionATrouver, termesDeLaRecherche, function() { client.close(); });

/* ---------- modifier un champ d'un document ---------- */
//de préférence, filtrer par _id
const majChamp = function(db, collectionName, filtre, newObject, callback) {
	const collection = db.collection(collectionName);

	collection.updateOne(filtre, { $set: newObject}, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("mise a jour effectuée");
	});
}
//prototype d'appel à la fonction  --filtre et nouvelleValeurDuChamp sont des objets
majChamp(db, nomDeLaCollection, filtre, nouvelleValeurDuChamp, function() { client.close(); });

//prototype d'objet pour nouvelleValeurDuChamp --si le champ n'existe pas il sera créé
nouvelleValeurDuChampSimple    = { champ : valeur };
nouvelleValeurDunSousDocumnent = { champ : [{ champ : valeur }, { champ : valeur }] };

/* ---------- remplacer tous les champs d'un document ---------- */
//de préférence, filtrer par _id
const majDoc = function(db, collectionName, filtre, newObject, callback) {
	const collection = db.collection(collectionName);

	collection.update(filtre, {newObject}, {upsert: true} function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("mise a jour effectuée");
	});
}
//prototype d'appel à la fonction  --filtre et nouvelleValeurDuChamp sont des objets
majChamp(db, nomDeLaCollection, filtre, nouveauDocument, function() { client.close(); });


/* ---------- supprimer un document ---------- */
//de préférence, filtrer par _id
// si le document n'est pas trouvé il sera inséré
const supprimer = function(db, collectionName, filtre, callback) {
	const collection = db.collection(collectionName);

	let counted = collection.count(filtre);
	collection.remove(filtre, function(err, result){
		assert.equal(err, null);
		assert.equal(counted, result.result.n);
		console.log(counted + ' elements supprimés dans ' + collectionName);
		callback(result);
	});
};
//prototype d'appel à la fonction --filtre est un objet
supprimer(db, nomDeLaCollection, filtre, function() { client.close(); });




/* ---------- boite à outils ---------- */

//afficher tous les documents qui ont la valeur banane pour catégory et les trier dans l'ordre alphabetique décroissant de leur titre 
db.menu.find({ category: 'banane'}).sort({ title: -1})

//compter
db.menu.find({ category: 'chameau'}).count()

//afficher les 3 premier documents qui ont la valeur ornithorinque pour catégory
db.menu.find({ category: 'ornithorinque'}).limit(3)

//boucles
db.menu.find().forEach(function(doc) { print('Blog Post: ' + doc.title) })

//afficher le premier document ayant la valeur first pour catégory
db.menu.findOne({ category: 'first'})

//incrémenter un champ de 2
db.menu.update({ title: 'Post One'}, { $inc: {likes: 2} })

//renomer un champ d'un document
db.menu.update({ title: 'Post One'}, { $rename: { propre: 'sale' } })



//find all the posts with comments from user "Mary May"
db.menu.find({ comment: { $elemMatch : { user: 'Mary May' } } })

//plus grand que et plus petit que
db.posts.find({ champ: { $gt: 2 } })
db.posts.find({ champ: { $gte: 7 } })
db.posts.find({ champ: { $lt: 7 } })
db.posts.find({ champ: { $lte: 7 } })

//necessaire pour intégrer des valeurs décimales ?
