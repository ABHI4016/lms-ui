import axios from 'axios';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Segment } from 'semantic-ui-react';
import UserReservation from '../../Components/UserReservation/UserReservation';
import Navigation from '../../Components/Navigation/Navigation';
import { GET_RESERVATIONS_URL } from '../../constants/Urls';
import './Catalog.css';
import { useHistory } from 'react-router-dom';

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userReservations: [],
    };
  }
  componentDidMount = () => {
    if (this.props.user) {
      this.getUserData();
    } else {
      this.props.history.push('/');
    }
  };

  getUserData = () => {
    axios.get(GET_RESERVATIONS_URL + this.props.user.id).then(response => {
      this.props.setCurrentAllocationForUser(response.data);
    });
  };

  releaseResource = resourceId => {
    axios
      .delete(GET_RESERVATIONS_URL + this.props.user.id + '/sku/' + resourceId)
      .then(response => {
        this.getUserData();
      });
  };

  allocateResource = resourceId => {
    axios
      .put(GET_RESERVATIONS_URL + this.props.user.id + '/sku/' + resourceId)
      .then(response => {
        this.getUserData();
      });
  };

  render() {
    console.log(this.props.loadingReservations);
    return (
      <>
        <Navigation history={this.props.history}></Navigation>
        <Segment loading={this.props.loadingReservations}>
          <Card.Group key={'resources'}>
            {this.props.reservations.map(resource => {
              return (
                <UserReservation
                  isActive={resource.isActive}
                  sku={resource.sku}
                  releaseResource={this.releaseResource}
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

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
