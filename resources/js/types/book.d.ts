//INDEX
export interface propsPage {
    books: {
        data: itemBook[]
        // meta: meta
    },
    page_settings: {
        title: string;
        subtitle: string;
    },
    // state: {
    //     page: number;
    //     search: string;
    //     load: string;
    //     field: string;
    //     direction: string;
    // }
}

type meta = {
    from: number;
    total: number;
    current_page: number;
    per_page: number;
    has_pages: boolean;
    links: links[]
};

type links = {
    url: string,
    label: string,
    active: boolean
};

export interface itemBook {
    id: number;
    book_code: string;
    title: string;
    slug: string;
    author: string;
    publication_year: number;
    isbn: string;
    language: string;
    synopsis: string;
    number_of_pages: number;
    status: string;
    cover: string;
    price: number;
    created_at: string;
    stock: {
        id: number;
        total: number;
    },
    category: {
        id: number;
        name: string;
    },
    publisher: {
        id: number;
        name: string;
    }
}

// Create
export interface propsPageCreate {
    page_settings: PageSettings;
    page_data: {
        languages: string[];
        categories: {
            value: number;
            name: string;
        }[];
        publishers: {
            value: number;
            name: string;
        }[];
    }
}

export interface booksForm {
    title: string;
    author: string;
    publication_year: string | null;
    isbn: string;
    language: string;
    synopsis: string;
    number_of_pages: string | null;
    price: number | null;
    total: number | null;
    category_id: number | null;
    publisher_id: number | null
    cover: File | null;
    _method: string;
};


type PageSettings = {
    title: string;
    subtitle: string;
    method: string;
    action: string;
};

// Edit
export interface propsPageEdit {
    books: itemBookEdit,
    page_settings: PageSettings
    page_data: {
        languages: string[];
        categories: {
            value: number;
            name: string;
        }[];
        publishers: {
            value: number;
            name: string;
        }[];
    }
}

type itemBookEdit = {
    id: number;
    book_code: string;
    title: string;
    slug: string;
    author: string;
    publication_year: string | null;
    isbn: string;
    language: string;
    synopsis: string;
    number_of_pages: string | null;
    status: string;
    cover: string;
    price: number;
    created_at: string;
    category_id: number;
    publisher_id: number;

}

export interface booksFormEdit {
    id: number;
    title: string;
    author: string;
    publication_year: string | null;
    isbn: string;
    language: string;
    synopsis: string;
    number_of_pages: string | null;
    price: number | null;
    category_id: number | null;
    publisher_id: number | null
    cover: File | null;
    _method: string;
};
