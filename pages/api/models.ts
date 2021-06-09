import { NextApiRequest, NextApiResponse } from "next";
import { getModels } from "../../lib/getModels";

export default async function models(req: NextApiRequest, res: NextApiResponse) {

    const reqBrand = (Array.isArray(req.query.brand) ? req.query.brand[0] : req.query.brand);

    try {
        const models = await getModels(reqBrand);

        return res.status(200).json(models);

    } catch (error) {
        return res.status(404).json({
            message: `Resource not found! ${error.message}`,
            status: 'failed'
        })
    }

}