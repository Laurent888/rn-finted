export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  images: [string];
  owner: string;
  ownerId: string;
  category: [string];
}
