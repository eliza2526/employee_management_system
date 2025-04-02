const mongoose = require('mongoose');
const Employee = require('./models/employee')

mongoose.connect('mongodb+srv://elizabeththomas2:mgQmgLF5xvKIfBvk@cluster0.u4oyz.mongodb.net/comp3133fullstack?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

const employees = [
    { firstname: 'Alice', lastname: 'Johnson', email: 'alice.johnson@example.com' },
    { firstname: 'Bob', lastname: 'Smith', email: 'bob.smith@example.com' },
    { firstname: 'Carol', lastname: 'Williams', email: 'carol.williams@example.com' },
    { firstname: 'David', lastname: 'Brown', email: 'david.brown@example.com' },
    { firstname: 'Emily', lastname: 'Jones', email: 'emily.jones@example.com' },
    { firstname: 'Frank', lastname: 'Miller', email: 'frank.miller@example.com' },
    { firstname: 'Grace', lastname: 'Lee', email: 'grace.lee@example.com' },
    { firstname: 'Hank', lastname: 'Anderson', email: 'hank.anderson@example.com' },
    { firstname: 'Ivy', lastname: 'Garcia', email: 'ivy.garcia@example.com' },
    { firstname: 'Jack', lastname: 'Wilson', email: 'jack.wilson@example.com' }
  ]

  // Insert data into the database
const insertEmployees = async () => {
    try {
      await Employee.insertMany(employees);
      console.log('Employees added successfully!');
    } catch (error) {
      console.error('Error inserting employees:', error);
    } finally {
      mongoose.disconnect(); // Close the database connection
    }
  };
  
  insertEmployees();