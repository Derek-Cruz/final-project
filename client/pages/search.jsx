import React from 'react';

export default class SearchPeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  render() {
    return (
      <div className="container container-status-jsx">
        <div>
          <div className="no-results-style">
            <h3>
              Under Construction
            </h3>
            <p>
              <a href="#">Go back Home!</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
