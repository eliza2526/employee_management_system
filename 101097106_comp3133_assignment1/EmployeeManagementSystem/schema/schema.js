const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type User {
        id: ID!
        username: String
        email: String
        password: String
        created: String
        updatedAt: String
    }

    type Employee {
        id: ID!
        firstname: String
        lastname: String
        email: String
        gender: String
        city: String
        designation: String
        department: String
        salary: Float
        created: String
        updatedAt: String
    }

    type Query {
        user(id: ID!): User
        users: [User]
        employee(id: ID!): Employee
        employees: [Employee]
        employeesByDesignation(designation: String!): [Employee]
        employeesByDepartment(department: String!): [Employee]
        login(username: String!, password: String!): User
    }

    type Mutation {
        addUser(username: String, email: String, password: String): User
        signup(username: String!, email: String!, password: String!): User
        addEmployee(
            firstname: String!,
            lastname: String!,
            email: String!,
            gender: String!,
            city: String!,
            designation: String!,
            department: String!,
            salary: Float!,
            created: String,
            updatedAt: String
        ): Employee
        updateEmployee(
            id: ID!,
            firstname: String,
            lastname: String,
            email: String,
            gender: String,
            city: String,
            designation: String,
            department: String,
            salary: Float,
            created: String,
            updatedAt: String
        ): Employee
        deleteEmployee(id: ID!): String
    }
`);

module.exports = schema;