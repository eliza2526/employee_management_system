const Employee = require('../models/employee');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const root = {
    user: async ({ id }) => {
        try {
            return await User.findById(id);
        } catch (err) {
            throw new Error('Error fetching user');
        }
    },
    users: async () => {
        try {
            return await User.find({});
        } catch (err) {
            throw new Error('Error fetching users');
        }
    },
    signup: async ({ username, email, password }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        try {
            return await user.save();
        } catch (err) {
            throw new Error('Error signing up user: ' + err.message);
        }
    },
    login: async ({ username, password }) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                throw new Error('Invalid password');
            }
            return user;
        } catch (err) {
            throw new Error('Login failed: ' + err.message);
        }
    },
    employee: async ({ id }) => {
        try {
            return await Employee.findById(id);
        } catch (err) {
            throw new Error('Error fetching employee');
        }
    },
    employees: async () => {
        try {
            return await Employee.find({});
        } catch (err) {
            throw new Error('Error fetching employees');
        }
    },
    employeesByDesignation: async ({ designation }) => {
        try {
            return await Employee.find({ designation });
        } catch (err) {
            throw new Error('Error fetching employees by designation');
        }
    },
    employeesByDepartment: async ({ department }) => {
        try {
            return await Employee.find({ department });
        } catch (err) {
            throw new Error('Error fetching employees by department');
        }
    },
    addEmployee: async (args) => {
        const employee = new Employee({
            firstname: args.firstname,
            lastname: args.lastname,
            email: args.email,
            gender: args.gender,
            city: args.city,
            designation: args.designation,
            department: args.department,
            salary: args.salary,
            created: args.created,
            updatedAt: args.updatedAt
        });
        try {
            return await employee.save();
        } catch (err) {
            throw new Error('Error adding employee: ' + err.message);
        }
    },
    updateEmployee: async ({ id, ...args }) => {
        try {
          // Validate inputs if necessary (e.g., check for required fields)
          const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { $set: args }, // Apply updates to specific fields
            { new: true } // Return the updated document
          );
          if (!updatedEmployee) {
            throw new Error('Employee not found for update');
          }
          return updatedEmployee; // Return updated employee object
        } catch (err) {
          throw new Error('Error updating employee: ' + err.message);
        }
      },      
    deleteEmployee: async ({ id }) => {
        try {
            await Employee.findByIdAndDelete(id);
            return 'Employee deleted successfully';
        } catch (err) {
            throw new Error('Error deleting employee: ' + err.message);
        }
    }
};

module.exports = root;