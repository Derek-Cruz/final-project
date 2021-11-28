import React from 'react';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: []
    };
    this.testOnClick = this.testOnClick.bind(this);
  }

  componentDidMount() {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        this.setState({
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

  // deleteRequest(requestId) {
  //   const update = {
  //     status: 'deny'
  //   };
  //   fetch(`/api/deleteReq/${requestId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(update)
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       location.hash = '#';
  //     });
  // }

  testOnClick(requestId) {
    this.approveMyStatus(requestId);
    this.denyMyStatus(requestId);
  }

  render() {
    // console.log('state:', this.state);
    return (
      <div className="container container-home-jsx">
        <div className="row noti-row-style">
          <div className="col p-0">
            <h2 className="noti-h2-style">NOTIFICATION</h2>
            <div className="noti-jsx-margin">
            <div className="row">
              {
                this.state.request.map(notification => (
                  <div key={notification.planId} className="col-12">
                    <ListNotification notification={notification} onClick={this.testOnClick} />
                  </div>
                ))
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
  const { photoUrl, fullName, time, description, location, title, requestId } = props.notification;
  return (
    <div className="row">
      <div className="col-12 testtesteest">
        <div className="col-3 small-img-placement">
          <img src={photoUrl} alt="profile picture" className="small-img" />
        </div>
        <div className="col-9">
          <p className="p-noti-jsx">{ fullName }</p>
          <p className="p-noti-jsx">{ title }</p>
          <p className="p-noti-jsx"><i className="fas fa-clock small-icon"></i>{time} <i className="fas fa-location-arrow small-icon"></i>{location}</p>
          <p className="p-noti-jsx"><i className="fas fa-comment-alt small-icon"></i>{ description }</p>
        </div>
      </div>
      <div className="buttons">
        <div className="a-placement">
          <button onClick={() => props.onClick(requestId)} className="a-app-deny">Approve</button>
          <button onClick={() => props.onClick(requestId)} className="a-app-deny">Deny</button>
        </div>
      </div>
    </div>
  );
}
