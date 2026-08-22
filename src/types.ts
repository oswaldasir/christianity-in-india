export interface Era {
  id: string;
  number: number;
  title: string;
  subtitle: string;
}

export interface Item {
  id: string;
  name: string;
  role: string;
  eraId: string;
  year: string;
  badgeType: 'foreign' | 'native' | 'poet';
  badgeLabel: string;
  icon: 'cross' | 'church' | 'music' | 'medical' | 'book';
  description: string;
  highlights?: string[];
  image: string;
}
