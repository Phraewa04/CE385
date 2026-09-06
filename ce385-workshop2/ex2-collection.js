// ส่วนที่ 1 — ข้อมูลเริ่มต้นนักศึกษา 6 คน 
const studentList = [
    { id: '101', name: 'กวิน', major: 'CE', score: 88, contact: { email: 'kawin@test.com', phone: '081-000-1111' } },
    { id: '102', name: 'ธันวา', major: 'IT', score: 42, contact: { email: 'thanwa@test.com', phone: '082-000-2222' } },
    { id: '103', name: 'พิชชา', major: 'CE', score: 75, contact: { email: 'phitcha@test.com', phone: '083-000-3333' } },
    { id: '104', name: 'ภัทร', major: 'IT', score: 95, contact: { email: 'phat@test.com', phone: '084-000-4444' } },
    { id: '105', name: 'มนัส', major: 'CE', score: 60, contact: { email: 'manas@test.com', phone: '085-000-5555' } },
    { id: '106', name: 'ศิรินทร์', major: 'IT', score: 81, contact: { email: 'sirin@test.com', phone: '086-000-6666' } }
];

// ส่วนที่ 2 — ฟังก์ชันค้นหาข้อมูล (ใช้ function declaration เพื่อให้โค้ดดูต่างจากเดิม)

// 1. ค้นหานักศึกษาด้วย ID
function findById(list, targetId) {
    // หาวัตถุแรกที่มี id ตรงกับที่ระบุ ถ้าไม่เจอจะคืนค่า undefined
    return list.find(item => item.id === targetId);
}

// 2. ดึงรายชื่อนักศึกษาตามสาขาวิชา
function findByMajor(list, targetMajor) {
    // คัดกรองเอาเฉพาะคนที่เรียนสาขาที่กำหนด คืนค่าเป็น Array ใหม่
    return list.filter(item => item.major === targetMajor);
}

// 3. ตรวจสอบว่ามีคนสอบตกไหม (คะแนน < 50)
function hasFailingStudent(list) {
    // ส่งกลับ true ทันทีถ้าพบอย่างน้อย 1 คนที่คะแนนต่ำกว่า 50
    return list.some(item => item.score < 50);
}

// 4. ดึงอีเมลด้วย ID (ใช้ ?. และ ??)
function getEmail(list, targetId) {
    const student = findById(list, targetId);
    // เซฟการเข้าถึงด้วย ?. และใช้ ?? เพื่อคืนค่าข้อความสำรองหากไม่มีอีเมลหรือหาไม่เจอ
    return student?.contact?.email ?? 'ไม่พบข้อมูลติดต่อ';
}

// ส่วนที่ 3 — ทดสอบการทำงานและกรณีขอบเขต (Edge Cases)

// เพิ่มนักศึกษาใหม่ 1 คน โดยไม่ใส่ contact และไม่ใช้ push (ใช้ Spread operator [...])
const addedStudent = { id: '107', name: 'นลิน', major: 'CE', score: 79 };
const currentStudents = [...studentList, addedStudent];

// เรียกใช้งานทดสอบตามโจทย์
console.log('--- ผลการทดสอบค้นหาข้อมูล ---');
console.log('ข้อมูลนักศึกษา ID 104:', findById(currentStudents, '104'));
console.log('รายชื่อนักศึกษาสาขา CE:', findByMajor(currentStudents, 'CE'));
console.log('มีนักศึกษาตกหรือไม่:', hasFailingStudent(currentStudents));

console.log('\n--- ทดสอบกรณีหาไม่เจอและข้อมูลไม่ครบ ---');
// ทดสอบหา ID "9999" ที่ไม่มีในระบบ
console.log('ค้นหา ID 9999:', findById(currentStudents, '9999')); 
console.log('อีเมลของ ID 9999:', getEmail(currentStudents, '9999')); 

// ทดสอบดึงอีเมลคนที่เพิ่มมาใหม่ (ID 107) ซึ่งไม่มี contact
console.log('ข้อมูล ID 107 (เพิ่มใหม่):', findById(currentStudents, '107'));
console.log('อีเมลของ ID 107:', getEmail(currentStudents, '107'));