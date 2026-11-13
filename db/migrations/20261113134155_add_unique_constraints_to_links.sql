-- migrate:up
ALTER TABLE links
ADD CONSTRAINT links_link_unique UNIQUE (link);

-- migrate:down
ALTER TABLE links
DROP CONSTRAINT links_link_unique

