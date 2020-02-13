### Database

#### How to Connect to MySQL Server
[Connecting to a DB Instance Running the MySQL Database Engine](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ConnectToInstance.html)


#### AWS Mysql Endpoint
```
database-1.cfwynfjcelo6.us-east-1.rds.amazonaws.com
```

#### Preliminary Schema
```sql
name VARCHAR(100) NOT NULL,
alias VARCHAR(100),
category VARCHAR(100) NOT NULL,
sub_category VARCHAR(100) NOT NULL,
diagnostic_criteria VARCHAR(50),
description TEXT NOT NULL,
```
