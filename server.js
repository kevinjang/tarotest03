const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

const course = JSON.parse(fs.readFileSync('./goods.json').toString());

const allData = [];

course.tags.forEach(key => {
   course.data[key].forEach(v=>{
       allData.push(v)
   })
});

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods',"PUT, GET, POST, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Headers',"X-Requested-With");
    res.header('Access-Control-Allow-Headers',"Content-Type");
    next();
})

app.use(express.static('static'))

app.get('/', (req,res)=> res.send('Hello World!'))

// app.get('/api/img',(req,res)=>{
//     // res.
// })

app.get('/api/top',(req,res)=>{
    const newData = [...allData]
    newData.sort((a,b)=>{
        return b.sold - a.sold;
    })

    res.json({
        code:0,
        data:newData.slice(0,5)
    })
})

app.get('/api/goods',(req,res)=>{
    const page = req.query.page || 1
    const start = (page-1)*10;
    const end = start+ 10;
    setTimeout(()=>{
        res.json({
            code:0,
            data: allData.slice(start,end)
        })
    },2000);
})

app.listen(3000,()=>console.log('Example app listening on port 3000!'))