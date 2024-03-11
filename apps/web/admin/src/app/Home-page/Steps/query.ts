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
mutation CreateSteps($name: String!, $description: String!) {
  createSteps(input:{ name: $name, description: $description}) {
        id 
        name
        description
    }
}
`;

