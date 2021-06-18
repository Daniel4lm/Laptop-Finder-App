import { ParsedUrlQuery } from "querystring";
import { asString } from "../helpers/asString";
import LaptopModel from "../model/Laptop";
import { openDB } from "./openDB";

const laptopsQuery = `
    FROM Laptop 
    INNER JOIN Brand ON Laptop.brand = Brand.id 
    WHERE (@brand IS NULL OR @brand = Brand.brandName) 
        AND (@model IS NULL OR @model = name) 
        AND (@minPrice IS NULL OR @minPrice <= price) 
        AND (@maxPrice IS NULL OR @maxPrice >= price) 
`;

export async function getLaptops(query: ParsedUrlQuery) {

    const dbConn = await openDB();

    const pageRows = getNumberValue(query.pageRows) || 4;
    const page = getNumberValue(query.page) || 1;
    const offset = (page - 1) * pageRows;

    const queryParams = {
        '@brand': asString(query.brand),
        '@model': asString(query.model),
        '@minPrice': getNumberValue(query.minPrice),
        '@maxPrice': getNumberValue(query.maxPrice)
    }

    const laptops = await dbConn.all<LaptopModel[]>(`
        SELECT Laptop.id, Brand.brandName AS brand, name, display, processor, memory, memory_type, graphics, storage, storage_unit, imgUrl, price 
        ${laptopsQuery}
        LIMIT @pageRows OFFSET @offset ;
    `, {
        ...queryParams,
        '@pageRows': pageRows,
        '@offset': offset
    });

    const totalRows = await dbConn.get<{ count: number }>(`
        SELECT COUNT(*) AS count 
        ${laptopsQuery}
    `, queryParams);

    return { 
        laptops, 
        totalPages: Math.ceil(totalRows.count / pageRows),
        totalCount: totalRows.count
     }
}

function getNumberValue(value: string | string[]) {
    const realValue = asString(value);
    const isNum = parseInt(realValue);
    return isNaN(isNum) ? null : isNum;
}

