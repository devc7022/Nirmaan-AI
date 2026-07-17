CREATE TABLE construction_sites (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    client_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL
);

ALTER TABLE workers ADD COLUMN site_id UUID REFERENCES construction_sites(id) ON DELETE SET NULL;
CREATE INDEX idx_workers_site_id ON workers(site_id);
