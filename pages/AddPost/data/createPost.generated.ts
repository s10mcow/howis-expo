import * as Types from "@types";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { fetchData } from "@data";

export type CreatePostMutationVariables = Types.Exact<{
  photoURL: Types.Scalars["String"];
  caption?: Types.InputMaybe<Types.Scalars["String"]>;
  userId: Types.Scalars["ID"];
  tags?: Types.InputMaybe<
    Array<Types.Scalars["String"]> | Types.Scalars["String"]
  >;
  location: Types.LocationInput;
}>;

export type CreatePostMutation = {
  __typename?: "Mutation";
  createPost?: {
    __typename?: "Post";
    id: number;
    photoURL: string;
    caption?: string | null;
    tags?: Array<string> | null;
    location: { __typename?: "Location"; latitude: number; longitude: number };
  } | null;
};

export const CreatePostDocument = /*#__PURE__*/ `
    mutation createPost($photoURL: String!, $caption: String, $userId: ID!, $tags: [String!], $location: LocationInput!) {
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
export const useCreatePostMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreatePostMutation,
    TError,
    CreatePostMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreatePostMutation,
    TError,
    CreatePostMutationVariables,
    TContext
  >(
    ["createPost"],
    (variables?: CreatePostMutationVariables) =>
      fetchData<CreatePostMutation, CreatePostMutationVariables>(
        CreatePostDocument,
        variables
      )(),
    options
  );
useCreatePostMutation.getKey = () => ["createPost"];

useCreatePostMutation.fetcher = (
  variables: CreatePostMutationVariables,
  options?: RequestInit["headers"]
) =>
  fetchData<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    variables,
    options
  );
