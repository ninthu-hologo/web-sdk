import React , {useContext, useState} from 'react'
import "../assets/css/style.css"
import { AuthContext } from '../utils/context/loginAuthContext';
const Login = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
   const {auth , setAuth} = useContext(AuthContext)
    const handleLogin = (e) => {
      e.preventDefault();
  
      // Check if the entered username and password match the default values
      if (username === 'ninthu' && password === 'chosen') {
        setAuth(true);
        setLoginSuccess(true);
      } else {
        setAuth(false);
        setLoginSuccess(false);
      }
    };


  return (
    <html lang="en">
    <head>
      <title>Login 08</title>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    
    </head>
    <body>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
           
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fa fa-user-o"></span>
                </div>
                <h3 className="text-center mb-4">Have an account?</h3>
                {loginSuccess && <p className="text-success">Login successful!</p>}
                <form action="#" className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                      <input
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control rounded-left"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div className="form-group d-flex">
                      <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control rounded-left"
                        placeholder="Password"
                        required
                      />
                    </div>
                  <div className="form-group d-md-flex">
                    <div className="w-50">
                      <label className="checkbox-wrap checkbox-primary">
                        Remember Me
                        <input type="checkbox" defaultChecked />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="w-50 text-md-right">
                      <a href="#">Forgot Password</a>
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary rounded submit p-3 px-5"
                    >
                      Get Started
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script src="../assets/js/jquery.min.js"></script>
      <script src="../assets/js/popper.js"></script>
      <script src="../assets/js/bootstrap.min.js"></script>
      <script src="../assets/js/main.js"></script>
    </body>
  </html>
  )
}

export default Login