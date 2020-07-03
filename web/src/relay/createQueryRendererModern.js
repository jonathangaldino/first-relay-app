import * as React from 'react';
import { QueryRenderer } from 'react-relay';

import Environment from './Environment';

export default function createQueryRenderer(
  FragmentComponent,
  Component,
  config,
) {
  const { query, queriesParams, getFragmentProps } = config;

  class QueryRendererWrapper extends React.Component {
    render() {
      const variables = queriesParams ? queriesParams(this.props) : config.variables;

      return (
        <QueryRenderer
          environment={Environment}
          query={query}
          variables={variables}
          render={({ error, props }) => {            
            if (error) {
              return <span>{error.toString()}</span>;
            }
            
            if (props) {
              const fragmentProps = getFragmentProps ? getFragmentProps(props) : { query: props }

              return <FragmentComponent {...this.props} {...fragmentProps} />;
            }

            return <span>loading</span>;
          }}
        />
      );
    }
  }

  return QueryRendererWrapper;
}
