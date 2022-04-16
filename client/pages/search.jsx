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
      <div className="container container-home-jsx">
        <div>
          <div className="no-results-style">
            <form className="d-flex">
              <input
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <button className="button-style">Search</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
