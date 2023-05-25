import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Location = {
  __typename?: 'Location';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type LocationInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<Post>;
  createUser?: Maybe<User>;
  deletePost?: Maybe<Scalars['Boolean']>;
  updatePost?: Maybe<Post>;
  updateUser?: Maybe<User>;
  updateUserHomeLocation?: Maybe<User>;
  updateUserProfileImage?: Maybe<User>;
  updateUserVerifiedStatus?: Maybe<User>;
  verifyUser?: Maybe<User>;
};


export type MutationCreatePostArgs = {
  caption?: InputMaybe<Scalars['String']>;
  location: LocationInput;
  photoURL: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  userId: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  bio?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  profileImageURL?: InputMaybe<Scalars['String']>;
  sub: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationUpdatePostArgs = {
  caption?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  location?: InputMaybe<LocationInput>;
  photoURL?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};


export type MutationUpdateUserArgs = {
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserHomeLocationArgs = {
  homeLocation: LocationInput;
  userId: Scalars['ID'];
};


export type MutationUpdateUserProfileImageArgs = {
  profileImageURL: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationUpdateUserVerifiedStatusArgs = {
  id: Scalars['ID'];
  verified: Scalars['Boolean'];
};


export type MutationVerifyUserArgs = {
  id: Scalars['ID'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  caption?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  id: Scalars['Int'];
  location: Location;
  photoURL: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
  updatedAt: Scalars['Date'];
};

export enum PostOrderBy {
  CreatedAt = 'CREATED_AT'
}

export type Query = {
  __typename?: 'Query';
  getAllPosts: Array<Post>;
  getPost?: Maybe<Post>;
  getPostsNearLocation: Array<Post>;
  getUser?: Maybe<User>;
  hello?: Maybe<Scalars['String']>;
  searchPosts: Array<Post>;
  searchUsers: Array<User>;
};


export type QueryGetPostArgs = {
  id: Scalars['ID'];
};


export type QueryGetPostsNearLocationArgs = {
  after?: InputMaybe<Scalars['String']>;
  distance: Scalars['Float'];
  first?: InputMaybe<Scalars['Int']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  order?: InputMaybe<SortOrder>;
  orderBy?: InputMaybe<PostOrderBy>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QuerySearchPostsArgs = {
  query: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  query: Scalars['String'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  homeLocation?: Maybe<Location>;
  id: Scalars['Int'];
  last_name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  profileImageURL?: Maybe<Scalars['String']>;
  sub: Scalars['String'];
  updatedAt: Scalars['Date'];
  verified: Scalars['Boolean'];
};

export type CreatePostMutationVariables = Exact<{
  photoURL: Scalars['String'];
  caption?: InputMaybe<Scalars['String']>;
  userId: Scalars['ID'];
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  location: LocationInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', id: number, photoURL: string, caption?: string | null, tags?: Array<string> | null, location: { __typename?: 'Location', latitude: number, longitude: number } } | null };

export type PostFieldsFragment = { __typename?: 'Post', id: number, photoURL: string, caption?: string | null, tags?: Array<string> | null, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: number, sub: string, first_name: string, last_name: string, email: string, phoneNumber?: string | null, bio?: string | null, verified: boolean, createdAt: any, updatedAt: any, profileImageURL?: string | null, homeLocation?: { __typename?: 'Location', latitude: number, longitude: number } | null }, location: { __typename?: 'Location', latitude: number, longitude: number } };

export type UserFieldsFragment = { __typename?: 'User', id: number, sub: string, first_name: string, last_name: string, email: string, phoneNumber?: string | null, bio?: string | null, verified: boolean, createdAt: any, updatedAt: any, profileImageURL?: string | null, homeLocation?: { __typename?: 'Location', latitude: number, longitude: number } | null };

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostsQuery = { __typename?: 'Query', getAllPosts: Array<{ __typename?: 'Post', id: number, photoURL: string, caption?: string | null, tags?: Array<string> | null, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: number, sub: string, first_name: string, last_name: string, email: string, phoneNumber?: string | null, bio?: string | null, verified: boolean, createdAt: any, updatedAt: any, profileImageURL?: string | null, homeLocation?: { __typename?: 'Location', latitude: number, longitude: number } | null }, location: { __typename?: 'Location', latitude: number, longitude: number } }> };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  sub
  first_name
  last_name
  email
  phoneNumber
  bio
  homeLocation {
    latitude
    longitude
  }
  verified
  createdAt
  updatedAt
  profileImageURL
}
    `;
export const PostFieldsFragmentDoc = gql`
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
  tags
  createdAt
  updatedAt
}
    ${UserFieldsFragmentDoc}`;
export const CreatePostDocument = gql`
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
export const GetAllPostsDocument = gql`
    query GetAllPosts {
  getAllPosts {
    ...PostFields
  }
}
    ${PostFieldsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createPost(variables: CreatePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePostMutation>(CreatePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPost', 'mutation');
    },
    GetAllPosts(variables?: GetAllPostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllPostsQuery>(GetAllPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllPosts', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;