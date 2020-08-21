export interface User {
  id: string;
  email: string;
  username: string;
  userPicture: string;
  listings: [ListingProp];
}

export interface ListingProp {
  id: string;
  title: string;
  description: string;
  price: number;
  images: [string];
  owner: User | string;
  ownerId: string;
  category: [string];
}
