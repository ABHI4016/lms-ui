import React from 'react';
import { Button, Card, Image, Label } from 'semantic-ui-react';
import book from '../../assets/icons/book.png';
import './UserReservation.css';

const UserReservation = props => {
  return (
    <Card key={props.sku.item.id}>
      <Card.Content>
        <Image floated="right" size="mini" src={book} />
        <Card.Header>{props.sku.item.name}</Card.Header>
        <Card.Meta>{props.sku.item.author}</Card.Meta>
        <Card.Description>
          <strong>{props.sku.item.type}</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          {props.isActive ? (
            <Button
              color="blue"
              onClick={e => props.releaseResource(props.sku.id)}
            >
              Return
            </Button>
          ) : (
            <Label basic color="blue">
              Already Returned
            </Label>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default UserReservation;
