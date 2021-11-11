import React from 'react';
import Home from './pages/home';
import Header from './pages/header';
import Icons from './pages/icons';
import NotFound from './pages/not-found';
import PostStatus from './pages/post-status';
import SendRequest from './pages/send-req';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const windowChange = parseRoute(window.location.hash);
      this.setState({
        route: windowChange
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'post-status') {
      return <PostStatus />;
    }
    if (route.path === 'send-req') {
      return <SendRequest />;
    }
    return <NotFound />;
  }

  render() {
    return (
      <>
        <Header />
        {this.renderPage()}
        <Icons />
      </>
    );
  }
}
