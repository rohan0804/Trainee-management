



     SELECT `id`, `start_time`, `end_time`, `date`, `task_memo`, `createdAt`, `updatedAt`, `trainee_id`, `category_id`, `sub_category_id` FROM `timelogs` AS `timelog` WHERE ((`timelog`.`start_time` = '2021-01-02 00:00:00' AND `timelog`.`end_time` = '2021-01-02 00:30:20')
      OR (`timelog`.`start_time` > '2021-01-02 00:00:00' AND `timelog`.`end_time` < '2021-01-02 00:30:20')
       OR ((`timelog`.`end_time` > '2021-01-02 00:00:00' AND `timelog`.`end_time` < '2021-01-02 00:30:20'))
        OR (`timelog`.`start_time` < '2021-01-02 00:00:00' AND `timelog`.`end_time` > '2021-01-02 00:00:00') 
        OR (`timelog`.`start_time` < '2021-01-02 00:30:20' AND `timelog`.`end_time` > '2021-01-02 00:30:20')) AND `timelog`.`trainee_id` = 1 AND `timelog`.`date` = '2021-01-02' LIMIT 1;



