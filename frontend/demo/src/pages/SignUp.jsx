
import { useForm } from "react-hook-form";
import "../css/SignUp.css";
import { Link } from "react-router-dom";

function SignUp() {
  // Initializing the useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // This function will be called when the form is successfully validated
  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
  };

  return (
    <div className="signup-container">
      <h1>Create Account</h1>
      <p>Join our community and start your journey!</p>

      {/* The handleSubmit function validates inputs before calling onSubmit */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Username Field */}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Entered value does not match email format",
              },
            })}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>

        {/* Contact Number Field */}
        <div className="input-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            {...register("contactNumber", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter a valid number",
              },
            })}
          />
          {errors.contactNumber && (
            <span className="error-message">
              {errors.contactNumber.message}
            </span>
          )}
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>

      <div className="login-link">
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
