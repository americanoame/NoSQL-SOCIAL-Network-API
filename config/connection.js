// we're using object destructuring to destruct the this connection
const { connect, connection, set } = require('mongoose');

set('strictQuery', true);

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thoughtDB';


connect(connectionString, { // this is making a call to the back end database
  useNewUrlParser: true,    // once database is called and comes back
  useUnifiedTopology: true,
});

module.exports = connection; // we will populate the data inside this connection
