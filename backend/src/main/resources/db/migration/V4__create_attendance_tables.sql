CREATE TABLE attendance (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    site_id UUID NOT NULL REFERENCES construction_sites(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    hours_worked DOUBLE PRECISION NOT NULL,
    present BOOLEAN NOT NULL,
    remarks VARCHAR(500),
    deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE UNIQUE INDEX uq_attendance_worker_site_date ON attendance(worker_id, site_id, attendance_date) WHERE (deleted = FALSE);

CREATE INDEX idx_attendance_worker ON attendance(worker_id);
CREATE INDEX idx_attendance_site ON attendance(site_id);
CREATE INDEX idx_attendance_date ON attendance(attendance_date);
