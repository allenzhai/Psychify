-- dsm - databasename
USE dsm;

-- Create a table named Disorders. Our First Table.
CREATE TABLE IF NOT EXIST Disorders (
  id INT AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  alias VARCHAR(100),
  category VARCHAR(100) NOT NULL,
  sub_category VARCHAR(100) NOT NULL,
  diagnostic_criteria VARCHAR(50),
  description TEXT NOT NULL,
  PRIMARY KEY (id)
);

-- First Disorder Entry. Read data format section in database.md file for more.
INSERT INTO Disorders(name, alias, category, sub_category, diagnostic_criteria, description) VALUES("Intellectual Disability", "Intellectual Developmental Disorder", "Neurodevelopmental Disorders", "Intellectual Disabilities", "", "Intellectual disability (intellectual developmental disorder) is a disorder with onset during the developmental period that includes both intellectual and adaptive functioning deficitsin conceptual, social, and practical domains. The following three criteria must be met:
A. Deficits in intellectual functions, such as reasoning, problem solving, planning, abstractthinking, judgment, academic learning, and learning from experience, confirmed byboth clinical assessment and individualized, standardized intelligence testing.
B. Deficits in adaptive functioning that result in failure to meet developmental and sociocultural standards for personal independence and social responsibility. Without ongoing support, the adaptive deficits limit functioning in one or more activities of daily life, such as communication, social participation, and independent living, across multiple environments, such as home, school, work, and community.
C. Onset of intellectual and adaptive deficits during the developmental period.");

-- Create Table for User Accounts
-- Password should be hashed
CREATE TABLE IF NOT EXISTS Accounts (
  ID INT primary key AUTO_INCREMENT,
  Password VARCHAR(30) NOT NULL, 
  Email VARCHAR(100),
  Username VARCHAR(100),
  About VARCHAR(100),
  FirstName VARCHAR(100),
  Locat VARCHAR(100),
  DOB VARCHAR(100),
  Type INT NOT NULL
);
  
  
