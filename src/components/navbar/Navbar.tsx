import "./navbar.scss";

const Navbar = () => {
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
        <img
  src="https://www.jioinstitute.edu.in/sites/default/files/styles/webp/public/article/WhatsApp%20Image%202023-06-20%20at%207.37.52%20PM.jpeg.webp?itok=a-fUcHbY"
  alt="tg"
/>
          <span>Amlan Borgohain</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
