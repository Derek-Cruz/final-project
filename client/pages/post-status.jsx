import React from 'react';

export default class PostStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    // console.log('state:', this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="post-status-test">
          <form onSubmit={this.handleSubmit} onReset={this.reset}>
            <div>
              <label htmlFor="post-time">need icon</label>
              <input
                name="time"
                type="time"
                id="post-time"
                value={this.state.value}
                onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="post-description">need icon</label>
              <input
                name="description"
                type="text"
                id="post-description"
                value={this.state.value}
                onChange={this.handleChange} />
            </div>
            <div className="button1">
              <button className="button-style">Post</button>
            </div>
            <div className="button2">
              <button className="button-style">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
