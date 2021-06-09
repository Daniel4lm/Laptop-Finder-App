import { openDB } from "./openDB";

export interface BrandType {
    brand: string;
    count: number;
}

export async function getBrands() {
    const db = await openDB();

    const brands = await db.all<BrandType[]>(
        "SELECT Brand.brandName AS brand, COUNT(*) AS count FROM Laptop " +
        "INNER JOIN Brand ON Laptop.brand = Brand.id " +
        "GROUP BY Brand.brandName;");

    return brands;
}