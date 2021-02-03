import React from 'react';
import { Button, Card, Image, Label } from 'semantic-ui-react';
import book from '../../assets/icons/book.png';
import './LibraryResource.css';

const LibraryResource = props => {
  return (
    <Card key={props.sku.item.id}>
      <Card.Content>
        <Image floated="right" size="mini" src={book} />
        <Card.Header>{props.sku.item.name}</Card.Header>
        <Card.Meta>{props.sku.item.author}</Card.Meta>
        <Card.Description>
          <strong>{props.sku.item.type}</strong>
          <br />
          <strong>Stock: {props.sku.stock}</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          {!props.reservable ? (
            props.maxLimitReached ? (
              <Label basic color="blue">
                Max Reservation Limit Reached
              </Label>
            ) : (
              <Button
                color="blue"
                onClick={e => props.reserveResource(props.sku.id)}
              >
                Reserve
              </Button>
            )
          ) : (
            <Label basic color="blue">
              Already Reserved
            </Label>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default LibraryResource;
