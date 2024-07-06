export interface Attribute {

    id: number,
    name: string,
    created_at: string,


}
export interface AddAttribute {

    name: string,
}




export interface AttributeList {

    data: {

        attributes: Attribute[],
        total_pages: number,
        current_page: number,
    }

}
export interface ShowAttribute {
    data?: {
        id: number;
        name: string;
        created_at: string;
    };
}


