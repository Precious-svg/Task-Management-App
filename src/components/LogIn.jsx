import React from 'react'

const LogIn = () => {
  return (
    <div id="logIn">
        <header>Log In</header>
        <form>
            <input type="email" id="email" name="userEmail" value="Email"/>
            <input type="password" id="pswrd" name="userPswrd" value="*****"/>
            <div>
                <input type="checkbox" id="rememberUser" name="rememberUser"/>
                <label for="rememberUser">Remember me</label>
                <a href="">Forgot password?</a>
            </div>
        </form>
        <button type="submit">Log in</button>
        <footer>
            {/* task manager icons */}

        </footer>
    </div>
  )
}

export default LogIn