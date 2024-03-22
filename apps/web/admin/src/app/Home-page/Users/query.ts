import { gql } from '@apollo/client';

export const GetUsers = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
      mobileNumber
      uid
    }
  }
`;

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

export const updateUsers = gql`
  mutation UpdateUsers($updateUsersId: String!, $userDto: userDTO!) {
    updateUsers(id: $updateUsersId, userDTO: $userDto) {
      id
      name
      email
      mobileNumber
      uid
    }
  }
`;

export const deleteUsers = gql`
  mutation DeleteUsers($deleteUsersId: String!) {
    deleteUsers(id: $deleteUsersId)
  }
`;
