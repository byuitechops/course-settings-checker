# Course Settings Checker

## Description
The Course Settings Checker tool creates a CSV report of all courses and their current settings.
The tool compares what the desired setting to the current course setting. The tool by default
only generates a CSV report. However, if the updater.js is run with the most recent CSV report
it will correct all of the courses whose settings are not correct.

## Links to Other Docs

- [Project Capture](./docs/ProjectCaptureDoc.md)

## SetUp / How to Install
1. git clone https://github.com/byuitechops/course-settings-checker
2. cd ./course-settings-checker
3. npm i
4. Create a reports folder for reports to be written to.

## How to Use
1. npm start - Creates a CSV report
2. npm update *filpath* - Fixes incorrect course settings according to a provided CSV report

