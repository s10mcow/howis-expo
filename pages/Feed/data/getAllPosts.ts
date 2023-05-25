import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql/* GraphQL */ `
  query GetAllPosts {
    getAllPosts {
      ...PostFields
    }
  }

  fragment PostFields on Post {
    id
    photoURL
    caption
    author {
      ...UserFields
    }
    location {
      latitude
      longitude
    }
    likes {
      id
      userId
      postId
    }
    comments {
      id
      userId
      postId
    }
    tags
    createdAt
    updatedAt
  }

  fragment UserFields on User {
    id
    first_name
    last_name
    profileImageURL
  }
`;
