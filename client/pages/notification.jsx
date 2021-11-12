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
        <div className="row plans-home-jsx">
          <div className="col p-0">
            <h2 className="h2-plans-jsx">My Plans</h2>
            <div className="home-jsx-margin ">
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
      <div className="col-12">
        <div className="col-3 home-img-placement">
          <img src={ photoUrl } alt=".." className="home-img" />
        </div>
        <div className="col-9">
          <p className="">{ fullName }</p>
          <p className="">{ location }</p>
          <p className="">{ title }</p>
          <p className=""><i className="fas fa-clock home-fa-clock"></i>{ time }</p>
          <p className=""><i className="fas fa-comment-alt home-fa-comment-alt"></i>{ description }</p>
        </div>
      </div>
    </div>
  );
}
