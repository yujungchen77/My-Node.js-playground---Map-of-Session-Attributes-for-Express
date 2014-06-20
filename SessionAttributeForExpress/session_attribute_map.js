var express = require('express');
var res = express.response;

res.attribute = function(key, val){
	
	var sess = this.req.session;
	sess.attributes = sess.attributes || {};
    var mapKey = key || 'info';
    sess.attributes[mapKey] = val;
    if( mapKey == 'warn'){
    	delete sess.attributes['success'];
    }
    if( mapKey == 'success'){
    	delete sess.attributes['warn'];
    }
};

res.warn = function(val){
	return this.attribute('warn', val);
};
res.success = function(val){
	return this.attribute('success', val);
};

res.addAttribute = function (key, val){
	return this.attribute(key, val);
}


module.exports = function(req, res, next){
	/* Export res (express.response) object, which contains express.response's attributes.
	 * Session Attributes are stored in the map, called  res.locals.sess_attributes.
	 * You are able to use this object in your Express controllers, Jade templates, EJS templates,
	 * if you required this object for your Express Router.
	 * For example,
	 * 				var session_attributes = require('./lib/session_attribute_map');
	 * 				...
	 * 				...
	 * 				app.use(session_attributes);
	 *				app.use(app.router);
	 */
	res.locals.sess_attributes = req.session.attributes || {};
	res.locals.removeSessionAttributes = function(){
		req.session.attributes = {};
		
	};
	next();
}
