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
          <div className="search-bar-placement">
            <form className="d-flex">
              <input
                type="text"
                inputMode="search"
                placeholder="Search"
                className="browsing-page-search-bar"
                aria-label="Search"
              />
              <button type="submit" className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
// testing a push
