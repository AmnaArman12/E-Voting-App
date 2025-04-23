const mongoose = require('mongoose')

const conn = mongoose.connect('mongodb://127.0.0.1:27017/elections',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
/*const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/e-voting', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
*/
