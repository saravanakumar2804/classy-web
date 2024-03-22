import { gql } from '@apollo/client';

export const GetSteps = gql`
  query GetSteps {
    getSteps {
      id
      name
      description
    }
  }
`;
export const createStepsTable = gql`
  mutation CreateSteps($stepsDto: stepsDTO!) {
    createSteps(stepsDTO: $stepsDto) {
      id
      name
      description
    }
  }
`;

export const updateSteps = gql`
  mutation UpdateSteps(
    $description: String!
    $updateStepsId: String!
    $name: String!
  ) {
    updateSteps(description: $description, id: $updateStepsId, name: $name) {
      id
      name
      description
    }
  }
`;

export const deleteSteps = gql`
  mutation DeleteSteps($deleteStepsId: String!) {
    deleteSteps(id: $deleteStepsId)
  }
`;
