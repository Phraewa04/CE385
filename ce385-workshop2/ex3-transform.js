const rawStudentData = [
    { id: '101', name: 'กวิน', major: 'CE', score: 88, contact: { email: 'kawin@test.com', phone: '081-000-1111' } },
    { id: '102', name: 'ธันวา', major: 'IT', score: 42, contact: { email: 'thanwa@test.com', phone: '082-000-2222' } },
    { id: '103', name: 'พิชชา', major: 'CE', score: 75, contact: { email: 'phitcha@test.com', phone: '083-000-3333' } },
    { id: '104', name: 'ภัทร', major: 'IT', score: 95, contact: { email: 'phat@test.com', phone: '084-000-4444' } },
    { id: '105', name: 'มนัส', major: 'CE', score: 60, contact: { email: 'manas@test.com', phone: '085-000-5555' } },
    { id: '106', name: 'ศิรินทร์', major: 'IT', score: 81, contact: { email: 'sirin@test.com', phone: '086-000-6666' } }
];

// เกณฑ์การตัดเกรดเรียงจากสูงไปต่ำ
const gradeRules = [
    { minScore: 80, gradeLetter: 'A' },
    { minScore: 75, gradeLetter: 'B+' },
    { minScore: 70, gradeLetter: 'B' },
    { minScore: 65, gradeLetter: 'C+' },
    { minScore: 60, gradeLetter: 'C' },
    { minScore: 55, gradeLetter: 'D+' },
    { minScore: 50, gradeLetter: 'D' },
    { minScore: 0,  gradeLetter: 'F' }
];

// ฟังก์ชันแปลงคะแนนเป็นเกรด
// แปลงเป็น Arrow Function: ใช้ .find ค้นหาเกรดที่ตรงกับเงื่อนไข
const calculateGrade = (score) => gradeRules.find(rule => score >= rule.minScore).gradeLetter;


// ส่วนที่ 1 — เขียนฟังก์ชันทั้ง 6 (ห้ามใช้ for/while)
// 1. ดึงเฉพาะชื่อของทุกคนออกเป็น Array
// แปลงเป็น Arrow Function: ใช้ .map เพื่อดึงเฉพาะ property 'name'
const getNames = (list) => list.map(student => student.name);

// 2. คัดกรองคนที่สอบผ่าน (คะแนน >= 50)
// แปลงเป็น Arrow Function: ใช้ .filter กรองเฉพาะคนที่ได้คะแนนตั้งแต่ 50 ขึ้นไป
const getPassedStudents = (list) => list.filter(student => student.score >= 50);

// 3. ผลรวมคะแนนทั้งหมด
// แปลงเป็น Arrow Function: ใช้ .reduce เพื่อบวกสะสมคะแนน โดยเริ่มจาก 0
const getTotalScore = (list) => list.reduce((total, student) => total + student.score, 0);

// 4. คะแนนเฉลี่ย (ถ้า Array ว่าง ให้คืนค่า 0 เสมอ ไม่ให้เกิด NaN)
// แปลงเป็น Arrow Function: เช็คความยาว array ก่อน ถ้ามีข้อมูลจึงนำคะแนนรวมมาหาร
const getAverageScore = (list) => {
    if (list.length === 0) return 0;
    const avg = getTotalScore(list) / list.length;
    return Number(avg.toFixed(2));
};

// 5. นับจำนวนนักศึกษาแยกรายเกรด
// แปลงเป็น Arrow Function: ใช้ .reduce รวบรวมจำนวนเกรดเป็น Object {}
const countByGrade = (list) => list.reduce((acc, student) => {
    const grade = calculateGrade(student.score);
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
}, {});

// 6. ค้นหานักศึกษาที่ได้คะแนนสูงสุด (ตั้งค่าเริ่มต้นเป็น null รองรับกรณี Array ว่าง)
// แปลงเป็น Arrow Function: ใช้ .reduce เปรียบเทียบคะแนนเพื่อหาคนที่ได้สูงสุด
const getTopStudent = (list) => list.reduce((best, student) => {
    if (!best || student.score > best.score) {
        return student;
    }
    return best;
}, null);

// ส่วนที่ 2 — ท่อข้อมูลแบบบรรทัดเดียว (Chaining: filter -> map -> reduce)
// คำนวณคะแนนเฉลี่ยของเด็ก CE ที่สอบผ่านในบรรทัดเดียว
const cePassedAvg = rawStudentData.filter(student => student.major === 'CE' && student.score >= 50).map(student => student.score).reduce((sum, score, _, arr) => sum + score / arr.length, 0);

// ส่วนที่ 3 — ทดสอบระบบ
console.log('=== ผลการทำงานปกติ (ข้อมูล 6 คน) ===');
console.log('รายชื่อทั้งหมด:', getNames(rawStudentData));
console.log('คนที่สอบผ่าน:', getPassedStudents(rawStudentData));
console.log('ผลรวมคะแนน:', getTotalScore(rawStudentData));
console.log('คะแนนเฉลี่ย:', getAverageScore(rawStudentData));
console.log('จำนวนเกรดแต่ละกลุ่ม:', countByGrade(rawStudentData));
console.log('คนที่ได้คะแนนสูงสุด:', getTopStudent(rawStudentData));

console.log('\n=== ผลการทำงานส่วนที่ 2 (Chaining) ===');
console.log('คะแนนเฉลี่ย CE ที่สอบผ่าน:', cePassedAvg);

console.log('\n=== ผลการทดสอบกรณี Array ว่าง [] ===');
const emptyData = [];
console.log('getNames([]):', getNames(emptyData));             // Output: []
console.log('getPassedStudents([]):', getPassedStudents(emptyData)); // Output: []
console.log('getTotalScore([]):', getTotalScore(emptyData));     // Output: 0
console.log('getAverageScore([]):', getAverageScore(emptyData)); // Output: 0 (ไม่เกิด NaN)
console.log('countByGrade([]):', countByGrade(emptyData));       // Output: {}
console.log('getTopStudent([]):', getTopStudent(emptyData));     // Output: null