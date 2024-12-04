export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: {
    amount: number;
    currency: string;
  };
  amazonLinks: {
    [key: string]: string;
  };
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  amazonDomain: string;
  language: string;
}