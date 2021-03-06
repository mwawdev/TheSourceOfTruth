import React, { Component } from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth } from 'firebase';
import { TASKS } from '@the-source-of-truth/shared/constants';

export default class SidebarLeftOverlay extends Component {
  static propTypes = {
    isAnonymous: PropTypes.bool.isRequired,
    sideBarVisibility: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOffClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOffClick);
  }

  handleLogout = () => {
    auth().signOut();
    this.props.toggleMenu();
  };

  handleOffClick = (e) => {
    if (this.ref && !this.ref.contains(e.target) && this.props.sideBarVisibility) {
      this.props.toggleMenu();
    }
  };

  handleRef = (el) => { this.ref = el; }

  renderLogout = () => (
    <Menu.Item
      as="div"
      name="logout"
      onClick={this.handleLogout}
    >
      Sign Out
    </Menu.Item>
  )


  renderMenuItem = (name, label, path) => (
    <Link href={`/eng${path}`} to={`/eng${path}`}>
      <Menu.Item as="div" name={name} onClick={this.props.toggleMenu}>
        {label}
      </Menu.Item>
    </Link>
  );

  render() {
    const { renderMenuItem } = this;
    return (
      <div ref={this.handleRef}>
        <Sidebar as={Menu} animation="overlay" width="thin" visible={this.props.sideBarVisibility} icon="labeled" vertical inverted>
          {renderMenuItem('home', 'Home', '/')}
          {renderMenuItem('library', 'Library', '/library')}
          {renderMenuItem(TASKS, 'Tasks', `/${TASKS}`)}
          { !this.props.isAnonymous
              ? this.renderLogout()
              : renderMenuItem('signin', 'Sign In', '/signin')
          }
        </Sidebar>
      </div>
    );
  }
}
