const mongoose = require('mongoose');
const md5 = require('md5');
const Admin = require('./models/admin'); // import from models folder

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/elections', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create the admin user
const adminUser = new Admin({
  username: 'admin',
  password: md5('admin123')
});

// Insert only if it doesn't already exist
Admin.findOne({ username: 'admin' }).then(existing => {
  if (existing) {
    console.log('⚠️ Admin user already exists.');
    mongoose.disconnect();
  } else {
    adminUser.save().then(() => {
      console.log('✅ Admin user created successfully!');
      mongoose.disconnect();
    }).catch(err => {
      console.error('❌ Error saving admin:', err);
      mongoose.disconnect();
    });
  }
});
