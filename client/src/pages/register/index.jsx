import axios from "axios";
import { useRef } from "react";
import "./register.scss";
import { useHistory } from "react-router";
import TypeWritter from "typewriter-effect";
import * as Yup from "yup";
import { FastField, Form, Formik } from "formik";
import InputField from "../../components/CustomField/InputField";
import { toast } from "react-toastify";

export default function Register() {
  // const username = useRef();
  // const email = useRef();
  // const password = useRef();
  // const password_confirm = useRef();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  };
  const history = useHistory();

  const handleClick = async (v) => {
    const user = {
      username: v.username,
      email: v.email,
      password: v.password,
    };
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API}/auth/register`, user);
      toast.success("Đăng kí thành công!");
      history.push("/");
    } catch (err) {
      toast.error("Thông tin đăng kí bị trùng");
      console.log(err);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Email only").required("Require Email"),
    password: Yup.string().required("Require password"),
    password_confirm: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Pass not match"),
  });

  const handleLogin = () => history.push("/");
  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>
            Social Network{" "}
            <TypeWritter
              options={{
                strings: ["for Pet owner", "for you", "for everyone !"],
                autoStart: true,
                loop: true,
              }}
            />
          </h3>

          <span className='loginDesc'>
          Connect with friends and the world around you on social.
          </span>
        </div>
        <div className='loginRight'>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleClick}
          >
            {({ isSubmiting }) => {
              return (
                <Form className='loginBox'>
                  <h3 style={{ textAlign: "center" }}>ĐĂNG KÝ</h3>
                  <FastField
                    name='username'
                    placeholder='Tên đăng nhập'
                    component={InputField}
                  />
                  <FastField name='email' placeholder='Email' component={InputField} />
                  <FastField
                    name='password'
                    placeholder='Mật khẩu'
                    component={InputField}
                    type='password'
                  />
                  <FastField
                    name='password_confirm'
                    placeholder='Nhập lại mật khẩu'
                    component={InputField}
                    type='password'
                  />
                  <div>
                    <button className='loginButton' type='submit'>
                      Tham gia với chúng tôi
                    </button>
                  </div>
                  <div onClick={handleLogin} className='loginRegisterButton'>
                    Đã có tài khoản ? Đăng Nhập
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
