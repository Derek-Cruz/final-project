import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  }

  componentDidMount() {
    fetch('/api/login')
      .then(res => res.json())
      .then(data => {
        this.setState({
          user: data
        });
      });
  }

  render() {
    // console.log('state:', this.state);
    return (
      <div className="container">
        <div className="row">
          <form onSubmit={ this.handleSubmit } className="form-inline">
            <label className="my-1 mr-2" htmlFor="login"></label>
            <select>
            {
              this.state.user.map(users => (
                <option key={users.userId} className="col-12">
                  <ListUser users={users} />
                  hello
                </option>
              ))
            }
            </select>
            <div>
              <button type="submit" className="btn btn-primary my-1">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function ListUser(props) {
  const { fullName } = props.users;
  return (
    <>
    <option value="1">{ fullName }</option>
    </>
  );
}
