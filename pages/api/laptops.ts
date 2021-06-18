import { NextApiRequest, NextApiResponse } from "next";
import { getLaptops } from "../../lib/getLaptops";

export default async function laptops(req: NextApiRequest, res: NextApiResponse) {

    try {
        const laptops = await getLaptops(req.query);

        return res.status(200).json(laptops);

    } catch (error) {
        return res.status(404).json({
            message: `Resource not found! ${error.message}`,
            status: 'failed'
        })
    }

}