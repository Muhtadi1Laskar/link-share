import { createLinksService, retriveLinksService } from "../services/links.service.js";
import { successResponse } from "../utils/response.js";

export async function RetriveAllLinksController(req, res, next) {
    try {
        const response = await retriveLinksService(req.userId);
        successResponse(res, response, 200);
    } catch (error) {
        next(error);
    }
}

export async function CreateLinkController(req, res, next) {
    try {
        const response = await createLinksService({
            userId: req.userId,
            websiteName: req.body.websiteName,
            link: req.body.link
        });
        successResponse(res, response, 200);
    } catch (error) {
        next(error);
    }
}