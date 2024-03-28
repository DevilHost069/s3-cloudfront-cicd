import { FunctionComponent } from "react";
import "../../assets/css/dashboard.css";

const Dashboard: FunctionComponent = () => {
  return (
    <div className="grid-container">
      <div className="menu-icon">
        <strong> &#9776;</strong>
      </div>
      <header className="header">
        <div className="header_search">Search...</div>
        <div className="header_avatar">Logout</div>
      </header>
      <aside className="aside">
        <div className="aside_close-icon">
          <strong>&times;</strong>
        </div>
        <div className="aside_brand">Cannabiiz Elite</div>
        <ul className="aside_list">
          <li className="aside_list-item">Menu item1</li>
          <li className="aside_list-item">Menu item2</li>
          <li className="aside_list-item">Menu item3</li>
          <li className="aside_list-item">Menu item4</li>
          <li className="aside_list-item">Menu item5</li>
        </ul>
        <div className="aside_footer">Footer</div>
      </aside>
      <main className="main">
        <div className="main_overview">
          <div className="overview_card">
            <div className="overview_card-info">Overview</div>
            <div className="overview_card-icon">Card</div>
          </div>
          <div className="overview_card">
            <div className="overview_card-info">Overview</div>
            <div className="overview_card-icon">Card</div>
          </div>
          <div className="overview_card">
            <div className="overview_card-info">Overview</div>
            <div className="overview_card-icon">Card</div>
          </div>
          <div className="overview_card">
            <div className="overview_card-info">Overview</div>
            <div className="overview_card-icon">Card</div>
          </div>
        </div>

        <div className="main_cards">
          <div className="card">Card</div>
          <div className="card">Card</div>
          <div className="card">Card</div>
        </div>
        <div className="main_content">
          <div className="main_greeting">Hello User</div>
          <div className="main_name">Welcome to your dashboard</div>
        </div>
      </main>
      <footer className="footer">
        <div className="footer_copyright">&copy;2020</div>
        <div className="footer_byline">Made with &hearts;</div>
      </footer>
    </div>
  );
};

export default Dashboard;
