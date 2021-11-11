import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableUser: []
    };
  }

  componentDidMount() {
    fetch('/api/available')
      .then(res => res.json())
      .then(data => {
        this.setState({
          availableUser: data
        });
      });
  }

  render() {
    return (
      <div className="container container-home-jsx">
        <div className="row plans-home-jsx">
          <div className="col p-0">
            <h2 className="h2-plans-jsx">My Plans</h2>
            <div className="home-jsx-margin ">
              <p>this is where my active plans go</p>
            </div>
          </div>
        </div>
        <div className="row avail-home-jsx">
          <div className="col p-0">
            <h2 className="h2-avail-jsx">Available</h2>
            <div className="home-jsx-margin ">
              <div className="row">
                {
                  this.state.availableUser.map(status => (
                    <div key={status.availabilityId} className="col-12 col-md-6 col-lg-4">
                      <Testing testing={status} />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <a href="#post-status" className="button-home-jsx"><i className="fas fa-plus fa-plus-styling"></i></a>
        </div>
      </div>
    );
  }
}

function Testing(props) {
  const { fullName, time, description } = props.testing;
  return (
      <div className="card-body">
        <p>{ fullName }</p>
        <p>{ time }</p>
        <p>{ description }</p>
        <div>
          <a href="">Request</a>
        </div>
      </div>
  );
}
