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
    mainImage: '/two.avif',
    thumbnails: ['/three.avif', '/one.avif'],
    ref: '607707',
  },
  {
    id: '2',
    title: 'Summer Collection',
    season: 'Summer',
    year: '2020',
    mainImage: '/four.jpg',
    thumbnails: ['/five.jpg', '/six.jpg'],
    ref: '607708',
  },
  {
    id: '3',
    title: 'Summer Collection',
    season: 'Summer',
    year: '2020',
    mainImage: '/nine.jpg',
    thumbnails: ['/seven.jpg', '/eight.jpg'],
    ref: '607708',
  },
];
