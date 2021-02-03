import { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Input, Menu } from 'semantic-ui-react';

class Navigation extends Component {
  handleItemClick = target => {
    this.props.history.push(target);
  };

  isCurrentPath = path => {
    return this.props.history.location.pathname === path;
  };

  render() {
    return (
      <Menu pointing>
        <Menu.Item
          name="Home"
          active={this.isCurrentPath('/')}
          onClick={e => this.handleItemClick('/')}
        />
        <Menu.Item
          name="Catalog"
          active={this.isCurrentPath('/catalog')}
          onClick={e => this.handleItemClick('catalog')}
        />
        <Menu.Item
          name="Gallery"
          active={this.isCurrentPath('/gallery')}
          onClick={e => this.handleItemClick('gallery')}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPage: state.currentPage,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps)(Navigation);
