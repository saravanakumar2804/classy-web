import { gql } from '@apollo/client';

export const GetLanguages = gql`
  query GetLanguages {
    getLanguages {
      id
      name
      description
    }
  }
`;
