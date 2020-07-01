import React, { Component } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { Environment } from './relay';

const App = ({ query }) => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Relay
        </a>
      </header>
    </div>
  );
};

const AppQR = () => {
  return (
     <QueryRenderer
        environment={Environment}
        query={graphql`
          query fetchItem {
            item(id: "5efb4da7decdc011d764447b") {
              id
              _id
              name
              price
              type
              owner {
                email
                createdAt
                updatedAt
              }
            }
          }
        `}
        variables={{}}
        render={({ error, props }) => {
          console.log('qr: ', error, props);
            if (error) {
              return <span>{error.toString()}</span>;
            }

            if (props) {
              return <App query={props} />;
            }

            return <span>loading</span>;
          }}
        />
  )
};

export default AppQR;
