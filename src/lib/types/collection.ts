export interface CollectionSlide {
  id: string;
  title: string;
  year: string;
  season: string;
  mainImage: string;
  thumbnails: string[];
  ref: string;
}

export interface NavigationState {
  isTransitioning: boolean;
  currentIndex: number;
}

export const collections: CollectionSlide[] = [
  {
    id: '1',
    title: 'Summer Collection',
    season: 'Summer',
    year: '2020',
    mainImage: '/one.avif', 
    thumbnails: ['/one.avif', '/two.avif'],
    ref: '607707',
  },
  {
    id: '2',
    title: 'Summer Collection',
    season: 'Summer',
    year: '2020',
    mainImage: '/two.avif',
    thumbnails: ['/two.avif', '/one.avif'],
    ref: '607708',
  },
];
