import "./Header.css";
import Logo from "../../images/Around_the_US.svg";

function Header() {
  return (
    <header className="header">
      <img
        src={Logo}
        id="around-the-us"
        alt="logotipo de Around the US"
        className="logo"
      />
    </header>
  );
}

export default Header;
