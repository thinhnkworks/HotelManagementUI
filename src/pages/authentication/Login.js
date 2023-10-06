import React from "react";
import './Login.css'
function Login() {
  return (
    <>
    <div class="container">

        <div><label className="textInput" for="usrname">Mã nhân viên</label></div>
    <div><input type="text" id="usrname" name="usrname" /></div>

    <div><label className="textInput" for="psw">Password</label></div>
    <div><input type="password" id="psw" name="psw" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" /></div>
    
    <div><input type="submit" value="Submit"/></div>
    
</div>
    </>

  );
}

export default Login;