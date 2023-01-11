import sidebar2 from "../../sidebar2.png";
import sidebar from "../../sidebar.png";

export default function Sidebar() {
  return (
    <>
      <div className="side-bar2">
        <img src={sidebar2} />
      </div>
      <div className="side-bar">
        <img src={sidebar} />
      </div>
    </>
  );
}
