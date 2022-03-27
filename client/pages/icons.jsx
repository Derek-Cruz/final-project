import React from 'react';

export default function Icons(props) {
  return (
      <div className="icon-position d-flex justify-content-center">
        <a className="icon-style" href="#"><i className="fas fa-home icon-fas"></i><span className="test-span">Home</span></a>
        <a className="icon-style" href="#search-people"><i className="fas fa-search icon-fas"></i><span className="test-span">Search</span></a>
        <a className="icon-style" href="#post-status"><i className="fa-solid fa-circle-plus icon-fas"></i><span className="test-span">Create</span></a>
        <a className="icon-style" href="#notification"><i className="fas fa-bell icon-fas"></i><span className="test-span">Notification</span></a>
        <a className="icon-style" href="#profile"><i className="fas fa-user icon-fas"></i><span className="test-span">Profile</span></a>
      </div>
  );
}
