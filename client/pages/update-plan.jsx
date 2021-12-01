import React from 'react';

export default class UpdatePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testing: null
    };
  }

  componentDidMount() {
    fetch(`/api/updatePlans/${this.props.planId}`)
      .then(res => res.json())
      .then(testing => {
        this.setState({
          testing
        });
      });
  }

  render() {
    if (!this.state.testing) return null;
    const { photoUrl, fullName, time, description, location, title } = this.state.testing;
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
}
