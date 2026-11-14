import { createLinks, deleteLinks, doLinkExists, retriveLinks } from "../repository/links.repository.js"
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

export const retriveLinksService = async (userId) => {
    const links = await retriveLinks(userId);

    if (!links) {
        throw new ApiError(
            200,
            "NO_DATA_AVAILABLE",
            "No Saved links"
        );
    }

    if (links.length === 0) {
        return {
            message: "The user doesn't gave any links stored",
            data: []
        };
    }

    const cleanLinks = links.map(res => {
        return {
            linkId: res.link_id,
            websiteName: res.website_name,
            link: res.link
        };
    })

    return {
        message: "Successfully retrived the data",
        data: cleanLinks
    };
}

export const deleteLinkService = async ({ userId, linkId }) => {
    const existingLinks = await doLinkExists(userId, linkId);

    if (!existingLinks) {
        throw new ApiError(
            404,
            "NO_DATA_AVAILABLE",
            "No Saved Links"
        );
    }

    const deletedLinks = await deleteLinks(userId, linkId);

    if (!deletedLinks) {
        throw new ApiError(
            400,
            "DATA_DELETION_FAILED",
            "Failed to delete the link"
        );
    }

    return {
        message: "Successfully deleted the link",
        data: deletedLinks
    };
}