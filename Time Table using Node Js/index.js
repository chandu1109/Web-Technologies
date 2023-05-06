const express = require("express");
const res = require("express/lib/response");
const session = require('express-session');
const mysql = require("mysql2");

const app = express();

let c;
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password: "",
    database: "cd"
});
con.query("create table if not exists Admin( id int NOT NULL AUTO_INCREMENT,name varchar(30),uname varchar(30),password varchar(30),email varchar(30), PRIMARY KEY (id) )",function(err,result){
    if(err) throw err;
    console.log("Admin Table created");
});
con.query(`CREATE TABLE if not exists timetable (
    Year varchar(100) DEFAULT NULL,
    Section varchar(100) DEFAULT NULL,
    Day varchar(100) DEFAULT NULL,
    Period1 varchar(100) DEFAULT NULL,
    Period2 varchar(100) DEFAULT NULL,
    Period3 varchar(100) DEFAULT NULL,
    Period4 varchar(100) DEFAULT NULL,
    Period5 varchar(100) DEFAULT NULL,
    Period6 varchar(100) DEFAULT NULL,
    Period7 varchar(100) DEFAULT NULL,
    Period8 varchar(100) DEFAULT NULL
  )`,(err,result)=>
  {
    if(err) throw err;
    console.log("timetable table created");
  });
con.query(`CREATE TABLE if not exists faculty1 (
    Year varchar(30) NOT NULL,
    Section varchar(30) NOT NULL,
    Subject varchar(30) NOT NULL,
    Faculty varchar(30) NOT NULL
  )`,(err,result)=>{
      console.log("faculty1 Table created");
  });
  con.query(`CREATE TABLE if not exists faculty (
    id int(60) NOT NULL,
    name varchar(90) NOT NULL,
    email varchar(90) NOT NULL,
    password varchar(90) NOT NULL DEFAULT 'root'
  )`,(err,results)=>
  {
    console.log("faculty Table created");
  });
app.get("/",(req,res)=>{ 
    const now = new Date();

const date = now.toLocaleDateString(); // gets the date in the local format
const time = now.toLocaleTimeString(); // gets the time in the local format
const day = now.toLocaleDateString('en-US', { weekday: 'long' }); // gets the day of the week in English
console.log("Day is: " + day);
const i = now.getDay();
const week = ["Sunday", "Monday", "Tuesday","Wednesday","Thrusday", "Friday","Saturday"];
const z = week[i];
console.log(z);

console.log(i);
const sql = `
SELECT
  merged.Faculty,
  GROUP_CONCAT(Period1 SEPARATOR ', ') AS Period1,
  GROUP_CONCAT(Period2 SEPARATOR ', ') AS Period2,
  GROUP_CONCAT(Period3 SEPARATOR ', ') AS Period3,
  GROUP_CONCAT(Period4 SEPARATOR ', ') AS Period4,
  GROUP_CONCAT(Period5 SEPARATOR ', ') AS Period5,
  GROUP_CONCAT(Period6 SEPARATOR ', ') AS Period6,
  GROUP_CONCAT(Period7 SEPARATOR ', ') AS Period7,
  GROUP_CONCAT(Period8 SEPARATOR ', ') AS Period8
FROM (
  SELECT
    f.faculty,
    CASE WHEN Period1 IN (f.Subject) THEN CONCAT_WS('-', t.Year, t.Section, Period1) ELSE NULL END AS Period1,
    CASE WHEN Period2 IN (f.Subject) THEN CONCAT_WS('-', t.Year, t.Section, Period2) ELSE NULL END AS Period2,
    CASE WHEN Period3 IN (f.Subject) THEN CONCAT_WS('-', t.Year, t.Section, Period3) ELSE NULL END AS Period3,
    CASE WHEN Period4 IN (f.Subject) THEN CONCAT_WS('-', t.Year, t.Section, Period4) ELSE NULL END AS Period4,
    CASE WHEN Period5 IN (f.Subject) THEN CONCAT_WS('-', t.Year, t.Section, Period5) ELSE NULL END AS Period5,
    CASE WHEN Period6 IN (f.Subject) THEN CONCAT_WS('-', t.Year, t.Section, Period6) ELSE NULL END AS Period6,
    CASE WHEN Period7 IN (f.Subject) THEN CONCAT_WS('-', t.Year, t.Section, Period7) ELSE NULL END AS Period7,
    CASE WHEN Period8 IN (f.Subject) THEN CONCAT_WS('-', t.Year, t.Section, Period8) ELSE NULL END AS Period8
  FROM timetable t
  JOIN faculty1 f
  ON t.Year = f.Year
    AND t.Section = f.Section
    AND (t.Period1 = f.Subject OR t.Period2 = f.Subject OR t.Period3 = f.Subject OR t.Period4 = f.Subject OR t.Period5 = f.Subject OR t.Period6 = f.Subject OR t.Period7 = f.Subject OR t.Period8 = f.Subject)
  WHERE t.Day = '${z}'
) AS merged
GROUP BY merged.Faculty
ORDER BY merged.Faculty;

`;
con.query(sql,(error, results, fields) => {
    if (error) throw error;
    console.log(c);
    console.log(results);
    res.render("index.ejs",{day,date,time,timetable:results});
  });

// console.log(`Today is ${day}, ${date} and the time is ${time}`);
   
   
});
app.get("/register",(req,res)=>{
    res.sendFile(__dirname+"/preregistration.html");
});

