import React from 'react';
export default class Testing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      name: '',
      aboutMe: '',
      location: ''
    };
  }

  render() {
    return (
      <div className="container container-home-jsx">
        <div className="row noti-row-style">
          <div className="col p-0">
            <h2 className="noti-h2-style">MY PROFILE</h2>
            <div className="noti-jsx-margin">
              <div className="row">
               hello
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
