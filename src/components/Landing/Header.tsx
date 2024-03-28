export default function Header() {
  return (
    <>
      <header id="header" className="fixed-top ">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo">
            <h1>
              <a href="/login">Cannabizelite</a>
            </h1>

            {/* <a href="index.html">
              <img src={Logo} alt="" className="img-fluid" />
            </a> */}
          </div>

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a className="nav-link scrollto active" href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#features">
                  Features
                </a>
              </li>
              {/* <li>
                <a className="nav-link scrollto" href="#gallery">
                  Gallery
                </a>
              </li> */}
              <li>
                <a className="nav-link scrollto" href="#pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#faq">
                  F.A.Q
                </a>
              </li>
              {/* <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li>
                </ul>
              </li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul>
          </li> */}
              <li>
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/login">
                  Login
                </a>
              </li>
              <li>
                <a className="getstarted" href="/register">
                  Sign Up
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
    </>
  );
}
