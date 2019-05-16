const fs = require('fs');
const d3 = require('d3-dsv');
const pMap = require('p-map');
const canvas = require('canvas-api-wrapper');


function readCSV(filepath) {
    let csvString = fs.readFileSync(filepath, 'utf8');
    return d3.csvParse(csvString);
}

async function updateCourse(courseToUpdate) {
    try {
        let restrictCourse = await canvas.put(`/api/v1/courses/${courseToUpdate.course_id}`, {
            course: {
                restrict_enrollments_to_course_dates: true
            }
        });
        let futureViewCourse = await canvas.put(`/api/v1/courses/${courseToUpdate.course_id}/settings`, {
            restrict_student_future_view: true
        });
        courseToUpdate.participate_button_now = restrictCourse.restrict_enrollments_to_course_dates;
        courseToUpdate.restrict_viewing_button_now = futureViewCourse.restrict_student_future_view;
    } catch (err) {
        courseToUpdate.error = err.message;
    }
    return courseToUpdate;
}

async function main() {
    let filepath = process.argv[2];
    let csvObjects = readCSV(filepath);
    let coursesToUpdate = csvObjects.filter(csvObject => {
        return csvObject.participate_button === 'false' || csvObject.restrict_viewing_button === 'false';
    });
    let pResults = await pMap(coursesToUpdate.slice(0), updateCourse);
    fs.writeFileSync(`button_fix_report_${Date.now()}.csv`, d3.csvFormat(pResults), 'utf8');
    console.log('Process Complete');
}

main();