-- migrate:up
CREATE TABLE IF NOT EXISTS links (
    link_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    website_name TEXT NOT NULL,
    link TEXT NOT NULL,

    CONSTRAINT fk_links_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    CONSTRAINT unique_user_link
        UNIQUE (user_id, link)
);

-- migrate:down

