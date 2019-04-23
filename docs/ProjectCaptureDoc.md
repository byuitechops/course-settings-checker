# Project Capture Document for Course Settings Checker
#### *Author: Cal Wilson*
#### *Stakeholder(s): Corey Moore*
#### *Date: 04/19/2019*


## Background
Corey has noticed that course settings have been failing to be correctly set before the beginning of a new semester. This can cause problems for teachers and
students taking the course.

-----

## Definition of Done
We are creating a tool that will check all courses' settings in a given term and generate a report of the results.

-----

# Requirements

### General Requirements
- The tool shall audit the start and end dates.
- The tool shall verify that the "Students can only participate in Canvas between these dates" button is selected.
- The tool shall verify that the "Restrict students from viewing this course before the start date" button is selected.
- The tool shall allow future tasks to be added.

### Input Requirements
- The tool shall accept a term id.

#### Definition of Inputs
Term ID: A unique identifier for a term. This number is provided via a runtime argument.

#### Source of Inputs
To get the correct term id ask your supervisor.

---

### Output Requirements
- The tool shall generate a Comma Seperated Value file or CSV.

#### Definition of Outputs
CSV: account_id, course_id, sis_course_id, start_date, end_date, participate_button, restrict_viewing_button

#### Destination of Outputs
The CSV will be sent to Corey Moore via Email.

---

### User Interface

#### Type:
Command Line Interface
Required Flags: term_id : int
Optional Flags: NONE

-----

## Expectations

### Timeline

- Milestone 1: Finish Design (4/19)
- Milestone 2: Build Core logic to search for words in syllabi (4/19)
- Milestone 3: Connect inputs to core logic and set up outputs (4/19)
- Milestone 4: Deliver the project (4/19)
- Milestone 5: Cleanup the project (4/22)

### Best Mode of Contact
Email: Joshua Mckinney
-----

#### *Approved By: Joshua McKinney* 
#### *Approval Date: 4/19/2019*
