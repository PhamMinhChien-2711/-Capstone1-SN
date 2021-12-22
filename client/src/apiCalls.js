import axios from "axios";
import { toast } from "react-toastify";
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_API}/auth/login`,
      userCredential
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    toast.success("Vui vẻ bạn nhé !!");
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    toast.error("Tên đăng nhập hoặc mật khẩu sai rồi nè");
  }
};
