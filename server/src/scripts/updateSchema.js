import fs from 'fs';
import path from 'path';

import { printSchema } from 'graphql/utilities';
import { schema as graphQLSchema } from '../graphql/schema';

const writeFileAsync = fs.promises.writeFile;

(async () => {
  const configs = [
    {
      schema: graphQLSchema,
      path: '../schema',
    },
    {
      schema: graphQLSchema,
      path: '../../../web/data'
    }
  ];

  await Promise.all([
    ...configs.map(async config => {
      await writeFileAsync(
        path.join(__dirname, `${config.path}/schema.graphql`),
        printSchema(config.schema),
      );
    }),
  ]);

  process.exit(0);
})();
