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

    //collRecette.deleteMany({});
    //querynatorinator(db);

    const lasa = [{ 
        Nom: "Lasagnes", 
        Image: "Lasagnes.jpg",
        
        Ingredients: [
          { "_id": ObjectId("5dca0f964fb8e43684705059"), "Necessaire": 500 },
          { "_id": ObjectId("5dca0f964fb8e4368470505e"), "Necessaire": 200 },
          { "_id": ObjectId("5dca0f964fb8e4368470505d"), "Necessaire": 100 },
          { "_id": ObjectId("5dca0f964fb8e43684705054"), "Necessaire": 100 },
          { "_id": ObjectId("5dca0f964fb8e43684705058"), "Necessaire": 100 },
          { "_id": ObjectId("5dca0f964fb8e43684705064"), "Necessaire": 1 },
          { "_id": ObjectId("5dca0f964fb8e43684705056"), "Necessaire": 1 },
          { "_id": ObjectId("5dca0f964fb8e4368470506e"), "Necessaire": 2 },
          { "_id": ObjectId("5dca0f964fb8e43684705070"), "Necessaire": 1 },
          { "_id": ObjectId("5dca0f964fb8e43684705072"), "Necessaire": 3 },
          { "_id": ObjectId("5dca0f964fb8e43684705069"), "Necessaire": 1 },
          { "_id": ObjectId("5dca0f964fb8e43684705051"), "Necessaire": 1 },
          { "_id": ObjectId("5dca0f964fb8e43684705061"), "Necessaire": 1 },
          { "_id": ObjectId("5dca0f964fb8e43684705055"), "Necessaire": 1 },
          { "_id": ObjectId("5dcb1565464d242da8b72859"), "Necessaire": 1 },
          { "_id": ObjectId("5dcb1565464d242da8b7285a"), "Necessaire": 1 },
          { "_id": ObjectId("5dca0f964fb8e43684705066"), "Necessaire": 1 }
        ],
        
        Preparation: [
          "Pour commencer, préchauffer le four à 170 degrés, préparer tous les ingrédients.",
          "Précuire les pâtes à lasagne. Mettre de l'eau salée sur le feu. Une fois bouillie, plonger les pâtes durant le temps indiqué sur le paquet. Egoutter puis éponger l'excedent d'eau. Réserver.",
          "Emincer les oignons, les champignons, les poivrons. Les faire revenir dans un peu d'huile dans l'ordre précédemment établi, chacun une dizaine de minutes. Ajouter les tomates concassées et les diverses épices, le poivre. Laisser mijoter une vingtaine de minutes, saler. Réserver.",
          "Préparer la béchamel. Faire un roux. Mettre le beurre dans une poêle et laisser fondre. Ajouter la farine au beurre fondu et déssécher la pâte obtenue. Incorporer le lait petit à petit jusqu'à l'obtention d'une pâte homogène. Faire cuire trois minutes et ajouter le sel, le poivre et la muscade. Ajouter la moitié du fromage, mélanger.",
          "Assembler tous les éléments.",
          "Ajouter successivement dans un plat allant au four, une couche de sauce puis une couche de pâtes puis une couche de béchamel, recommencer. Finaliser le plat en parsèment le reste du fromage, ajouter quelques noisettes de beurre et enfourner quarante cinq minutes.",
          "C'est prêt ! Servir chaud.",
        ],
        Variante: [
          "- Remplacer les pâtes par des lamelles de courgettes.",
          "- Remplacer les poivrons par des carottes et des courgettes."
        ]
    }];

    findDoc(db, 'recettes', function() { client.close(); })


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