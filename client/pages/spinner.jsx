import React from 'react';

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  render() {
    return (
      <div>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    );
  }
}
