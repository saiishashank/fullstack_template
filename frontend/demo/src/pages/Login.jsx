
import { useForm } from 'react-hook-form';
import '../css/Login.css'; // We'll create this CSS file next
import {Link} from 'react-router-dom';
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login data submitted:", data);
    // Add your API call for authentication here
    alert(`Logging in with email: ${data.email}`);
  };

  return (
    <div className="login-container">
      <h1>Welcome Back!</h1>
      <p>Please enter your details to log in.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* Email Field */}
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email address"
              }
            })}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        {/* Password Field */}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required"
            })}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>
        
        {/* Forgot Password Link */}
        <div className="options">
            <a href="#" className="forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" className="login-button">Log In</button>
      </form>

      <div className="signup-link">
        <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Login;