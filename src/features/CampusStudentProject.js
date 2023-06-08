export const CampusHandler = (arr)=>{
    let output = [];
    arr.forEach(project => {
        project.studentData.forEach(student => {
            let existingStudent = output.find(s => s._id === student._id);
            if (existingStudent) {
                existingStudent.TotalNumberOfProject += 1;
                existingStudent.ProjectName.push(project.title);
            } else {
                output.push({
                    _id: student._id,
                    name: student.name,
                    email: student.email,
                    phoneNumber: student.phoneNumber,
                    TotalNumberOfProject: 1,
                    ProjectName: [project.title]
                });
            }
        });
    });
    return output 
}