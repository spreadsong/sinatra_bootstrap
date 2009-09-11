$(document).ready( function() {
  Global.init();
})



/*
  Ajax wrapper function

  example call: ajax('POST', 'users', {email: 'a@a.com', password: 'pass'}, callback)
  parameters:
    method: 'GET', 'POST', 'PUT', 'DELETE'
    path: url
    data: data to be sent in hash format
    callback: either a function, or if not given it'll try to run the instructions given in the ajaxCallbacks hash
*/
function ajax(method, path, data, callbackFunction) {
	data = data || {}
	
	// For the backend we send GET with GET requests, and everything else
	// via a POST request, where the real verb gets passed as '_method' with the data
	if (method == 'GET' || method == 'POST') {
		primaryMethod = method;
	} else {
		primaryMethod = 'POST';
		data['_method'] = method;
	}
	
	// creates a string like "GET users/new"
	callbackPath = method + " " + path;
	// roots the real paths. callbackPath doesn't have to be rooted
	path = "/" + path;
	
	// if not given, set it to ajaxCallbacks hash
	if ( typeof(callbackFunction) == 'undefined' ) {
	  callbackFunction = ajaxCallbacks[callbackPath];
	}
	
	$.ajax({
   		type: primaryMethod,
			url: path,
			data: data,
			dataType: 'script',
			success: callbackFunction
	});
}

// JS code to be run after Ajax calls
// hash-like structure, "HTTP METHOD PATH": { JS code }
var ajaxCallbacks = {
}
