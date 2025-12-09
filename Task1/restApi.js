const http = require('http');



let students = [
  {name: "Eyob",  id : 1}, { name: "Abebe", id: 2 },{name: "Fekadu", id: 3}
];
let newStudent = {};



const server = http.createServer((req,res) => {
  if(req.method == "GET" && req.url == "/students"){
    res.writeHead(200,{'content-type':'application/json'});
    res.end(JSON.stringify(students));
  }
  else if(req.method == "POST" && req.url == "/students"){
    let body = "";

    req.on('data',(chunk) =>{
      body += chunk.toString();
    });
    
    req.on('end',() => {
      let lastStudentId = students[students.length-1].id;
      try {
        newStudent = JSON.parse(body);
        newStudent.id = lastStudentId + 1;
        students.push(newStudent);
        res.writeHead(201,{'content-type': 'application/json'});
        res.end(JSON.stringify(students));
      
      } catch (error) {
        console.error(error);
        res.writeHead(400,{'content-type': 'text/plain'});
        res.end("Invalid json");
      }
    });
  }
  else if(req.method =="PUT"){
    let fullUrl = req.url;
    let checkUrl = fullUrl.substring(0,10);
    
    //console.log(checkUrl);
    if(checkUrl == "/students/"){
      let idUrl = fullUrl.substring(10,fullUrl.length);
      let id = Number(idUrl);
      let isStudent = false;
      
      for(let i = 0; i< students.length;i++){
        if(students[i].id === id){
          isStudent = true;
          let body= "";
          req.on('data',(chunk) => {
            body += chunk.toString();
          });
          req.on('end',() => {
            let updateStudentName = {};
            try {
              updateStudentName = JSON.parse(body);
              students[i].name = updateStudentName.name;
              res.writeHead(200,{'content-type': 'application/json'});
              res.end(JSON.stringify(students));
            } catch (error) {
              console.error(error);
              res.writeHead(400,{'content-type': 'text/plain'});
              res.end("Error occured while processing the json");
            }
          });
          break;
        }
      }
      if(!isStudent){
        res.writeHead(404,{'Content-Type': 'text/plain'});
        res.end("Student not exist");
      }
      
    }
    else{
      res.writeHead(404,{'Content-Type':'text/plain'});
      res.end("Wrong address");
    }   
  }
  else if(req.method == "DELETE"){
    let fullUrl = req.url;
    let checkUrl = fullUrl.substring(0,10);
    
    //console.log(checkUrl);
    if(checkUrl == "/students/"){
      console.log('here')
      let idUrl = fullUrl.substring(10,fullUrl.length);
      console.log(idUrl);
      let id = Number(idUrl);
      let isStudent = false;

      for(let i = 0; i< students.length;i++){
        if(students[i].id === id){
          isStudent = true;
          students.splice(i,1);
          console.log(students);
          res.writeHead(200,{'content-type' : 'text/plain'});
          res.end("The student got removed sucessfully");
          break;
        } 
      }
      if(!isStudent){
        res.writeHead(404,{'content-type':'text/plain'});
        res.end("Student not exist");
      }
    }
    else{
      res.writeHead(404,{'Content-Type': 'text/plain'});
      res.end("Wrong Adress");
    }
  }
  else {
    res.writeHead(404,{'content-type': 'text/plain'});
    res.end("Page not found");
  }
});



server.listen(4000, ()=>{
  console.log('server is running on port 4000');
});