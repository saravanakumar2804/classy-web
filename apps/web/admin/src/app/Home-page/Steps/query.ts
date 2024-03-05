import { gql } from "@apollo/client"

export const GetSteps = gql`
query GetLanguages {
    getLanguages {
      id
      name
      description
    }
  }
  `;
export const CREATE_STEPS = gql`
mutation createLanguage($name: String!, $description: String!) {
    createLanguage(input:{ name: $name, description: $description}) {
        id 
        name
        description
    }
}
`;

