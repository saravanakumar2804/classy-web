import { gql } from "@apollo/client"

export const GetUsers = gql`
query GetLanguages {
    getLanguages {
      id
      name
     email
     mobileNumber
    }
  }
  `;
export const CREATE_USERS = gql`
mutation createUsers($name: String!, $email: String!, $mobileNumber: String) {
  createUsers(input:{ name: $name, email: $email, mobileNumber: $mobileNumber}) {
      id
      name
     email
     mobileNumber
    }
}
`;

