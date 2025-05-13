const { render } = require("ejs");
const User = require("../models/user");
const { setUser } = require("../service/auth");
const secretKey = "Sanchit@123$";
const { sendEmail } = require("../utils/sendMail");
const passport=require("passport")

async function handleuserLogin(req, res) {
  const { userEmail, userPassword } = req.body;
  const loginUser = await User.findOne({
    userEmail: userEmail,
    userPassword: userPassword,
  });
  // console.log(loginUser);
  if (!loginUser)
    return res.status(404).send(`
            <script>
              alert('User not found');
              window.location.href = '/'; // 
            </script>
          `);
  const token = setUser(loginUser);
  res.cookie("uid", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  return res.redirect("/userDashboard");
}

async function handleUserRegister(req, res) {
  const { userName, userEmail, userPassword } = req.body;
  const existingUser = await User.findOne({ userEmail: userEmail });
  if (existingUser) {
    return res.send(`
            <script>
              alert('User Already exists');
              window.location.href = '/'; 
            </script>
          `);
  }
  User.create({
    userName: userName,
    userEmail: userEmail,
    userPassword: userPassword,
  });
  return res.send(`
    <script>
      alert('User Registered');
      window.location.href = '/'; 
    </script>
  `);
}

async function handleForgotPassword(req,res) {
    const {email} = req.body;

  const user = await User.findOne({ userEmail:email });
  if (!user) return res.status(404).send('No user found ');

  const token = jwt.sign({ id: user._id }, secretKey, {
    expiresIn: '15m'
  });

  const resetLink =
   `http://localhost:1000/resetpassword/${token}`;
  const html = `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`;
   try{
  await sendEmail(user.userEmail, 'Reset your password', html); 
  res.send('Reset link sent to your email')}
  catch (err){
  console.log(err);
  
  }
  
};

async function handleResetPassword(req,res) {
    console.log('Hello');
    
    const {token}  = req.params;
    const  {newPassword}  = req.body;
  
    try {
      const decoded = jwt.verify(token,secretKey);
      const user = await User.findOne({_id:decoded.id});
      if (!user) return res.status(404).send('User not found');
       user.userPassword = newPassword;
      await user.save();
      res.send('Password has been successfully reset');
    } catch (err) {
      res.status(400).send('Invalid or expired token');
    // console.log(err);
    
    }
  
}
async function handleChangePassword(req, res) {
  const { userEmail, oldPassword, newPassword } = req.body;
  const user = req.user;
  if (user.userPassword !== oldPassword) {
    return res.send(`
            <script>
              alert('Old Password not matched');
              window.location.href = '/'; 
            </script>
          `);
  }
  user.userPassword = newPassword;
  await user.save();
  return res.send(`
            <script>
              alert('Password changed');
              window.location.href = '/'; 
            </script>
          `);
}

async function handleGoogleAuth(req,res) {
     passport.authenticate('google', { failureRedirect: '/' }),
        (req, res) => {
          const token = setUser(req.user); 
          res.cookie("uid", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
          });
          res.redirect("/userDashboard");
        }
}
module.exports = {
  handleUserRegister,
  handleuserLogin,
  handleForgotPassword,
  handleResetPassword,
  handleChangePassword,
  handleGoogleAuth
};
