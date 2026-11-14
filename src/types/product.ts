export type Category = "Gadgets" | "Books & stationery" | "Fashion" | "Room & kitchen";

export type Product = {
    id: number;
    name: string;
    price: number;
    category: Category;
    image: string;
    stock: number;  
};

export type CartItem = {
    product: Product;
    quantity: number;
};