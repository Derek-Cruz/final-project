import React from 'react';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: []
    };
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

  render() {
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
                    <ListNotification notification={notification} />
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
  const { photoUrl, fullName, time, description, location, title } = props.notification;
  return (
    <div className="row">
      <div className="col-12 testtesteest">
        <div className="col-3 small-img-placement">
          <img src={photoUrl} alt=".." className="small-img" />
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
          <a href="" className="a-app-deny">Approve</a>
          <a href="" className="a-app-deny">Deny</a>
        </div>
      </div>
    </div>
  );
}
