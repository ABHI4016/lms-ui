import axios from 'axios';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Segment } from 'semantic-ui-react';
import UserReservation from '../../Components/UserReservation/UserReservation';
import Navigation from '../../Components/Navigation/Navigation';
import { CATALOG_URL, GET_RESERVATIONS_URL } from '../../constants/Urls';
import './Gallery.css';
import LibraryResource from '../../Components/LibraryResource/LibraryResource';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      resources: [],
      reservedSkus: new Set(),
    };
  }

  componentDidUpdate = prevProps => {
    if (prevProps.reservations !== this.props.reservations) {
      this.hydrateReservedSkus();
    }
  };

  hydrateReservedSkus = () => {
    let reservedSkus = new Set();
    this.props.reservations.forEach(resource => {
      if (resource.isActive) {
        reservedSkus.add(resource.sku.id);
      }
    });

    this.setState({ reservedSkus: reservedSkus });
  };

  componentDidMount = () => {
    if (this.props.user) {
      this.getResources();
      this.getUserData();
      this.hydrateReservedSkus();
    } else {
      this.props.history.push('/');
    }
  };

  getUserData = () => {
    axios.get(GET_RESERVATIONS_URL + this.props.user.id).then(response => {
      this.props.setCurrentAllocationForUser(response.data);
    });
  };

  getResources = () => {
    axios.get(CATALOG_URL).then(response => {
      this.setState({ resources: response.data, loading: false });
    });
  };

  reserveResource = resourceId => {
    axios
      .put(GET_RESERVATIONS_URL + this.props.user.id + '/sku/' + resourceId)
      .then(response => {
        this.getUserData();
        this.getResources();
      });
  };

  render() {
    return (
      <>
        <Navigation history={this.props.history}></Navigation>
        <Segment loading={this.state.loading || this.props.loadingReservations}>
          <Card.Group key={'resources'}>
            {this.state.resources.map(resource => {
              return (
                <LibraryResource
                  reservable={this.state.reservedSkus.has(resource.id)}
                  maxLimitReached={this.state.reservedSkus.size === 2}
                  sku={resource}
                  reserveResource={this.reserveResource}
                />
              );
            })}
          </Card.Group>
        </Segment>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter,
    reservations: state.reservations,
    loadingReservations: state.loadingReservations,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: payload => dispatch({ type: 'INCREMENT' }),
    setCurrentAllocationForUser: data =>
      dispatch({ type: 'SAVE_USER_RESERVATIONS', data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
