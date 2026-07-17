CREATE TABLE workers (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(320) UNIQUE,
    phone VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    hourly_rate NUMERIC(10, 2) NOT NULL
);

CREATE TABLE worker_skills (
    worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    skill VARCHAR(50) NOT NULL,
    PRIMARY KEY (worker_id, skill)
);
