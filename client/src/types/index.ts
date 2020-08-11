// interface Tweet {
//   user: object;
//   text: string;
//   created_at: string;
// }

export interface Tweet {
  _id: string;
  id: string;
  author: string;
  avatar: string;
  screenName: string;
  active: boolean;
  date: Date;
  text: string;
  createdAt: string;
}

export interface FeedProps {
  tweets: Partial<Tweet>[];
  /** Unread Tweet count */
  count: number;
  page: number;
  paging: boolean;
  skip: number;
  done: boolean;
  searchTerm: string;
}

export interface FeedState extends FeedProps {}
