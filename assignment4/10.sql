SELECT DISTINCT itag2.TagId, diff.Text, completion_time
	FROM ItemTag itag2
    JOIN
	(
    SELECT itag.TagId, item.Text, (item.CompletionDate - item.CreationDate) as completion_time
	FROM ToDoItem item JOIN ItemTag itag ON itag.ToDoId=item.Id
    WHERE CompletionDate IS NOT NULL
    ) as diff
    ON itag2.TagId = diff.TagId
	ORDER BY itag2.TagId, completion_time;