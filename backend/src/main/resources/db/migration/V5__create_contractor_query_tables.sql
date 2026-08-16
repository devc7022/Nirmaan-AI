CREATE TABLE contractor_queries (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    contractor_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(200) NOT NULL,
    mobile_number VARCHAR(30) NOT NULL,
    email VARCHAR(320) NOT NULL,
    project_name VARCHAR(200) NOT NULL,
    project_location VARCHAR(200) NOT NULL,
    site_address TEXT NOT NULL,
    work_start_date VARCHAR(50),
    expected_duration VARCHAR(100),
    working_days INTEGER,
    work_description TEXT,
    special_instructions TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'NEW'
);

CREATE TABLE manpower_requirements (
    id UUID PRIMARY KEY,
    contractor_query_id UUID NOT NULL REFERENCES contractor_queries(id) ON DELETE CASCADE,
    worker_type VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX idx_contractor_queries_email ON contractor_queries(email);
CREATE INDEX idx_contractor_queries_status ON contractor_queries(status);
CREATE INDEX idx_manpower_requirements_query ON manpower_requirements(contractor_query_id);
