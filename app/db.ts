const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://admin:password@127.0.0.1:27017/dione_test',
  {
    useNewUrlParser: true,
    authSource: 'admin'
  }
)

const connection = mongoose.connection
connection.on('error', console.error.bind(console, 'connection error:'))
export default connection
