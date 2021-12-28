import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  ApolloClient, ApolloProvider, InMemoryCache, HttpLink,
} from '@apollo/client';
import Root from './routes/index';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById('root'),
);
