-- 1. How many tasks are in the task table?
SELECT count (*) 
FROM task t;

-- 2. How many tasks in the task table do not have a valid due date?
SELECT count(*) 
FROM task 
WHERE due_date is NULL;

-- 3. Find all the tasks that are marked as done.
SELECT t.*, s.name Status
FROM task t
JOIN status s on t.status_id = s.id 
WHERE s.name = "Done";

-- 4. Find all the tasks that are not marked as done.
SELECT t.*,s.name Status
FROM task t
JOIN status s on t.status_id = s.id 
WHERE s.name <> "Done";

-- 5. Get all the tasks, sorted with the most recently created first.
SELECT * 
FROM task t
ORDER BY created DESC ;

-- 6. Get the single most recently created task.
SELECT * 
FROM task t
ORDER BY created DESC
LIMIT 1;

-- 7. Get the title and due date of all tasks where the title or description contains database.
SELECT t.title ,t.due_date 
FROM task t 
WHERE t.title LIKE "%database%";

-- 8. Get the title and status (as text) of all tasks.
SELECT t.title, s.name Status
FROM task t 
JOIN status s on t.status_id = s.id 

-- 9. Get the name of each status, along with a count of how many tasks have that status.
SELECT s.name Status, COUNT(t.id) NumberOfTasks
FROM task t 
JOIN status s on t.status_id = s.id 
GROUP BY s.name;

-- 10. Get the names of all statuses, sorted by the status with most tasks first.
SELECT s.name Status, COUNT(t.id) NumberOfTasks
FROM task t 
JOIN status s on t.status_id = s.id 
GROUP BY s.name
ORDER BY NumberOfTasks DESC;