app.get("/adminreg",(req,res)=>{
    res.sendFile(__dirname+"/registration.html");
});
app.post("/adminreg",(req,res)=>{
    const {name,uname,password,email} = req.body;
    con.query("INSERT INTO Admin (name,uname,password,email) values(?,?,?,?)",[name,uname,password,email],function(err,result){
        if(err) throw err;
        console.log("Data inserted into admin");
    });
   res.redirect("/test");
});

app.get("/facultyreg",(req,res)=>{
    res.sendFile(__dirname+"/registration.html");
});

app.post("/facultyreg",(req,res)=>{
    res.send("facultyreg");
});
app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/prelogin.html");
});
app.get("/adminlogin",(req,res)=>{
    res.sendFile(__dirname+"/login.html");
});
app.get("/facultylogin",(req,res)=>{
    res.sendFile(__dirname+"/flogin.html");

});

app.get("/test",(req,res)=>{
      res.sendFile(__dirname+"/test.html");
});
app.get("/a1class",(req,res)=>{
    res.sendFile(__dirname+"/a1class.html");
});
app.get("/a2",(req,res)=>{
    res.sendFile(__dirname+"/a2.html");
});
app.get("/a2body",(req,res)=>{
    res.sendFile(__dirname+"/a2body.html");
});
app.post('/adminlogin', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	
	if (username && password) {
		
		con.query('SELECT * FROM Admin WHERE uname = ? AND password = ?', [username, password], function(error, results, fields) {
		
			if (error) throw error;
			
			if (results.length > 0) {
			
				request.session.loggedin = true;
				request.session.username = username;
                console.log(request.session.username);
			    response.render('adminindex.ejs',{username:username});
				
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
app.post('/facultylogin', function(request, response) {
	// Capture the input fields
	let email = request.body.email;
	let password = request.body.password;
	console.log("hiii");
	if (email && password) {
		
		con.query('SELECT * FROM faculty WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
		
			if (error) throw error;
			
			if (results.length > 0) {
			
				request.session.loggedin = true;
				request.session.email = email;
                
                const name = results[0].name;
                console.log(name);
                con.query("Select Year,Section,Subject from faculty1 where Faculty = ?",[name],(err,results)=>
                {
                    if(err) throw err; 
                    let sections=[];
                    let year=[];
                    let subject =[];
                    for(let i=0;i<results.length;i++)
                    {
                        sections.push(results[i]['Section']);
                        year.push(results[i]['Year']);
                        subject.push(results[i]['Subject']);
                    }
                    const sections1 = Array.from(new Set(sections));
                    const year1 = Array.from(new Set(year));
                    const subjects1 = Array.from(new Set(subject));
                    console.log(sections1);
                    console.log(year1);
                    console.log(subjects1);
            
                    const query = `
SELECT Day,
  GROUP_CONCAT(CASE WHEN Period1 IN (${subjects1.map(s => `'${s}'`).join(',')}) 
       THEN CONCAT(${year1}, Section, ', ', Period1) END) AS Period1,
  GROUP_CONCAT(CASE WHEN Period2 IN (${subjects1.map(s => `'${s}'`).join(',')}) 
       THEN CONCAT(${year1}, Section, ', ', Period2) END) AS Period2,
  GROUP_CONCAT(CASE WHEN Period3 IN (${subjects1.map(s => `'${s}'`).join(',')}) 
       THEN CONCAT(${year1}, Section, ', ', Period3)  END) AS Period3,
  GROUP_CONCAT(CASE WHEN Period4 IN (${subjects1.map(s => `'${s}'`).join(',')}) 
       THEN CONCAT(${year1}, Section, ', ', Period4)  END) AS Period4,
  GROUP_CONCAT(CASE WHEN Period5 IN (${subjects1.map(s => `'${s}'`).join(',')}) 
       THEN CONCAT(${year1}, Section, ', ', Period5)  END) AS Period5,
  GROUP_CONCAT(CASE WHEN Period6 IN (${subjects1.map(s => `'${s}'`).join(',')}) 
       THEN CONCAT(${year1}, Section, ', ', Period6)  END) AS Period6,
  GROUP_CONCAT(CASE WHEN Period7 IN (${subjects1.map(s => `'${s}'`).join(',')}) 
       THEN CONCAT(${year1}, Section, ', ', Period7)  END) AS Period7,
  GROUP_CONCAT(CASE WHEN Period8 IN (${subjects1.map(s => `'${s}'`).join(',')}) 
       THEN CONCAT(${year1}, Section, ', ', Period8)  END) AS Period8
FROM timetable where Year = '${year1}' and Section IN (${sections1.map(s => `'${s}'`).join(',')})
GROUP BY Day ORDER BY 
    CASE Day 
        WHEN 'Monday' THEN 1 
        WHEN 'Tuesday' THEN 2 
        WHEN 'Wednesday' THEN 3 
        WHEN 'Thrusday' THEN 4 
        WHEN 'Friday' THEN 5 
        WHEN 'Saturday' THEN 6 
        ELSE 7 
    END;
`;                  
 let x;
con.query(query,(err,results)=>
{
  console.log(results);
  
response.render("classindex.ejs",{name,results});
});        

  

});
				
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			
		});
	} else {
		response.send('Please enter Username and Password!');
		
	}
});
app.get("/a1",(req,res)=>
{
    if(req.session.username)
    {
        res.sendFile(__dirname+"/a1.html");
    }

});
app.get("/OIP",(req,res)=>
{
    res.sendFile(__dirname+"/OIP.webp");
});
app.get("/ad",(req,res)=>
{
    res.sendFile(__dirname+"/ad.png");
});
app.get("/f3",(req,res)=>
{
    res.sendFile(__dirname+"/f3.png");
});
app.get("/f1",(req,res)=>
{
    res.sendFile(__dirname+"/f1.jpg");
});

app.get("/tables",(req,res)=>
{
    
    res.sendFile(__dirname+"/tables.html");

});
app.post("/tables",(req,res)=>
{
  const {Year,Section} = req.body;
  console.log(Year);
  console.log(Section);
  con.query("Select Day, Period1, Period2, Period3, Period4, Period5, Period6,Period7, Period8 from timetable where Year = ? and Section = ?",[Year,Section],(err,result)=>
  {
    if(err) throw err;
    console.log(result);
    res.render("tables.ejs", { Year, Section, timetable: result });
  });
  
});


app.get("/a1faculty",(req,res)=>
{
    if(req.session.username)
    {
        console.log(req.session.username);
        res.sendFile(__dirname+"/a1faculty.html");
    }
  
});
app.post("/a1faculty",(req,res)=>
{
    const {name,email} = req.body;
    con.query("INSERT INTO faculty (name,email) values(?,?)",[name,email],function(err,result){
        if(err) throw err;
        console.log("Data  inserted into admin");
        res.sendFile(__dirname+"/a1faculty.html");
    });
     
});
app.get("/a1table",(req,res)=>
{
    if(req.session.username)
      {
        
        res.sendFile(__dirname+"/a1table.html");
      }else 
      {
        res.send("Please Login");
      }
});
app.post("/a1table",(req,res)=>
{
    const {Year,Section,Day,Period1,Period2,Period3,Period4,Period5,Period6,Period7,Period8} = req.body;
  
    con.query("INSERT INTO timetable  values(?,?,?,?,?,?,?,?,?,?,?)",[Year,Section,Day,Period1,Period2,Period3,Period4,Period5,Period6,Period7,Period8],function(err,result){
        if(err) throw err;
        console.log("Data inserted into timetable");
    });
    res.sendFile(__dirname+"/a1table.html");
});
app.get("/a1sub",(req,res)=>
{
    if(req.session.username)
      {
        res.sendFile(__dirname+"/a1sub.html");
      }
});
app.post("/a1sub",(req,res)=>
{
    const {Year,Section,Subject,Faculty} = req.body;
    console.log(Year);
    con.query("INSERT INTO faculty1  values(?,?,?,?)",[Year,Section,Subject,Faculty],function(err,result){
        if(err) throw err;
        console.log("Data  inserted into faculty1");
        res.sendFile(__dirname+"/a1sub.html");
    }); // added closing bracket here
});

app.get('/logout', function(req, res) {
    req.session.loggedin = false;
    
    req.session.destroy();
   
    res.redirect('/login');
  });
 app.get('/t',(request,respond) =>
 {
    respond.sendFile(__dirname+"/t.png");
 });
 app.get('/adminpng',(request,respond) =>
 {
    respond.sendFile(__dirname+"/admin.png");
 });
 app.get('/facultyjpg',(request,respond)=>{
    respond.sendFile(__dirname+"/faculty.jpg");
 });
app.listen(1000,function(){console.log("Server starts at port 1000");});