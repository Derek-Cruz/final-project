import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableUser: [],
      status: []
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

  displayApproved(status) {
    fetch('/api/reqStatus')
      .then(res => res.json())
      .then(newPlan => {
        return (status.status === 'approved')
          ? this.setState({ status: newPlan })
          : 'no plan';
      });
  }

  render() {
    return (
      <div className="container container-home-jsx">
        <div className="row plans-home-jsx">
          <div className="col p-0">
            <h2 className="h2-plans-jsx">MY PLANS</h2>
            <div className="home-jsx-margin ">
              {
                this.state.status.map(testing => (
                  <div key={testing.requestId} className="col-12">
                    <TestingPlans status={testing} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="row avail-home-jsx">
          <div className="col p-0">
            <h2 className="h2-avail-jsx">AVAILABLE</h2>
            <div className="home-jsx-margin ">
              <div className="row">
                {
                  this.state.availableUser.map(status => (
                    <div key={status.availabilityId} className="col-12">
                      <ListStatus status={status} />
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

function ListStatus(props) {
  const { photoUrl, fullName, time, description } = props.status;
  return (
      <div className="row">
        <div className="col-12 div-liststatus">
          <div className="col-3 small-img-placement">
            <img src={photoUrl} alt=".." className="small-img"/>
          </div>
          <div className="col-9">
            <p className="p-liststatus">{ fullName }</p>
            <p className="p-liststatus"><i className="fas fa-clock small-icon"></i>{ time }</p>
            <p className="p-liststatus"><i className="fas fa-comment-alt small-icon"></i>{ description }</p>
          </div>
        </div>
        <div className="a-position">
          <a href="#send-req" className="request-a-home">Request</a>
        </div>
      </div>
  );
}

function TestingPlans(props) {
  const { status } = props.status;
  return (
    <div>
      <div> {status }</div>
    </div>
  );
}
