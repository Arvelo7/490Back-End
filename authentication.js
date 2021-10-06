import { createConnection } from 'mysql';
import { Router } from 'express';
let router = Router();
let connection = createConnection({
    host : 'localhost',
    user : 'root',
    password : null,
    database : ''
});
connection.connect(function(err) {
if(!err) {
    console.log("app connected with database.");
}
    else {
        console.log("Error occurred while connecting with Database.");
    }
});



router.post('/signup', function(req, res){
    let users = {
        'email' : req.body.email,
        'password' : req.body.password,
    }
    
    connection.query('INSERT INTO users SET ?', users, function(error, results){
        if(error){
            res.send({
                'success': false,
                'message' : 'Error occured'
            });
        }
        else {
            res.send({
                'success': true,
                'message': 'user registered'
            });
        }
    });
});

router.post('/signin', function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results) {
        if(error) {
            res.send({
                'success': false,
                'message': 'error occurred.'
            });
        } 
        else {
            if(results.length > 0){
                if(password == results[0].password){
                    res.send({
                        'success': true,
                        'message': 'login successful, Hello There'+email
                    });
                }
                else{
                    res.send({
                        'success': false,
                        'message': 'password does not match'
                    });
                }
            }
            else{
                res.send({
                    status: false,
                    message: 'email does not exist'
                });
            }
        }
    });
});

export default router;