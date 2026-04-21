-------------------------------------------------
-- PART 1, Question 1: Insert a new user with your own name and email

INSERT INTO "USER" (name, email, phone ) VALUES ('Ela Kazemzadeh', 'ela.kazemzadeh@gmail.com', '+4561616878');

-- PART 1, Question 2: Insert a new task assigned to yourself with the following attributes:
-- Title: "Learn SQL"
-- Description: "Practice database queries"
-- Status: "In Progress"
-- Due date: One week from today

INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Learn SQL', 'Practice database queries', datetime('now'), datetime('now'), date('now', '+7 days'), 2);

INSERT INTO user_task (user_id, task_id) VALUES(14, 42);


-- PART 1, Question 3: Update the title of the task you just created to "Master SQL Basics"

UPDATE task 
SET title = 'Master SQL Basics'
WHERE id = 42;

-- PART 1, Question 4: Change the due date of your task to two weeks from today

UPDATE task
SET due_date = date('now', '+14 days')
WHERE id = 42; 

-- PART 1, Question 5: Change the status of your task to "Done"

UPDATE task
SET status_id = (SELECT id FROM status WHERE name = 'Done')
WHERE id = 42;


-- PART 1, Question 6: Delete one of the tasks in the database (choose any task)

DELETE FROM task
WHERE id = 11;

DELETE FROM task
WHERE id = 40;

-----------------------------------------------
-- PART 2 Question 1: List all users who don't have any tasks assigned

SELECT u.name 
FROM user u
LEFT JOIN user_task ut ON u.id = ut.user_id 
WHERE ut.user_id IS NULL;


-- PART 2 Question 2: Find all tasks with a status of "Done"
SELECT t.title , s.name AS task_status FROM task t
JOIN status s ON t.status_id = s.id 
WHERE s.name = 'Done';


-- PART 2 Question 3: Find all overdue tasks (due_date is earlier than today)
SELECT t.title, t.due_date, s.name AS task_status FROM task t 
JOIN status s ON t.status_id = s.id 
WHERE s.name != 'Done'
AND t.due_date < date()
ORDER BY due_date;

-----------------------------------------------
-- PART 3, Question 1 :Add a new column called priority to the task table with possible values: 'Low', 'Medium', 'High'. 💡 Remember to provide default values.

ALTER TABLE task
ADD COLUMN priority TEXT NOT NULL DEFAULT 'Low' CHECK (priority IN ('Low', 'Medium', 'High'));

SELECT * FROM task;

-- PART 3, Question 2: Update some existing tasks to have different priority values

UPDATE task 
SET priority = 'Medium'
WHERE id IN (3,4,12,16,18,22,25,31,33);

UPDATE task 
SET priority = 'High'
WHERE id IN (5,13,20,27,35,36,39,40);

-- PART 3, Question 3: Create a new table called category with columns:
-- id (PRIMARY KEY)
-- name (e.g., "Work", "Personal", "Study")
-- color (e.g., "red", "blue", "green")

CREATE TABLE category (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL UNIQUE,
color TEXT NOT NULL
);

SELECT * FROM category;

-- PART 3, Question 4: Create a linking table called task_category to establish a many-to-many relationship between tasks and categories:

CREATE TABLE task_category (
task_id INTEGER NOT NULL,
category_id INTEGER NOT NULL,
 PRIMARY KEY (task_id, category_id),
 FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE,
 FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- PART 3, Question 5: Insert at least 3 categories

INSERT INTO category (name, color) VALUES ('Work', 'red');
INSERT INTO category (name, color) VALUES ('Personal', 'blue');
INSERT INTO category (name, color) VALUES ('Study', 'green');

-- PART 3, Question 6: Assign categories to at least 5 different tasks

SELECT * FROM task_category;
INSERT INTO task_category (task_id, category_id) VALUES(40,3);
INSERT INTO task_category (task_id, category_id) VALUES(1,3);
INSERT INTO task_category (task_id, category_id) VALUES(3,1);
INSERT INTO task_category (task_id, category_id) VALUES(22,3);
INSERT INTO task_category (task_id, category_id) VALUES(23,1);
INSERT INTO task_category (task_id, category_id) VALUES(30,2);
INSERT INTO task_category (task_id, category_id) VALUES(37,2);
INSERT INTO task_category (task_id, category_id) VALUES(17,2);
INSERT INTO task_category (task_id, category_id) VALUES(2,3);

-------------------------------------------------
-- PART 4, Question 1: Find all tasks in a specific category (e.g., "Work")

SELECT t.title, c.name AS category, c.color AS category_color FROM task t
JOIN task_category tc ON t.id = tc.task_id
JOIN category c ON c.id = tc.category_id
WHERE c.name = 'Study';

-- PART 4, Question 2: List tasks ordered by priority (High to Low) and by due date (earliest first)

SELECT t.title, t.due_date, t.priority FROM task t
ORDER BY CASE t.priority
  WHEN 'High' THEN 1
  WHEN 'Medium' THEN 2
  WHEN 'Low' THEN 3
  ELSE 4
END ASC, t.due_date ASC;

-- PART 4, Question 3: Find which category has the most tasks

SELECT c.name,count(*) AS number_of_tasks FROM task_category tc 
JOIN category c ON tc.category_id = c.id 
GROUP BY c.name 
ORDER BY number_of_tasks  DESC 
limit 1;


-- PART 4, Question 4: Get all high priority tasks that are either "In Progress" or "To Do"

SELECT t.title, t.priority, s.name FROM task t
JOIN status s ON s.id = t.status_id 
WHERE t.priority = 'High' AND s.id IN (1,2);


-- PART 4, Question 5: Find users who have tasks in more than one category

SELECT u.name, COUNT(DISTINCT tc.category_id) AS num_of_category,GROUP_CONCAT(c.name, ', ') AS categories FROM "USER" u 
JOIN user_task ut ON u.id = ut.user_id 
JOIN task_category tc ON tc.task_id = ut.task_id 
JOIN category c  ON tc.category_id  = c.id 
GROUP By u.name 
HAVING COUNT(DISTINCT tc.category_id ) > 1;