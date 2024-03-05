import { gql } from "@apollo/client"

export const GetUsers = gql`
query GetLanguages {
    getLanguages {
      id
      name
      description
    }
  }
  `;
export const CREATE_USERS = gql`
mutation createLanguage($name: String!, $description: String!) {
    createLanguage(input:{ name: $name, description: $description}) {
        id 
        name
        description
    }
}
`;

