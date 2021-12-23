import Loader from "react-loader-spinner";

export default function LoadingVipPro() {
  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        left: "10px",
        zIndex: "1",
        width: "100%",
        height: "100%",
      }}
    >
      {" "}
      <Loader type='TailSpin' color='black' height={30} width={30} />
    </div>
  );
}
