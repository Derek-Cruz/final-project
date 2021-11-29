import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableUser: [],
      approved: [],
      status: []
    };
    this.deleteRequest = this.deleteRequest.bind(this);
  }

  componentDidMount() {
    fetch('/api/available')
      .then(res => res.json())
      .then(data => {
        this.setState({
          availableUser: data
        });
      });

    fetch('/api/approvedPlans')
      .then(res => res.json())
      .then(newPlan => {
        this.setState({
          approved: newPlan
        });
      });

    fetch('/api/pendingPlans')
      .then(res => res.json())
      .then(penPlan => {
        this.setState({
          status: penPlan
        });
      });
  }

  deleteRequest(requestId) {
    const testingdelete = this.state.status;

    fetch(`/api/deleteReq/${requestId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
      .then(res => res.json())
      .then(testing => {
        this.setState({
          status: testingdelete.filter(test => status.requestId !== requestId)
        });
      });
  }

  render() {
    // console.log('state:', this.state);
    return (
      <div className="container container-home-jsx">
        <div className="row plans-home-jsx">
          <div className="col p-0">
            <h2 className="h2-plans-jsx">MY PLANS</h2>
            <div className="home-jsx-margin ">
              {
                this.state.approved.map(status => (
                  <div key={status.requestId} className="col-12">
                    <ApprovedPlan status={status} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="row pending-home-jsx">
          <div className="col p-0">
            <h2 className="h2-pending-jsx">PENDING</h2>
            <div className="home-jsx-margin ">
              {
                this.state.status.map(status => (
                  <div key={status.requestId} className="col-12">
                    <DeniedPlan status={status} onClick={this.deleteRequest} />
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
              <div className="row margin-test">
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
        <div className="homepage-button-position">
          <a href="#send-req" className="request-a-home">Request</a>
        </div>
      </div>
  );
}

function ApprovedPlan(props) {
  const { photoUrl, fullName, time, description, location, title } = props.status;
  return (
    <div className="row">
      <div className="col-12 my-plans-position">
        <div className="col-3 small-img-placement">
          <img src={photoUrl} alt="profile picture" className="small-img" />
        </div>
        <div className="col-9">
          <p className="p-noti-jsx">{fullName}</p>
          <p className="p-noti-jsx">{title}</p>
          <p className="p-noti-jsx"><i className="fas fa-clock small-icon"></i>{time} <i className="fas fa-location-arrow small-icon"></i>{location}</p>
          <p className="p-noti-jsx"><i className="fas fa-comment-alt small-icon"></i>{description}</p>
        </div>
      </div>
    </div>
  );
}

function DeniedPlan(props) {
  const { photoUrl, fullName, time, status, location, title, requestId } = props.status;
  return (
    <div className="row">
      <div className="col-12 my-plans-position">
        <div className="col-3 small-img-placement">
          <img src={photoUrl} alt="profile picture" className="small-img" />
        </div>
        <div className="col-9">
          <p className="p-noti-jsx">{fullName}</p>
          <p className="p-noti-jsx">{title}</p>
          <p className="p-noti-jsx"><i className="fas fa-clock small-icon"></i>{time} <i className="fas fa-location-arrow small-icon"></i>{location}</p>
          <p className="p-noti-jsx red"><i className="fas fa-envelope-open small-icon"></i>{status}</p>
        </div>
      </div>
      <div className="homepage-button-position">
        <button onClick={() => props.onClick(requestId)} className="denied-button-home">Delete</button>
      </div>
    </div>
  );
}
