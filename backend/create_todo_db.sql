-- Drop and recreate the Tasks table
DROP TABLE IF EXISTS Tasks;

CREATE TABLE Tasks (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    IsCompleted BOOLEAN NOT NULL DEFAULT 0,
    CreatedAt TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Seed data
INSERT INTO Tasks (Title, IsCompleted, CreatedAt) VALUES
('Buy groceries', 0, datetime('now')),
('Walk the dog', 1, datetime('now')),
('Finish coding challenge', 0, datetime('now'));

INSERT INTO Tasks (Title, IsCompleted, CreatedAt) VALUES
('Read a book', 0, datetime('now')),
('Call mom', 1, datetime('now')),
('Plan weekend trip', 0, datetime('now'));