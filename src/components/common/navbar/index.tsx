import React, { useState } from "react"; 

const LayoutNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
 

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/cielo.svg" alt="" width="70" height="70" />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default LayoutNavbar;
