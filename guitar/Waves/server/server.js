const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const dotenv = require('dotenv');

const app = express();
const mongoose = require('mongoose');
dotenv.config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
dotenv.config();

const {User} = require('./models/user');
const {auth} = require('./middleware/auth');
const {Brand} = require('./models/brand');
const{admin} = require('./middleware/admin');

app.post('/api/product/brand',auth,admin,(req,res) => {
    const brand = new Brand(req.body);

    brand.save((err,doc) => {
        if(err) return res.json({success: false,err});
        res.status(200).json({
            success: true,
            brand: doc
        })
    })
})
app.get('/api/product/brands',(req,res)=>{
    Brand.find({}, (err,brands) =>{
        if(err) return res.status(400).send(err);
        res.status(200).send(brands)
    })
})
app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
})

app.get('/api/user/logout',auth, (req,res) =>{
User.findOneAndUpdate(
    {_id: req.user._id},
    {token: ''},
    (err,doc) =>{
if(err) return res.json({success:false,err});
return res.status(200).send({
    success: true
})
    }
)
})
app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
           // userData: doc
        })
    })
});



app.post('/api/users/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({loginSuccess:false,message:'Auth failed, email not found'});

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false,message:'Wrong password'});

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('w_auth',user.token).status(200).json({
                    loginSuccess: true
                })
            })
        })
    })
})


const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));
// mongoose.set('useFindAndModify',false);
