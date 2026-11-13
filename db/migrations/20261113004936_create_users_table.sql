-- migrate:up
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,

    emails VARCHAR(254) NOT NULL UNIQUE, 
    
    password_hash TEXT NOT NULL,

    create_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- migrate:down

