export interface ProductsData {
    products:   Product[];
    categories: Category[];
}

export interface Category {
    id:           number;
    categoryName: string;
    seoUrl:       string;
}

export interface Product {
    id:              number;
    categoryId:      number;
    name:            string;
    description:     string;
    unitPrice:       number;
    unitsInStock:    number;
}
