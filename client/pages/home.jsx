import React from 'react';
import Spinner from './spinner';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
          availableUser: data,
          isLoading: false
        });
      });

    fetch('/api/approvedPlans')
      .then(res => res.json())
      .then(newPlan => {
        this.setState({
          approved: newPlan,
          isLoading: false
        });
      });

    fetch('/api/pendingPlans')
      .then(res => res.json())
      .then(penPlan => {
        this.setState({
          status: penPlan,
          isLoading: false
        });
      });
  }

  deleteRequest(requestId) {
    const currentStatus = this.state.status;

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
          status: currentStatus.filter(data => data.requestId !== requestId)
        });
      });
  }

  render() {
    return (
      <div className="container container-home-jsx">
        <div className="row plans-home-jsx">
          <div className="col p-0">
            <h2 className="h2-plans-jsx">MY PLANS</h2>
            <div className="home-jsx-margin">
              {
                this.state.isLoading
                  ? <Spinner />
                  : this.state.approved.length > 0
                    ? this.state.approved.map(status => (
                      <div key={status.requestId} className="col-12">
                        <ApprovedPlan status={status} />
                      </div>
                    ))
                    : (<div className="margin-top">You have no plans!</div>)
              }
            </div>
          </div>
        </div>
        <div className="row pending-home-jsx">
          <div className="col p-0">
            <h2 className="h2-pending-jsx">PENDING</h2>
            <div className="home-jsx-margin ">
              {
                this.state.isLoading
                  ? <Spinner />
                  : this.state.status.length > 0
                    ? this.state.status.map(status => (
                      <div key={status.requestId} className="col-12">
                        <DeniedPlan status={status} onClick={this.deleteRequest} />
                      </div>
                    ))
                    : (<div className="margin-top">There are no pending plans.</div>)
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
                  this.state.isLoading
                    ? <Spinner />
                    : this.state.availableUser.length > 0
                      ? this.state.availableUser.map(status => (
                        <div key={status.availabilityId} className="col-12">
                          <ListStatus status={status} />
                        </div>
                      ))
                      : (<div className="margin-top">There are no available friends.</div>)
                }
              </div>
            </div>
          </div>
        </div>
        <div className="post-status-placement">
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
  const { photoUrl, fullName, time, description, location, title, planId } = props.status;
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
      <div className="homepage-button-position">
        <a href={`#update-plan?planId=${planId}`} className="request-a-home">Update</a>
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
