import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start text-muted">
      <div className="p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        Developed by 3P © {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
