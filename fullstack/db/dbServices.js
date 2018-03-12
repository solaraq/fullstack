'use strict';

let http = require("http");
let path = require("path");
let fs = require('fs');

const MongoClient = require('mongodb').MongoClient;

const  url = 'mongodb://localhost:27017/test';

let dbConnection = dbConnect();
 
function dbConnect() {
	return MongoClient.connect(url)
		.then(conn => {
			conn.collection('restaurants').createIndex( { name: "text" } );
			dbConnection = conn;
		});
}

function get(collection = 'restaurants', criteria = {}, limit = 10) {
	return dbConnection.collection(collection)
		.find(criteria).limit(limit).toArray();
}

function search(collection = 'restaurants', searchText = '') {
	return dbConnection.collection(collection)
		.find({ $text: { $search: searchText } }).toArray();
}

function deleteItem(id, collection = 'restaurants') {
	dbConnection.collection(collection).deleteOne( {"restaurant_id" : id } )
		.then(result => return result);
}

function create(collection = 'restaurants', data) {
	return dbConnection.collection(collection).insert(data);
}

function bulkCreate(data) {
	return dbConnection.collection(collection).insertMany(data);
}

function update() {

}

function bulkDelete(criteria) {
	dbConnection.collection(collection).deleteMany(criteria);
		.then(result => return result);
}

module.exports = {
    create:create,
	update: update,
	deleteItem: deleteItem,
	get: get,
	dbConnect: dbConnect,
	search: search
};

