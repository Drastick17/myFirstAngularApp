export interface Item {
  id?:          number;
  title:       string;
  price:       number;
  description: string;
  images:      string[];
  creationAt?:  Date;
  updatedAt?:   Date;
  category:    Category | number;
}

export interface Category {
  id:         number|null;
  name:       string;
  image?:      string;
  creationAt?: Date;
  updatedAt?:  Date;
}
