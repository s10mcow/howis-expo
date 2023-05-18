/* eslint-disable */
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
