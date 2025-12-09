
const http = require("http");

const server = http.createServer((req,res) => {
	
	if(req.method == "GET" && req.url == "/"){
		res.writeHead(200,{'content-type':'text/plain'});
		res.end("Welcome to the page");
	}
	else if(req.method == "GET" && req.url== "/info"){
		res.writeHead(200,{'content-type':'text/plain'});
		res.end("this is information page");
	}
	else if(req.method =="POST" && req.url == "/submit"){
		let body = "";

		req.on("data",(chunk) => {
			body += chunk.toString();
			console.log("receiving data");
		});
		req.on("end",() =>{

			let jsonFile = {};

			try{
				jsonFile = JSON.parse(body);
				res.writeHead(201,{'content-type': 'application/json'});
				res.end(JSON.stringify(jsonFile));

			}catch(error){
				res.writeHead(400,{'content-type':'application/json'});
				res.end("Invalid json format");
			}
			
		});
	}else{
		res.writeHead(404,{'content-type':'text/plain'});
		res.end("Page not found");
	}
});

server.listen(3000,() => {
	console.log("Server is running on port 3000");
});