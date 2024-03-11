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

export const CREATE_LANGUAGE = gql`
  mutation CreateLanguage($name: String!, $description: String!) {
    createLanguage(input: { name: $name, description: $description }) {
      name
      description
    }
  }
`;
