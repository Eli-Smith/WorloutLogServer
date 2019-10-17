module.exports = function(req, res, next){ // exports the module allowing it to be used in another file
    res.header('access-control-allow-origin', '*'); 
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    next();
}

/*
    - Middleware is code that stands between clients and servers and determines whether not certain requests will be allowed of ou server before the request ever reaches the server
    - When the server recieves a request from a client that request must then meet the requirements established in our header.js middleware
    - (2) This response tells the client that a request originating from anywhere will be allowed. ('*' is a wildcard and means any origin will be accepted)
    - (3) This response tells the client what types of requests will be allowed of our server, in this case the server will accept get, post, put and delete requests ONLY
    - (4) This response tells the client what headers are expected of each request.
*/