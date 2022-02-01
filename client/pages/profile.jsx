import React from 'react';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="container container-home-jsx">
        <div className="row noti-row-style">
          <div className="col p-0">
            <h2 className="noti-h2-style">testing profile</h2>
            <div className="noti-jsx-margin">
              <div className="row">
              <p>testing render</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
