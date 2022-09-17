import PostSearchBody from './post-search-body.interface';

export default interface PostSearchResult {
  id: any;
  hits: {
    total: number;
    hits: Array<{ _source: PostSearchBody }>;
  };
}
