export interface ProductsData {
    products:   Product[];
    categories: Category[];
}

export interface Category {
    id:           string;
    name:         string;
    seoUrl:       string;
}

export interface Product {
    id:              string;
    categoryId:      string;
    name:            string;
    description:     string;
    unitPrice:       number;
    unitsInStock:    number;
}
