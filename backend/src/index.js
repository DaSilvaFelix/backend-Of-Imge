const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const morgan = require('morgan');
const conn = require('express-myconnection');
const router = require('./routers/router.js')

const app = express()
app.use(cors());
app.use(morgan('dev'))
app.set('port',process.env.PORT || 5000);
const dbConfig ={
    host: 'localhost',
    port:3306,
    user: 'root',
    password:'',
    database:'imagenes',
}
app.use(conn(mysql, dbConfig, "single"))
app.use('/', router);

app.listen(app.get('port'),()=>{
    console.log('server running in http://localhost:5000')
    
})
