export interface Billboard {
    id: string
    label: string
    imageUrl: string
}

export interface Category {
    id: string
    name: string
    billboard: Billboard
}

export interface Product {
    id: string
    category: Category
    name: string
    description: string
    price: string
    isFeatured: boolean
    size: string
    color: Color
    images: Image[]
    selectedSize: string
}

export interface Image {
    id: string
    url: string
}


export interface Color {
    id: string
    name: string
    value: string
}