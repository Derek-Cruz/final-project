import React from 'react';

export default function Icons(props) {
  return (
      <div className="icon-position d-flex justify-content-center">
        <a className="icon-style" href="#"><i className="fas fa-home icon-fas"></i></a>
        <a className="icon-style" href=""><i className="fas fa-search icon-fas"></i></a>
        <a className="icon-style" href="#notification"><i className="fas fa-bell icon-fas"></i></a>
        <a className="icon-style" href="#profile"><i className="fas fa-user icon-fas"></i></a>
      </div>
  );
}
