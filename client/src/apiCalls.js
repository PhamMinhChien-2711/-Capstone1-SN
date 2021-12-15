import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    alert("Tên đăng nhâp hoặt mật khẩu không đúng")
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

