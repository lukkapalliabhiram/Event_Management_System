/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect  } from "react";
import './App.css'
import ReCAPTCHA from "react-google-recaptcha";

function LoginForm() {
  


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "C:\\Users\\Yash\\OneDrive\\Desktop\\SE Event management\\login_trial\\src\\script.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [slide, setSlide] = useState('login');

  function handleSlideChange(e) {
    setSlide(e.target.id);
  };

  // const [selectedOption, setSelectedOption] = useState('');

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
 
  // const [selectedOption, setSelectedOption] = useState('');

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);

  // 
  
  const [topping, setTopping] = useState(" * Choose Role Please * ")

  const onOptionChange = e => {
    setTopping(e.target.value)
  };

  const onLoad = () => {
    console.log("reCAPTCHA loaded");
  };
  
  const onChange = (value) => {
    console.log("reCAPTCHA value:", value);
  };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${slide}`}>HanabiYuga Welcomes You</div>
        <div className={`title ${slide === 'login' ? 'signup' : 'login'}`}>Signup Form</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" checked={slide === 'login'} onChange={handleSlideChange} />
          <input type="radio" name="slide" id="signup" checked={slide === 'signup'} onChange={handleSlideChange} />
          <label htmlFor="login" className={`slide ${slide}`}>Login</label>
          <label htmlFor="signup" className={`slide ${slide === 'login' ? 'signup' : 'login'}`}>Signup</label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          
          <form action="#" className={`${slide}`}>
            {slide === 'signup' && <div className="field">
              <input type="text" placeholder="First Name" required />
            </div>}
            {slide === 'signup' && <div className="field">
              <input type="text" placeholder="Last Name" required />
            </div>}
            <div className="field">
              <input type="text" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            {slide === 'signup' && <div className="field">
              <input type="text" placeholder="Confirm password" required />
            </div>}
            {slide === 'signup' && <div className="field">
              <input type="text" placeholder="Mobile number" required />
            </div>}

            <br/>
            {slide === 'signup' && <div className="LoginForm">
              <h3>Click Your Role</h3>
              <br/>
              <input
                type="radio"
                name="topping"
                value="Customer/User"
                id="Customer/User"
                checked={topping === "Customer/User"}
                onChange={onOptionChange}
              />
              <label htmlFor="Customer/User">Customer/User</label>

              <span style={{ margin: '0 50px' }}></span>
              <input
                type="radio"
                name="topping"
                value="Host/Owner"
                id="Host/Owner"
                checked={topping === "Host/Owner"}
                onChange={onOptionChange}
              />
              <label htmlFor="Host/Owner">Host/Owner</label>

              <br/>
              <br/>
              <p>
                You selected:  <strong>{topping}</strong>
              </p>
            </div>}
            

            <ReCAPTCHA sitekey="6LdI8KckAAAAABmOXJEQHkyWpn2GlW6XzlcYoPyd" onChange={onChange} onLoad={onLoad}/>


            {slide === 'login' && <div className="pass-link"><a href="">Forgot password?</a></div>}
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value={slide === 'login' ? 'Login' : 'Signup'} />
            </div>
            {slide === 'login' && <div className="signup-link">Not a member? 
            <br></br><a href=""> <img src="https://img.icons8.com/plasticine/50/null/google-logo.png" alt="Google logo" /> </a>

            </div>}
        
          </form>
        </div>
      </div>
    </div>
  );
  
}

export default LoginForm;