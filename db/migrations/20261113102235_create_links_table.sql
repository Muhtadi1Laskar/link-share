-- migrate:up
CREATE TABLE IF NOT EXISTS links (
    link_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    website_name TEXT NOT NULL,
    link TEXT NOT NULL UNIQUE,

    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- migrate:down

