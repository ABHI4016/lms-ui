import axios from 'axios';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Segment } from 'semantic-ui-react';
import Navigation from '../../Components/Navigation/Navigation';
import { LOGIN_URL } from '../../constants/Urls';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
  }

  userLogin = () => {
    axios
      .post(LOGIN_URL, {
        ...this.state,
      })
      .then(response => {
        this.props.setUserData(response.data);
      });
  };

  render() {
    return (
      <>
        <Navigation history={this.props.history}></Navigation>
        {this.props.user ? (
          <Button onClick={this.props.clearUserData}>Logout</Button>
        ) : (
          <Segment>
            <Form>
              <Form.Field>
                <Input
                  type="text"
                  label={'User Name'}
                  value={this.state.user}
                  onChange={(e, data) => {
                    this.setState({ userName: data.value });
                  }}
                ></Input>
              </Form.Field>
              <Form.Field>
                <Input
                  onChange={(e, data) => {
                    this.setState({ password: data.value });
                  }}
                  label={'Password'}
                  type="password"
                ></Input>
              </Form.Field>
              <Button primary onClick={this.userLogin}>
                Login
              </Button>
            </Form>
          </Segment>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserData: data => dispatch({ type: 'SET_USER_DATA', data: data }),
    clearUserData: data => dispatch({ type: 'CLEAR_USER_DATA' }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
