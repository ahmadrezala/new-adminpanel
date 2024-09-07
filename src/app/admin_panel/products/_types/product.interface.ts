export interface Product {

    id: number,
    name: string,
    slug: string,
    is_active: boolean,
    brand: string,
    category: string,
    primary_image: string,
    created_at: string,

}
export interface Image {

    id: number,
    image: string

}


export interface AddProduct {
    name: string;
    slug: string;
    is_active: number;
    description: string;
    brand_id: string;
    tag_ids: string[];
    category_id: number;
    attribute_ids: number[];
    variation_values: {
        [key: string]: { [key: string]: string | number };
    };
    delivery_amount: number;
    delivery_amount_per_product: number;
    primary_image: FileList;
    images: FileList;
}


export interface UpdateProduct {
    name: string;
    brand_id: number;
    is_active: boolean;
    slug: string;
    tag_ids: number[];
    description: string;
    attribute_ids: [];
    variation_values: Record<number, {
      price: number ;
      quantity: number;
      sku: string;
      sale_price: number;
      date_on_sale_from: string;
      date_on_sale_to: string;
    }>;
    delivery_amount: number;
    delivery_amount_per_product: number;
  }
  

  export interface UpdateProductCategory {

    category_id: number;
    attribute_ids: number[];
    variation_values: {
        [key: string]: { [key: string]: string | number };
    };

  }



export interface UpdateProductImage {
    primary_image: File,
    images: FileList
}





export interface ProductList {

    data: {

        products: Product[],
        total_pages: number,
        current_page: number,
    }

}
export interface ShowProduct {
    data?: {
        id: number,
        parent_id: number,
        name: string,
        slug: string,
        description: string,
        is_active: boolean,
        image: string,
        tags: [],
        brand: string
        created_at: string,
        attributes: []
        variations: []
        delivery_amount: number,
        delivery_amount_per_product: number,
    };
}


export interface ShowProductImages {

    data?: {
        primary_image: string,
        images: []
    }
}

export interface ShowProductCategory {

    data?: {
        category: number,

    }
}

export interface Options {

    value: number,
    label: string,


}
export interface itemsCreateProduct {
    data?: {
        brands: Options[],
        categories: Options[],
        tags: Options[],
    }


}
export interface AttributesCategory {
    data?: {
        attributes: Options[],
        attributes_is_filter: Options[],
        attributes_is_variation: number
    }


}




export interface SelectedOption {
    value: number;
    label: string;
}


