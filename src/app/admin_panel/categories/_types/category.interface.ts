export interface Category {

    id: number,
    name: string,
    slug: string,
    is_active: boolean,
    image: string,
    created_at: string,


}
export interface AddCategory {
    
    name: string,
    slug: string,
    is_active: boolean,
    description: string,
    parent_id: number,
    attribute_ids: number,
    variation_id: number,
    attribute_is_filter_ids: number,
    image: string,
    created_at: string,
}




export interface CategoryList {

    data: {

        categories: Category[],
        total_pages: number,
        current_page: number,
    }

}
export interface ShowCategory {
    data?: {
        id: number,
        parent_id: number,
        name: string,
        slug: string,
        description: string,
        is_active: boolean,
        image: string,
        created_at: string,
        attributes:[]
        attributes_is_filter:[]
        attributes_is_variation:number
    };
}

export interface Options {

    value: number,
    label: string,


}
export interface itemsCreateCategory {
    data?: {
        attributes: Options[],
        categories: Options[]
    }


}




export interface SelectedOption {
    value: number;
    label: string;
}


