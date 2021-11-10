import React from 'react';

export default class PostStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAvailable = this.setAvailable.bind(this);
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

  reset() {
    this.setState({
      time: 0,
      description: ''
    });
  }

  componentDidMount() {
    fetch('/api/available', {
      method: 'POST'
    })
      .then(data => data.json())
      .then(availablity => {
        this.setState({
          time: availablity.time,
          description: availablity.description
        });
      });
  }

  setAvailable(status) {
    fetch('/api/available', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(status)
    })
      .then(res => res.json())
      .then(status => {
        const newArr = this.state.availabilities.slice();
        newArr.push(status);
        this.setState({
          time: newArr.time,
          description: newArr.description
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="post-status-test">
          <form onSubmit={this.handleSubmit} onReset={this.reset}>
            <div>
              <label htmlFor="post-time"><i className="fas fa-clock"></i></label>
              <input
                name="time"
                type="time"
                id="post-time"
                value={this.state.time}
                onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="post-description"><i className="fas fa-comment-alt"></i></label>
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
