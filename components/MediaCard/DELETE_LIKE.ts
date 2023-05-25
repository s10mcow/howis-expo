import { gql } from "@apollo/client";

export const DELETE_LIKE = gql/* GraphQL */ `
  mutation DeleteLike($id: Int!) {
    deleteLike(id: $id)
  }
`;
