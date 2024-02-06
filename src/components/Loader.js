import { ProgressBar } from "react-loader-spinner";

export function Loader() {
  return (
    <div className="loader progress-bar-loader">
      <ProgressBar
        visible={true}
        height="100%"
        width="100%"
        color="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="loader"
      />
    </div>
  );
}
