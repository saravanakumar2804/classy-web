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

export const createLanguageTable = gql`
  mutation CreateLanguage($languageDto: languageDTO!) {
    createLanguage(languageDTO: $languageDto) {
      id
      name
      description
    }
  }
`;

export const deleteLanguage = gql`
  mutation DeleteLanguage($deleteLanguageId: String!) {
    deleteLanguage(id: $deleteLanguageId)
  }
`;

export const updateLanguage = gql`
  mutation UpdateLanguage(
    $description: String!
    $updateLanguageId: String!
    $name: String!
  ) {
    updateLanguage(
      description: $description
      id: $updateLanguageId
      name: $name
    ) {
      id
      name
      description
    }
  }
`;
