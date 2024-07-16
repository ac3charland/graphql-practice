import { GraphQLResolveInfo } from 'graphql';
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
};

export type Creator = {
  __typename?: 'Creator';
  directed: Array<Film>;
  name: Scalars['String'];
  produced: Array<Film>;
};

export type CreatorFind = {
  film?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Film = {
  __typename?: 'Film';
  banner: Scalars['String'];
  description: Scalars['String'];
  director: Scalars['String'];
  id: Scalars['String'];
  image: Scalars['String'];
  originalTitle: Scalars['String'];
  originalTitleRomanised: Scalars['String'];
  producer: Scalars['String'];
  rtScore: Scalars['Int'];
  runningTime: Scalars['Int'];
  title: Scalars['String'];
  yearReleased: Scalars['Int'];
};

export type FilmFind = {
  director?: InputMaybe<Scalars['String']>;
  producer?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  yearReleased?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  directors: Array<Creator>;
  films: Array<Film>;
  producers: Array<Creator>;
};


export type QueryDirectorsArgs = {
  find?: InputMaybe<CreatorFind>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryFilmsArgs = {
  find?: InputMaybe<FilmFind>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryProducersArgs = {
  find?: InputMaybe<CreatorFind>;
  sort?: InputMaybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Creator: ResolverTypeWrapper<Creator>;
  CreatorFind: CreatorFind;
  Film: ResolverTypeWrapper<Film>;
  FilmFind: FilmFind;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Creator: Creator;
  CreatorFind: CreatorFind;
  Film: Film;
  FilmFind: FilmFind;
  Int: Scalars['Int'];
  Query: {};
  String: Scalars['String'];
}>;

export type CreatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Creator'] = ResolversParentTypes['Creator']> = ResolversObject<{
  directed?: Resolver<Array<ResolversTypes['Film']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  produced?: Resolver<Array<ResolversTypes['Film']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FilmResolvers<ContextType = any, ParentType extends ResolversParentTypes['Film'] = ResolversParentTypes['Film']> = ResolversObject<{
  banner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  director?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalTitleRomanised?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  producer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rtScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  runningTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  yearReleased?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  directors?: Resolver<Array<ResolversTypes['Creator']>, ParentType, ContextType, Partial<QueryDirectorsArgs>>;
  films?: Resolver<Array<ResolversTypes['Film']>, ParentType, ContextType, Partial<QueryFilmsArgs>>;
  producers?: Resolver<Array<ResolversTypes['Creator']>, ParentType, ContextType, Partial<QueryProducersArgs>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Creator?: CreatorResolvers<ContextType>;
  Film?: FilmResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

