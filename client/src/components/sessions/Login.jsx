import { useState } from 'react';
import SignupForm from './SignupForm'; 
import LoginForm from './LoginForm'; 

function Login({ onLogin }) {
  // const [signUp, setSignUp] = useState(false);
  // const [error, setError] = useState(false);
  // const [success, setSuccess] = useState(false);
  // const navigate = useNavigate();
  const [signupMode, setSignupMode] = useState(false)

  return (
    <div>
    {signupMode ?
      <SignupForm 
        signupMode={signupMode} 
        setSignupMode={setSignupMode} 
        onLogin={onLogin} /> :
      <LoginForm
        setSignupMode={setSignupMode} 
        signupMode={signupMode}
        onLogin={onLogin} 
      /> }
    </div>
  );
}

export default Login;
