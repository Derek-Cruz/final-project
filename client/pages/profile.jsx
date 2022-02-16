import React from 'react';
import Spinner from './spinner';
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myProfile: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        this.setState({
          myProfile: data,
          isLoading: false
        });
      });
  }

  render() {
    // console.log('state', this.state);
    return (
      <div className="container container-home-jsx">
        <div className="row noti-row-style">
          <div className="col p-0">
            <h2 className="noti-h2-style">MY PROFILE</h2>
            <div className="noti-jsx-margin">
              <div className="row">
                {
                  this.state.isLoading
                    ? <Spinner />
                    : this.state.myProfile.length > 0
                      ? this.state.myProfile.map(status => (
                        <div key={status.userId} className="col-12">
                          <TestingProfile status={status} />
                        </div>
                      ))
                      : (<div className="margin-top">Not loading proper</div>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function TestingProfile(props) {
  const { photoUrl, fullName, location, aboutMe } = props.status;
  return (
    <div className="row">
      <div className="col-12">
        <div className="small-img-placement">
          <img src={photoUrl} alt=".." className="small-img" />
        </div>
        <div className="col-9">
          <p className="p-liststatus">{fullName}</p>
          <p className="p-liststatus">{location}</p>
          <p className="p-liststatus">{aboutMe}</p>
        </div>
      </div>
    </div>
  );
}
