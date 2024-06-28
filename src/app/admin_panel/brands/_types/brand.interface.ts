export interface Brand {

    id: number,
    name: string,
    slug: string,
    is_active: boolean,
    created_at: string,


}
export interface AddBrand {

    name: string,
    slug: string,
    is_active: boolean,

}




export interface BrandList {

    data: {

        brands: Brand[],
        total_pages: number,
        current_page: number,
    }

}
export interface ShowBrand {
    data?: {
        id: number;
        name: string;
        slug: string;
        is_active: boolean;
        created_at: string;
    };
}


