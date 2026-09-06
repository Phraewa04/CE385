const MIN_SCORE = 0;
const MAX_SCORE = 100;

const gradeCriteria = [
    { min: 80, grade: 'A' },
    { min: 75, grade: 'B+' },
    { min: 70, grade: 'B' },
    { min: 65, grade: 'C+' },
    { min: 60, grade: 'C' },
    { min: 55, grade: 'D+' },
    { min: 50, grade: 'D' },
    { min: 0, grade: 'F' }
];

// ส่วน 1 เขียนฟังก์ชันเหล่านี้ใช้ (arrow function อย่างน้อย 2ตัว)
//เช็คว่าคะแนนป้อนมาถูกหรือเปล่า 
const isValidScore = (score) => {
    return typeof score === 'number' && score >= MIN_SCORE && score <= MAX_SCORE;
    // ต้องเป็นตัวเลขระหว่าง 0-100 เท่านั้น (ทศนิยมก็ได้)
};
const toGrade = (score) => {
    if (isValidScore(score) === false) {
        return 'ข้อมูลคะแนนไม่ถูกต้อง';
    }

    const matchedRule = gradeCriteria.find(rule => score >= rule.min);

    return matchedRule.grade;
};

// มีการตั้งค่าเริ่มต้นเผื่อคนลืมใส่ค่ามาให้เป็น 60 และ 20
const calculateWorkshopScore = (raw, full = 60, weight = 20) => {
    return (raw / full) * weight;  
};

//นำคะแนนมารวมกัน ทุกค่าบวกกันหมด 
const calculateTotal = (workshop, attendance, project, midterm, final) => {
    return workshop + attendance + project + midterm + final;
};

// ส่วน 2 ทดสอบโดยสร้างข้อมูลนักศึกษา 3 คน 
const studentsData = [
    { name: 'สมชาย', rawWorkshop: 53, attendance: 15, project: 16, midterm: 20, final: 22 }, 
    { name: 'สมหญิง', rawWorkshop: 52, attendance: 10, project: 12, midterm: 19, final: 18 }, 
    { name: 'สมคิด', rawWorkshop: 54, attendance: 12, project: 13, midterm: 22, final: 24 }
];
// เอาข้อมูลนักศึกษามาคิดคะแนนและโชว์ในตาราง
const studentResults = studentsData.map(student => {
    const wsScore = calculateWorkshopScore(student.rawWorkshop);
    const totalScore = calculateTotal(wsScore, student.attendance, student.project, student.midterm, student.final);
    const grade = toGrade(totalScore);  //เอาคะแนนรวมไปตัดเกรด

    return {
        'ชื่อ': student.name,
        'คะแนน Workshop': wsScore.toFixed(2),
        'คะแนนรวม': totalScore.toFixed(2),
        'เกรดที่ได้': grade
    };
});

// ส่วน 3 ทดสอบว่าค่าเริ่มต้น
const test1 = calculateWorkshopScore(48);
const test2 = calculateWorkshopScore(48, 60, 20);
const test3 = calculateWorkshopScore(48, undefined, 25);


console.log('=== ส่วน 2 ตารางสรุปผลการเรียน ===');
console.table(studentResults); 

console.log('\n=== ส่วน 3 ทดสอบ Default Parameters ===');
console.log('calculateWorkshopScore(48):', test1);
console.log('calculateWorkshopScore(48, 60, 20):', test2);
console.log('แสดงว่าไดเท่ากันหรือไม่ :', test1 === test2); 
console.log('calculateWorkshopScore(48, undefined, 25):', test3);