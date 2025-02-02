export interface CollectionSlide {
  id: string;
  title: string;
  year: string;
  season: string;
  mainImage: string;
  thumbnails: string[];
  ref: string;
  description: string;
}

export interface NavigationState {
  isTransitioning: boolean;
  currentIndex: number;
}

export const collections: CollectionSlide[] = [
  {
    id: '1',
    title: 'Collection',
    season: 'Summer',
    year: '2020',
    mainImage: '/two.avif',
    thumbnails: ['/three.avif', '/one.avif'],
    ref: '7607/700',
    description: 'Black loose dress',
  },
  {
    id: '2',
    title: 'Collection',
    season: 'Summer',
    year: '2020',
    mainImage: '/four.jpg',
    thumbnails: ['/five.jpg', '/six.jpg'],
    ref: '7607/708',
    description: 'Black loose dress',
  },
  {
    id: '3',
    title: 'Collection',
    season: 'Summer',
    year: '2020',
    mainImage: '/nine.jpg',
    thumbnails: ['/seven.jpg', '/eight.jpg'],
    ref: '7607/709',
    description: 'Black loose dress',
  },
];
