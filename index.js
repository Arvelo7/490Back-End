import express from 'express';
import { urlencoded, json } from 'body-parser';

const app = express();

app.use(urlencoded({extended: true}));
app.use(json());

app.use(function(req, res, next){
    res.header("access-control-allow origin", "*");
    res.header("access-control-allow-headers", "origin, x-requested-with, content-type, accept");
    next();
});


app.use('/api', require('./route/authentication').default);

var PORT = process.env.PORT || 5050;
app.listen(PORT,function(error){
    if(error){
        console.log('Error occurred');
    }
    else{
        console.log('server running at http://localhost:'+PORT);
    }
})