export interface Tag {

    id: number,
    name: string,
    created_at: string,


}
export interface AddTag {

    name: string,

}




export interface TagList {

    data: {
        tags: Tag[],
        total_pages: number,
        current_page: number,
    }

}
export interface ShowTag {
    data?: {
        id: number;
        name: string;
        created_at: string;
    };
}


