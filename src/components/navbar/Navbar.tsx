import "./navbar.scss";
import { useAuth } from "../../auth/AuthContext";

const Navbar = () => {
  const { session, signOut } = useAuth();
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>Moderator</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img src="/noavatar.png" alt="" />
          <span>{session?.user?.email ?? "Moderator"}</span>
        </div>
        <img
          src="/log.svg"
          alt="Sign out"
          className="icon"
          title="Sign out"
          style={{ cursor: "pointer" }}
          onClick={() => signOut()}
        />
      </div>
    </div>
  );
};

export default Navbar;
