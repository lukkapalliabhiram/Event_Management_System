import React from 'react';
import './forgot_password.css';

function ForgotPassword() {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    // call function to send email to user
  };

  return (
    <div className="section" id="section3">
      <div className="form form--login">
        <h1 className="alpha">Lost password?</h1>
        <p>Ohk, don't panic. You can recover it here.</p>
        <div>
          <form className="form-wrap" onSubmit={handleFormSubmit}>
            <input id="" className="inputbox email" type="text" placeholder="Email id" name="email" />
            <p><button type="submit" className="button">Send me <i className="icon-rocket"></i></button></p>
          </form>
        </div>
        <hr />
        <p>You remember your Password? Brilliant!</p>
        <p><a className="scroll" href="login.html" data-section="1">&laquo; Login here</a></p>
      </div>
    </div>
  );
}

export default ForgotPassword;
