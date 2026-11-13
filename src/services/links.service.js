import { createLinks } from "../repository/links.repository.js"
import { ApiError } from "../utils/error.js";

export const createLinksService = async ({
    userId,
    websiteName,
    link }
) => {
    const createdLinks = await createLinks({ userId, websiteName, link });

    if (!createdLinks) {
        throw new ApiError(
            409,
            "LINK_ALREADY_EXISTS",
            "The link already exists"
        );
    }

    return {
        message: "Successfully created a link",
        link: createdLinks
    };
}