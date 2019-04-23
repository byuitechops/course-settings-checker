const fs = require('fs');
const d3 = require('d3-dsv');
const pMap = require('p-map');
const canvas = require('canvas-api-wrapper');

const itemsToAudit = [{
    name: 'Start Date',
    object: 'course',
    object_key: 'start_at',
    csv_key: 'start_date'
}, {
    name: 'End Date',
    object: 'course',
    object_key: 'end_at',
    csv_key: 'end_date'
}];

const settingsToCheck = [{
    name: 'Restrict Enrollments to Course Dates',
    object: 'course',
    object_key: 'restrict_enrollments_to_course_dates',
    csv_key: 'participate_button',
    correct_value: true
}, {
    name: 'Restrict Student Future View',
    object: 'course_settings',
    object_key: 'restrict_student_future_view',
    csv_key: 'restrict_viewing_button',
    correct_value: true
}];

function writeReport(filepath, csvObject) {
    let csvString = d3.csvFormat(csvObject);
    fs.writeFileSync(filepath, csvString);
}

function checkSettings(checkObject, row) {
    settingsToCheck.forEach(settingToCheck => {
        row[settingToCheck.csv_key] = checkObject[settingToCheck.object][settingToCheck.object_key] === settingToCheck.correct_value;
    });
    return row;
}

function auditItems(checkObject, row) {
    itemsToAudit.forEach(itemToAudit => {
        row[itemToAudit.csv_key] = checkObject[itemToAudit.object][itemToAudit.object_key];
    });
    return row;
}

function runCheckObjects(checkObjects) {
    return checkObjects.map(checkObject => {
        let row = {
            account_id: checkObject.course.account_id,
            course_id: checkObject.course.id,
            sis_course_id: checkObject.course.sis_course_id
        };
        row = auditItems(checkObject, row);
        row = checkSettings(checkObject, row);
        return row;
    });
}

async function getCheckObjects(course) {
    let course_settings = await canvas.get(`/api/v1/courses/${course.id}/settings`);
    return {
        course,
        course_settings
    };
}

function filterCourses(courses) {
    return courses.filter(course => {
        if (course.sis_course_id) {
            return course.sis_course_id.includes('Online') || course.sis_course_id.includes('Pathway');
        }
        return false;
    });
}

async function getCoursesByTerm(term_id) {
    return await canvas.get(`/api/v1/accounts/1/courses?enrollment_term_id=${term_id}`);
}

async function main() {
    try {
        let term_id = process.argv[2];
        let courses = await getCoursesByTerm(term_id);
        //courses = filterCourses(courses);
        let checkObjects = await pMap(courses, getCheckObjects);
        let csvObject = runCheckObjects(checkObjects);
        writeReport(`./reports/course_settings_report_${Date.now()}.csv`, csvObject);
        console.log('Process Completed');
    } catch (err) {
        console.err(err);
    }
}

main();