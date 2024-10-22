import bcrypt from 'bcrypt'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    isValidated: true
  },
  {
    name: 'John Street',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    isValidated: true
  },
  {
    name: 'Jane Street',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    isValidated: true
  },
]
export default users
