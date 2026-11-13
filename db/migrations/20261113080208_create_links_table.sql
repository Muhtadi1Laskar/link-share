-- migrate:up
CREATE TABLE IF NOT EXISTS links (
    user_id UUID NOT NULL,
    website_name TEXT[] NOT NULL,
    link TEXT[] NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- migrate:down

