## How to access datebase?

#### Apporach 1: Through phpMyAdmin (Recommended)

1. Using the following link to log into the phpMyAdmin interface.

```
54.234.3.243/phpmyadmin
```

2. Use the username and passwords in your calpoly email to log in.
3. `Server Choice`, select the one other than `localhost`.

#### Apporach 2: MySQL Workbench

This approach requires knowledge of using SSH. The idea is to use EC2 instance to establish a tunneal to the database server, since the db server only allows access from EC2 instance. We will also be deploying our application to this EC2 instance.

```
# Datebase Endpoint
database-1.cfwynfjcelo6.us-east-1.rds.amazonaws.com
# Datebase Port
3306

# EC2 Instance
EC2-54-234-3-243.compute-1.amazonaws.com
# or ip address if you prefer, where our phpMyAdmin application is installed.
54.234.3.243
```

#### Apporach 3: CommandLine

You have to log on to EC2 instance to be able to access mysql command line interface

```
ssh ec2 instance

# on ec2 instance
mysql -h db_endpoint -u username -p
```

#### MySQL in Express

**Dependencies**

- [mysql](https://www.npmjs.com/package/mysql)
- [dotenv](https://www.npmjs.com/package/mysql)

### Tentative Data Format

Use this link to see what to prepare for the data entries. [Disorders](https://docs.google.com/spreadsheets/d/1muYR-7ORx3vh3DgpiPlZzDNwvdzKJ9aF_BFvDGwp5M0/edit#gid=0)

### References

[Connecting To RDS MySQL Using phpMyAdmin (EC2, RDS)](https://www.youtube.com/watch?v=Bz-4wTGD2_Q)
