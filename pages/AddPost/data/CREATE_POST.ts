import { gql } from "@apollo/client";

export const CREATE_POST = gql/* GraphQL */ `
  mutation createPost(
    $photoURL: String!
    $caption: String
    $userId: Int!
    $tags: [String!]
    $location: LocationInput!
  ) {
    createPost(
      photoURL: $photoURL
      caption: $caption
      userId: $userId
      tags: $tags
      location: $location
    ) {
      id
      photoURL
      caption
      location {
        latitude
        longitude
      }
      tags
    }
  }
`;
