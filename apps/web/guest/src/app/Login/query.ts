import { gql } from '@apollo/client';


export const createUsersTable = gql`
mutation CreateUsers($userDto: userDTO!) {
  createUsers(userDTO: $userDto) {
    id
    name
    email
    mobileNumber
    uid
  }
}
`;