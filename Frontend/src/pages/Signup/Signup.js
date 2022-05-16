import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// style file
import "./Signup.scss";

// context (global state)
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";
import UserContext from "../../context/UserContext";

// api service
import UserService from "../../services/UserService";


const Signup = () => {
  // ******* start global state ******* //
  
  // theme context
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;
  
  // language context
  const { isEnglish, english, german } = useContext(LanguageContext);
  const language = isEnglish ? english : german;
  
  // user context
  const { setUserData } = useContext(UserContext);
  
  // ******* end global state ******* //
  
  // local state
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  
  // init
  const history = useHistory();
  let userToken = "";
  
  // set page title
  document.title = language.signup.pageTitle;
  
  // execute sign up operations
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // sign up user
    UserService.signupUser({ userName, email, password, confirmPassword })
      .then((res) => {
        userToken = res.data.userToken;
        localStorage.setItem("auth-token", userToken);
      })
      .then(() => {
        if (userToken) {
          // get data of signed up user, and pass it to global state
          UserService.getAuthenticatedUser(userToken)
            .then((res) => {
              setUserData({ token: userToken, user: res.data, isAuth: true });
            })
            .then(() => history.push("/"))
            .catch((err) => console.error("Error while get user data", err));
        }
      })
      .then(() => {
        // everything done, so reset our states
        setErrors({});
        setLoading(false);
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        console.error("Error while sign up", err.response.data);
        setErrors(err.response.data);
        setLoading(false);
      });
  };

  return (
    <div
      className='signupMain-box'
      style={{
        background: theme.background,
      }}
    >
      <div
        className='main'
        style={{
          background: theme.background,
        }}
      >
        <div className='logo'>
          <svg
            viewBox='0 0 24 24'
            className='logo__svg'
            style={{
              fill: theme.logo,
            }}
          >
            <g>
              <path d='M 24 5 c -0.835 0.37 -1.732 0.62 -2.675 0.733 c 0.962 -0.576 1.7 -1.49 2.048 -2.578 c -0.9 0.534 -1.897 0.922 -2.958 1.13 c -0.85 -0.904 -2.06 -1.47 -3.4 -1.47 c -2.572 0 -4.658 2.086 -4.658 4.66 c 0 0.364 0.042 0.718 0 3.588 c -5.357 -0.063 -7.304 -2.05 -9.602 -4.868 c -0.4 0.69 -0.63 1.49 -0.63 2.342 c 0 1.616 0.823 3.043 2.072 3.878 c -0.764 -0.025 -1.482 -0.234 -2.11 -0.583 v 0.06 c 0 2.257 1.605 4.14 3.737 4.568 c -0.392 0.106 -0.803 0.162 -1.227 0.162 c -0.3 0 -0.593 -0.028 -0.877 -0.082 c 0.593 1.85 2.313 3.198 4.352 3.234 c -1.595 1.25 -3.604 1.995 -5.786 1.995 c -0.376 0 -0.747 -0.022 -1.112 -0.065 c 2.062 1.323 4.51 2.093 7.14 2.093 c 8.57 0 15.686 -5.797 13.255 -13.254 c 0 -0.2 -0.569 -0.543 0.431 -2.543 z'></path>
            </g>
          </svg>
        </div>
        <h4
          className='title'
          style={{
            color: theme.typoMain,
          }}
        >
          {language.signup.header}
        </h4>
        <div className='form'>
          <form onSubmit={handleSubmit}>
            <div
              className='form-group form__inputBox'
              style={{
                background: theme.foreground,
                borderBottomColor: `${
                  errors.userName ? theme.error : theme.mainColor
                }`,
              }}
            >
              <label
                htmlFor='exampleInputUserName'
                className='form__inputBox__label'
                style={{
                  color: theme.typoSecondary,
                }}
              >
                {language.signup.userNameLabel}
              </label>
              <input
                type='text'
                className='form-control form__inputBox__input'
                id='exampleInputUserName'
                style={{
                  color: theme.typoMain,
                }}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {errors.userName && (
                <small
                  className='form-text'
                  style={{
                    color: theme.error,
                  }}
                >
                  * {errors.userName}
                </small>
              )}
            </div>
            <div
              className='form-group form__inputBox'
              style={{
                background: theme.foreground,
                borderBottomColor: `${
                  errors.email ? theme.error : theme.mainColor
                }`,
              }}
            >
              <label
                htmlFor='exampleInputEmail1'
                className='form__inputBox__label'
                style={{
                  color: theme.typoSecondary,
                }}
              >
                {language.signup.emailLabel}
              </label>
              <input
                type='email'
                className='form-control form__inputBox__input'
                id='exampleInputEmail1'
                style={{
                  color: theme.typoMain,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <small
                  className='form-text'
                  style={{
                    color: theme.error,
                  }}
                >
                  * {errors.email}
                </small>
              )}
            </div>
            <div
              className='form-group form__inputBox'
              style={{
                background: theme.foreground,
                borderBottomColor: `${
                  errors.password ? theme.error : theme.mainColor
                }`,
              }}
            >
              <label
                htmlFor='exampleInputPassword1'
                className='form__inputBox__label'
                style={{
                  color: theme.typoSecondary,
                }}
              >
                {language.signup.passwordLabel}
              </label>
              <input
                type='password'
                className='form-control form__inputBox__input'
                id='exampleInputPassword1'
                style={{
                  color: theme.typoMain,
                }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {errors.password && (
                <small
                  className='form-text'
                  style={{
                    color: theme.error,
                  }}
                >
                  * {errors.password}
                </small>
              )}
            </div>
            <div
              className='form-group form__inputBox'
              style={{
                background: theme.foreground,
                borderBottomColor: `${
                  errors.confirmPassword ? theme.error : theme.mainColor
                }`,
              }}
            >
              <label
                htmlFor='exampleInputPasswordConfirm'
                className='form__inputBox__label'
                style={{
                  color: theme.typoSecondary,
                }}
              >
                {language.signup.confirmPasswordLabel}
              </label>
              <input
                type='password'
                className='form-control form__inputBox__input'
                id='exampleInputPasswordConfirm'
                style={{
                  color: theme.typoMain,
                }}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              {errors.confirmPassword && (
                <small
                  className='form-text'
                  style={{
                    color: theme.error,
                  }}
                >
                  * {errors.confirmPassword}
                </small>
              )}
            </div>
            <button
              type='submit'
              className='btn btn-primary form__button'
              style={{
                background: theme.mainColor,
              }}
              disabled={isLoading}
            >
              {isLoading
                ? language.signup.loading
                : language.signup.signupButton}
            </button>
          </form>
        </div>
        <div className='login'>
          <span
            style={{
              color: theme.mainColor,
            }}
          >
            {language.signup.question}
            {"  "}
            <Link
              to='/login'
              className='login__link'
              style={{
                color: theme.mainColor,
              }}
            >
              {language.signup.link}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
