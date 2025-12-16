import express from "express";

const app = express();
const PORT = 3000;
const students = [{
  name: "Kasahun",id: 1, department : "Civil"
}, {
  name: "Abebe",id: 2, department : "Mining"
},{
  name: "Alemnesh",id: 3, department : "Environmental"
}];


app.get('/home', (req,res) => {
  res.status(200).type("text/html").send('<h1 style="color:green">Welcome to Home Page</h1>');
});

app.get('/about', (req,res) => {
  res.status(200).type('text/plain').send("About us Page");
});

app.get('/students/:studentId',(req,res) => {
  const studentId = Number(req.params.studentId);
  if(Number.isNaN(studentId)){
    return  res.status(404).type('text/plain').send("Invalid student ID");
  }
  let studentDepartment = req.query.department;
  if(!studentDepartment){
    return res.status(404).type('text/plain').send("department query not found");
  }
  studentDepartment = studentDepartment.toLowerCase();

  const student = students.find( s => s.department.toLowerCase() == studentDepartment && studentId == s.id);
  if(!student){
    return  res.status(404).type('text/plain').send("Student not found");
  }
  res.status(200).json(student);

});



app.listen(PORT, () => {
  console.log(`The app is running on port: ${PORT}`);
});