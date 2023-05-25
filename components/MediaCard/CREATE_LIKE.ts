import { gql } from "@apollo/client";

export const CREATE_LIKE = gql/* GraphQL */ `
  mutation CreateLike($userId: Int!, $postId: Int!) {
    createLike(userId: $userId, postId: $postId)
  }
`;
