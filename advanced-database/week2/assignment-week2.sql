-- ============================================================
-- Week 2 Assignment — Databases
-- Student: Ela
-- ============================================================

-- Part A, Question 1: Count the total number of tasks in the database.

SELECT COUNT(*) as total_task FROM task;

-- Part A, Question 2: Count tasks per user. Include users with zero tasks.

SELECT  
    u.id, 
    u.name,
    COUNT(t.id) AS task_count FROM user u
LEFT JOIN task t ON t.user_id = u.id
GROUP BY u.id, u.name


-- Part A, Question 3: Find the number of tasks per status (e.g., how many are "To Do", "In Progress", "Done")

SELECT 
    s.id, 
    s.name, 
    COUNT(t.id) AS task_count
FROM status s
LEFT JOIN task t ON t.status_id = s.id
GROUP BY s.id, s.name;

-- Part 1, Q4: Find the user who has the most tasks assigned.

SELECT 
    u.id, 
    u.name, 
    COUNT(t.id) AS task_count
FROM user u
JOIN task t ON t.user_id = u.id
GROUP BY u.id, u.name
ORDER BY task_count DESC
limit 1;

-- Part 1, Q5: Average tasks per user — only for users with at least one task
SELECT AVG(task_count) AS avg_tasks_per_user
FROM (
    SELECT user_id, COUNT(*) AS task_count
    FROM task
    GROUP BY user_id
) sub;

-- Part 1 Q6: Find the earliest and latest due_date across all tasks.

SELECT 
MIN(t.due_date) AS earliest_due_date, 
MAX(t.due_date) AS latest_due_date 
FROM task t;

-- Part 1 Q7: List categories with task counts, ordered most to least.
SELECT 
    c.name,
    COUNT(tc.task_id) AS task_count
FROM task_category tc
JOIN category c ON c.id = tc.category_id
GROUP BY c.name
ORDER BY task_count DESC;

-- Part 2 Q8: Find users who have more than 2 tasks assigned.

SELECT u.id, u.name, COUNT(t.id) AS task_count
FROM user u
JOIN task t ON t.user_id = u.id
GROUP BY u.id, u.name
HAVING COUNT(t.id) > 2;

-- Part B.1: ...your explanation and attack string as comments...

-- If userName is set to: 
-- ' OR '1'='1

-- The query becomes:
-- SELECT * FROM task 
-- WHERE user_id = (SELECT id FROM user WHERE name = '' OR '1'='1')

-- Explanation:
-- '1'='1' is always true, so the subquery returns ALL user ids (or multiple rows depending on DB behavior)
-- This breaks the intended logic and can return all tasks or unexpected results.

-- Why this is dangerous:
-- It allows an attacker to bypass authentication/filters and access or manipulate all data in the database.
-- This is a classic SQL Injection vulnerability caused by direct string concatenation.

-- Malicious input:
' ; DELETE FROM task; --

-- Part B.2: ...your fix as a code comment...

-- In Node.js (SQLite style):

-- function getTasksByUser(userName) {
--   const query = `
--     SELECT * FROM task 
--     WHERE user_id = (
--       SELECT id FROM user WHERE name = ?
--     )
--   `;
--   db.all(query, [userName], (err, rows) => {
--     console.log(rows);
--   });
-- }

-- Explanation:
-- Instead of concatenating user input directly into the SQL string,
-- we use a placeholder (?) and pass userName separately.
-- The database library safely escapes and binds the value,
-- preventing SQL Injection attacks.
--
-- This approach is called a "parameterized query" or "prepared statement".

-- Part C, Question 1: ...your transaction here...
UPDATE task 
SET user_id = 2   
WHERE user_id = 1; 

DELETE FROM user 
WHERE id = 1;

-- Part C, Question 2:
UPDATE task 
SET user_id = 2
WHERE user_id = 1;


INSERT INTO task (title, user_id, status_id)
VALUES ('Broken task', 2, 999); 

ROLLBACK;

Verify nothing changed:
SELECT * FROM user WHERE id = 1;


-- Part 4 Q1: 
BEGIN TRANSACTION;
-- Step 1:
INSERT INTO category (name)
VALUES ('Urgent');

-- Step 2: Assign tasks with status "In Progress" or "To Do"
INSERT INTO task_category (task_id, category_id)
SELECT t.id, c.id
FROM task t
JOIN status s ON s.id = t.status_id
JOIN category c ON c.name = 'Urgent'
WHERE s.name IN ('In Progress', 'To Do');

COMMIT;

--- If Step 1 fails → transaction stops → no tasks are assigned
-- the transaction will not be committed.
-- In that case, we must run:

-- ROLLBACK;
-- - Database remains consistent (all-or-nothing)

-- Part 4, Q2
-- Dashboard: single SELECT returning all four numbers:
-- total tasks, completed (Done), overdue, users with tasks

SELECT
  COUNT(*) AS total_tasks,

  COUNT(CASE 
    WHEN s.name = 'Done' THEN 1 
  END) AS completed_tasks,

  COUNT(CASE 
    WHEN t.due_date < CURRENT_DATE THEN 1 
  END) AS overdue_tasks,

  COUNT(DISTINCT t.user_id) AS users_with_tasks

FROM task t
JOIN status s ON s.id = t.status_id;
