import { createDatabase } from './common/db';
import { createServer } from './server'

(async () => {
  const db = createDatabase();
  await db.connect();

  const server = createServer();

  server.listen(4000, () => {
    console.log(`Server is running at port 4000 🚀`);
  })
})();
