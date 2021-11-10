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
    this.setAvailable = this.setAvailable.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    this.setAvailable(this.state);
    event.preventDefault();
  }

  setAvailable(status) {
    fetch('/api/available', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(status)
    })
      .then(data => data.json());
    location.hash = '#'
      .then(status => {
        this.setState({
          time: status.time,
          description: status.description
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="post-status-test">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="post-time" className="label-padding"><i className="fas fa-clock"></i></label>
              <input
                name="time"
                type="time"
                id="post-time"
                value={this.state.time}
                onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="post-description" className="label-padding"><i className="fas fa-comment-alt"></i></label>
              <input
                name="description"
                type="text"
                id="post-description"
                placeholder="Finally have free time!"
                value={this.state.description}
                onChange={this.handleChange} />
            </div>
            <div className="button1">
              <button className="button-style">Post</button>
            </div>
            <div className="button2">
              <a href="#" className="a-style">Cancel</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
