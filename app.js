var mysql      = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json())
var route = express.Router();
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'company'
});
 
connection.connect();
 
// connection.end();
route.get('/employees',(req,res)=>{
    console.log('Hi')
    connection.query('SELECT * from employees', function (error, results, fields) {
        if (error) throw error;
        res.json({employees :  results});
      });
      connection.end();
})

route.get('/employees/:id',(req,res)=>{
    console.log('Hi')
    connection.query('SELECT * from employees where id = ?',[req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.json({employees :  results});
      });
})

route.put('/employees/:id',(req,res)=>{
    console.log('update hi',req.body.salary,req.params.id)
    connection.query('update  employees set salary=? where id=?',[req.body.salary,req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.json({message :  "Updated "});
      });
})

route.delete('/employees/:id',(req,res)=>{
    console.log('update hi',req.body.salary,req.params.id)
    connection.query('delete from  employees where id=?',[req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.json({message :  "Deleted "});
      });
})

app.use('/api',route)
app.listen(3001,()=>{
    console.log('Server starts')
})