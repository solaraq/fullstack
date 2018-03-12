var express = require('express');
var router = express.Router();
var dbServices = require('../db/dbServices.js');
 
router.all('/:obj_type/*?', function(req, res, next) {
    next();
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

router.get('/hosts', function(req, res, next) {
	res.contentType( 'json' );
	dbServices.get()
		.then(results => res.send(results));
});

router.get('/hosts/search', function(req, res, next) {
	dbServices.search('restaurants', req.query.searchText)
		.then(results => res.send(results));
});

router.get('/hosts/:id([0-9]+)', function(req, res, next) {
	dbServices.get('restaurants', {"restaurant_id": req.params.id})
		.then(results => res.send(results));
});

router.post('/hosts', function(req, res, next) {
	dbServices.create('restaurants', req.body.id, req.body.name)
		.then(results => res.send(results));
});
 
router.put('/hosts/:id([0-9]+)', function(req, res, next) {
  res.render('index', { title: 'hosts/:id' });
});

router.delete('/hosts/:id([0-9]+)', function(req, res, next) {
	dbServices.deleteItem(req.params.id)
		.then(results => res.send(results));
});
 
module.exports = router;
