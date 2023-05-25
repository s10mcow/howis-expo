/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation createPost($photoURL: String!, $caption: String, $userId: ID!, $tags: [String!], $location: LocationInput!) {\n  createPost(\n    photoURL: $photoURL\n    caption: $caption\n    userId: $userId\n    tags: $tags\n    location: $location\n  ) {\n    id\n    photoURL\n    caption\n    location {\n      latitude\n      longitude\n    }\n    tags\n  }\n}": types.CreatePostDocument,
    "query GetAllPosts {\n  getAllPosts {\n    ...PostFields\n  }\n}\n\nfragment PostFields on Post {\n  id\n  photoURL\n  caption\n  author {\n    ...UserFields\n  }\n  location {\n    latitude\n    longitude\n  }\n  tags\n  createdAt\n  updatedAt\n}\n\nfragment UserFields on User {\n  id\n  sub\n  first_name\n  last_name\n  email\n  phoneNumber\n  bio\n  homeLocation {\n    latitude\n    longitude\n  }\n  verified\n  createdAt\n  updatedAt\n  profileImageURL\n}": types.GetAllPostsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation createPost($photoURL: String!, $caption: String, $userId: ID!, $tags: [String!], $location: LocationInput!) {\n  createPost(\n    photoURL: $photoURL\n    caption: $caption\n    userId: $userId\n    tags: $tags\n    location: $location\n  ) {\n    id\n    photoURL\n    caption\n    location {\n      latitude\n      longitude\n    }\n    tags\n  }\n}"): (typeof documents)["mutation createPost($photoURL: String!, $caption: String, $userId: ID!, $tags: [String!], $location: LocationInput!) {\n  createPost(\n    photoURL: $photoURL\n    caption: $caption\n    userId: $userId\n    tags: $tags\n    location: $location\n  ) {\n    id\n    photoURL\n    caption\n    location {\n      latitude\n      longitude\n    }\n    tags\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetAllPosts {\n  getAllPosts {\n    ...PostFields\n  }\n}\n\nfragment PostFields on Post {\n  id\n  photoURL\n  caption\n  author {\n    ...UserFields\n  }\n  location {\n    latitude\n    longitude\n  }\n  tags\n  createdAt\n  updatedAt\n}\n\nfragment UserFields on User {\n  id\n  sub\n  first_name\n  last_name\n  email\n  phoneNumber\n  bio\n  homeLocation {\n    latitude\n    longitude\n  }\n  verified\n  createdAt\n  updatedAt\n  profileImageURL\n}"): (typeof documents)["query GetAllPosts {\n  getAllPosts {\n    ...PostFields\n  }\n}\n\nfragment PostFields on Post {\n  id\n  photoURL\n  caption\n  author {\n    ...UserFields\n  }\n  location {\n    latitude\n    longitude\n  }\n  tags\n  createdAt\n  updatedAt\n}\n\nfragment UserFields on User {\n  id\n  sub\n  first_name\n  last_name\n  email\n  phoneNumber\n  bio\n  homeLocation {\n    latitude\n    longitude\n  }\n  verified\n  createdAt\n  updatedAt\n  profileImageURL\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;