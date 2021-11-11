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
                    <div key={status.availabilityId} className="col-12">
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
      <div className="row">
        <div className="col-12 div-testing">
          <div className="col-3 home-img-placement">
            <img src="../images/person-placeholder.jpg" alt=".." className="home-img"/>
          </div>
          <div className="col-9">
            <p className="p-testing">{ fullName }</p>
            <p className="p-testing">{ time }</p>
            <p className="p-testing">{ description }</p>
          </div>
        </div>
        <div className="a-position">
          <a href="" className="request-a-home">Request</a>
        </div>
      </div>
  );
}
