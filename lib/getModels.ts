import { openDB } from "./openDB";

export interface ModelType {
    model: string;
    count: number;
}

export async function getModels(brandName: string) {
    const db = await openDB();

    const models = await db.all<ModelType[]>(
        "SELECT name AS model, COUNT(*) AS count FROM Laptop " +
        "INNER JOIN Brand ON Laptop.brand = Brand.id " +
        "WHERE Brand.brandName = ? " +
        "GROUP BY name;", [brandName]);

    return models;
}