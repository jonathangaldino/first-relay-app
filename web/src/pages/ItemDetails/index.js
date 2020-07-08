import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { useHistory } from 'react-router-dom';

import { Container, Head, Content } from './styles';
import createQueryRenderer from '../../relay/createQueryRendererModern';

const ItemDetails = ({ details }) => {
  const history = useHistory();

  return (
    <Container>
      <Head>
        <h1>About the item</h1>
        
      </Head>

      <Content>
        <div>
          <p>
            This item is called <strong>{details.name} </strong> 
            and it is a <strong>{details.type}</strong>.
          </p>

          <p>
            It costs <strong>$ {details.price}</strong> ingame credits.
          </p>
        </div>

        <small>
          {details._id}
        </small>
      </Content>


      <button type="submit" onClick={() => history.push('/list')}>Back</button>
    </Container>
  )
}

const ItemDetailsFragmentContainer = createFragmentContainer(ItemDetails, {
  details: graphql`
    fragment ItemDetails_details on Item {
      id
      _id
      name
      price
      type
    }
  `
})

const ItemDetailsQR = createQueryRenderer(
  ItemDetailsFragmentContainer,
  ItemDetails,
  {
    query: graphql`
      query ItemDetailsQuery($id: ID!) {
        details: node(id: $id) {
          ...ItemDetails_details
        }
      }
    `,
    queriesParams: ({ match }) => ({
      id: match.params.id,
    }),
    getFragmentProps: ({ details }) => ({
      details,
    })
  }
)

export default ItemDetailsQR;