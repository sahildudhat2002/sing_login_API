var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');


var User = require('../models/validation');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', async function(req, res, next) {

  // console.log(req.body);
  if(req.body.password!=req.body.confirmpassword)
  {
    res.status(200).json({
      status:"password not match"
    })
  }
  var newpass = await bcrypt.hash(req.body.password,12);
  // console.log(newpass);

  const signupdata = await User.create({
    name:req.body.name,
    email:req.body.email,
    password:newpass,
  })

  res.status(200).json({
    status:"success",
    signupdata
  })
});
router.get('/login',async function(req,res,next){
  let{email,password} = req.body;
  const logindata = await User.findOne({email});

  const checkpass = await bcrypt.compare(password,logindata.password);
  res.status(200).json({
    status:"login",
    logindata
  })
})

module.exports = router;
