import { useContext, useRef, useState } from "react";
import "./login.scss";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import loginImg from "../../assets/login-image.jpg";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { FastField, Field, Form, Formik } from "formik";
import InputField from "../../components/CustomField/InputField";

export default function Login() {
  const history = useHistory();
  // const email = useRef();
  // const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const initialValues = {
    email: "",
    password: "",
  };
  const handleClick = (values) => {
    loginCall({ email: values.email, password: values.password }, dispatch);
  };
  const handleCreateAcc = () => {
    history.push("/register");
  };

  // state show password button
  const [show, setShow] = useState(false);

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Require password"),
    email: Yup.string().email("Email only").required("Require Email"),
  });

  return (
    <div className='login'>
      <div className='login-left'>
        <img src={loginImg} alt='' className='login-left__image' />
      </div>
      <div className='login-right'>
        <h3 className='login-right__logo'>SNPO</h3>
        <span className='login-right__description'>
        Connect with other pet owers around you on SNPO social.
        </span>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleClick}
        >
          {({ isSubmiting }) => {
            return (
              <Form className='login-right__form'>
                <FastField
                  name='email'
                  component={InputField}
                  placeholder='Email'
                ></FastField>
                <Field
                  name='password'
                  component={InputField}
                  placeholder='Mật khẩu'
                  type={show ? "text" : "password"}
                ></Field>
                <img
                  className='show-pass'
                  src={show ? "/assets/auth/hidepass.png" : "/assets/auth/showpass.png"}
                  width={20}
                  height={15}
                  alt=''
                  onClick={() => setShow(!show)}
                />
                <button
                  className='login-right__form__buttonLogin'
                  type='submit'
                  disabled={isFetching}
                >
                  {isFetching ? <CircularProgress color='white' size='20px' /> : "ĐĂNG NHẬP"}
                </button>
                <span className='login-right__form__buttonForgot'>Quên mật khẩu?</span>

                <button
                  disabled={isFetching}
                  className='login-right__form__buttonCreate'
                  onClick={handleCreateAcc}
                >
                  {isFetching ? (
                    <CircularProgress color='white' size='20px' />
                  ) : (
                    "Hoặc tạo tài khoản"
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>
        {/* <form className="login-right__form" onSubmit={handleClick}>
          <input
            placeholder="Email"
            type="email"
            required
            className="login-right__form__input"
          // ref={email}
          />
          <input
            placeholder="Password"
            type="password"
            required
            minLength="6"
            className="login-right__form__input"
          // ref={password}
          />


        </form> */}
      </div>
    </div>
  );
}
