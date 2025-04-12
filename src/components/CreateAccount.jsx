import React from 'react'

const CreateAccount = () => {
  return (
    <div id="createAccount">
        <header>
            <i className=''>B</i>
            <img src="" alt="cartton icon"/>
        </header>
        <main>
            <form>
                <input type="text" id="bothNames" name="bothNames" value="name"/>
                <input type="email" id="email" value="youremail@email.com"/>
                <input type="password" id="pswrd" name="pswrd" value="*******"/>
                <input type="password" id="confirmPswrd" name="pswrd" value="*******"/>
                <input type="checkbox" id="terms" name="terms" required/>
                <label for="terms"><a href="">I agree to the terms and conditions.</a></label>
                <button type="submit">Create account</button>
            </form>
        </main>
        <footer>
            <p>or create account with:</p>
            <ul>
                <li><img src="" alt="gmail icon"/></li>
                <li><img src="" alt="apple icon"/></li>
            </ul>
        </footer>
    </div>
  )
}

export default CreateAccount