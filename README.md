# Map of Session Attributes for Node.js Express
=============================================================

  This session_attribute_map.js helps you to store session information in form of <key, value> MAP,
  which J2EE developers are used to.
  
  I am a J2EE developer. When doing web development, I am used to have session attributes to handle
  each client request.  Now I am doing web development in Express, I think that I should have the 
  same session attribute feature that I am used to have.  After I read some Node.js book, I try to 
  write some code which can help me handle http request as HttpServletRequest's session attribute feature. 

## Usage
  * Add session information for requests.
  * Handling success/warn attribute in you express controller can be used to display information on EJS or Jade
    whether a request is successfully handled or not.
  * session attributes can be used in EJS or Jade templates.    

## How to Use It
  * Put session_attribute_map.js under "Project_Name/lib"
  * Require this JS file in your JS file of Express Server (For Example, app.js)
  * Apply it to your Express Router
  
  ```js
  var session_attributes = require('./lib/sessionMap');
  ...
  ...
  app.use(session_attributes); 
  app.use(app.router);
  ```
  * In your Express Controllers, Jade templates, and EJS templetes, you are able to use:
  	res.addAttribute to set new session attribute
  	res.success to set  success message and remove warn message
  	res.warn to set warn message and remove success message
  	res.locals.sess_attributes['your_key']
  
    ```js
    function(req, res){
		    if(req.session.user){
			  res.locals.user = req.session.user['username'];
			}
			if(res.locals.sess_attributes['lastPage'] && res.locals.sess_attributes['lastPage'] != '/reg'){
			  delete req.session.attributes['success'];
			  delete req.session.attributes['warn'];
			}
		  res.addAttribute('lastPage','/reg');							
	      res.render('reg', {
		  title: 'User Registration',
		  user: res.locals.user,
		  sess_attributes: res.locals.sess_attributes
		}
	  );
	};    
  	```  
## Libraries Needed
  * Express
  * EJS template
  * Jade template
  
## Reference
  * Node.js in Action


