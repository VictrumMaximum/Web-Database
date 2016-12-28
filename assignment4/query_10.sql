select tagid, completionDate-creationDate as diff from ItemTag it join ToDoItem tdi on it.todoid=tdi.id order by it.tagid, (tdi.completiondate-tdi.creationdate);

SELECT 
    @row_number:=CASE
        WHEN @tagid = tagid THEN @row_number + 1
        ELSE 1
    END AS num,
    @tagid:=tagid as mytagid,
    creationDate,
    completionDate,
    diff
FROM
    (select tagid, creationDate, completionDate, completionDate-creationDate as diff from ItemTag it join ToDoItem tdi on it.todoid=tdi.id) as miha
ORDER BY mytagid,diff
