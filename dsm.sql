USE dsm;

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

INSERT INTO Disorders(name, alias, category, sub_category, diagnostic_criteria, description) VALUES("Intellectual Disability", "Intellectual Developmental Disorder", "Neurodevelopmental Disorders", "Intellectual Disabilities", "", "Intellectual disability (intellectual developmental disorder) is a disorder with onset during the developmental period that includes both intellectual and adaptive functioning deficitsin conceptual, social, and practical domains. The following three criteria must be met:
A. Deficits in intellectual functions, such as reasoning, problem solving, planning, abstractthinking, judgment, academic learning, and learning from experience, confirmed byboth clinical assessment and individualized, standardized intelligence testing.
B. Deficits in adaptive functioning that result in failure to meet developmental and sociocultural standards for personal independence and social responsibility. Without ongoing support, the adaptive deficits limit functioning in one or more activities of daily life, such as communication, social participation, and independent living, across multiple environments, such as home, school, work, and community.
C. Onset of intellectual and adaptive deficits during the developmental period.");









Global Developmental Delay
315.8 (F88)
This diagnosis is reserved for individuals under the age of 5 years when the clinical severity level cannot be reliably assessed during early childhood. This category is diagnosed when an individual fails to meet expected developmental milestones in several areas of intellectual functioning, and applies to individuals who are unable to undergo systematic assessments of intellectual functioning, including children who are too young to participate in standardized testing. This category requires reassessment after a period of time.

Unspecified Intellectual Disability
Intellectual Developmental Disorder
319 (F79)
This category is reserved for individuals over the age of 5 years when assessment of the degree of intellectual disability (intellectual developmental disorder) by means of locally available procedures is rendered difficult or impossible because of associated sensory or physical impairments, as in blindness or prelingual deafness; locomotor disability; or presence of severe problem behaviors or co-occurring mental disorder. This category should only be used in exceptional circumstances and requires reassessment after a period of time.
