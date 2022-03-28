import React from 'react';
import Spinner from './spinner';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      request: []
    };
    this.approveMyStatus = this.approveMyStatus.bind(this);
    this.denyMyStatus = this.denyMyStatus.bind(this);
  }

  componentDidMount() {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLoading: false,
          request: data
        });
      });
  }

  approveMyStatus(requestId) {
    const update = {
      status: 'Approved'
    };
    fetch(`/api/reqStatus/${requestId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(updateStatus => {
        location.hash = '#';
      });
  }

  denyMyStatus(requestId) {
    const update = {
      status: 'Denied'
    };
    fetch(`/api/reqStatus/${requestId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(updateStatus => {
        location.hash = '#';
      });
  }

  render() {
    return (
        <div className="container container-home-jsx">
          <div className="row noti-row-style">
            <div className="col p-0">
              <h2 className="noti-h2-style">NOTIFICATIONS</h2>
              <div className="noti-jsx-margin">
              <div className="row">
                {
                  this.state.isLoading
                    ? <Spinner />
                    : this.state.request.length > 0
                      ? this.state.request.map(notification => (
                        <div key={notification.planId} className="col-12">
                          <ListNotification notification={notification} approve={() => this.approveMyStatus(notification.requestId)}
                          deny={() => this.denyMyStatus(notification.requestId)} />
                        </div>
                      ))
                      : (<div className="no-results-style" >You have no notification.</div>)
                }
              </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

function ListNotification(props) {
  const { photoUrl, fullName, time, description, location, title } = props.notification;
  return (
    <div className="row">
      <div className="col-12 d-flex just-content">
        <div className="col-3 small-img-placement">
          <img src={photoUrl} alt="profile picture" className="small-img" />
        </div>
        <div className="col-7">
          <p className="p-noti-jsx">{fullName}</p>
          <p className="p-noti-jsx">{title}</p>
          <p className="p-noti-jsx"><i className="fas fa-clock small-icon"></i>{time} <i className="fas fa-location-arrow small-icon"></i>{location}</p>
          <p className="p-noti-jsx"><i className="fas fa-comment-alt small-icon"></i>{description}</p>
        </div>
      </div>
      <div className="buttons">
        <div className="a-placement">
          <button onClick={props.approve} className="a-app-deny">Approve</button>
          <button onClick={props.deny} className="a-app-deny">Deny</button>
        </div>
      </div>
    </div>
  );
}
