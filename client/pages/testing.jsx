import React from 'react';
export default class Testing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  render() {
    return (
      <div className='margin-top'>hello</div>
    );
  }
}
