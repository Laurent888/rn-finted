export const categories = {
  men: {
    label: 'men',
    values: ['shoes', 'pants', 'shirts'],
  },
  women: {
    label: 'women',
    values: ['shoes', 'pants', 'shirts'],
  },
};

interface SingleCategory {
  label: string;
  values: string[];
}

export interface SearchCategoriesProps {
  men: SingleCategory;
  women: SingleCategory;
  kids: SingleCategory;
  home: SingleCategory;
}

export const searchCategories: SearchCategoriesProps = {
  men: {
    label: 'men',
    values: ['shoes', 'pants', 'shirts', 'grooming'],
  },
  women: {
    label: 'women',
    values: ['shoes', 'dresses', 'skirts', 'bags', 'beauty'],
  },
  kids: {
    label: 'kids',
    values: [
      'Girls clothing',
      'Boys clothing',
      'Toys & Game',
      'Baby care',
      'Buggies',
      'School supplies',
    ],
  },
  home: {
    label: 'home',
    values: ['Textiles', 'Home accessories', 'Tableware', 'Books'],
  },
};
