import React from 'react';

export default function Home(props) {
  return (
    <div className="container container-home-jsx">
      <div className="row plans-home-jsx">
        <div className="col p-0">
          <h2 className="h2-plans-jsx">My Plans</h2>
          <div className="testing">
            <p>this is where my active plans go</p>
          </div>
        </div>
      </div>
      <div className="row avail-home-jsx">
        <div className="col p-0">
          <h2 className="h2-avail-jsx">Available</h2>
          <div className="testing">
            <p>this is where my friends who are available go</p>
          </div>
        </div>
        <a href="#post-status" className="button-home-jsx"><i className="fas fa-plus fa-plus-styling"></i></a>
      </div>
    </div>
  );
}
