// ข้อมูลArray ของนักศึกษาอย่างน้อย 4 คน
const STUDENTS = [
  { id: "6501", name: "Somchai", major: "CE", score: 85 },
  { id: "6502", name: "Somsri", major: "CE", score: 72 },
  { id: "6503", name: "Sommai", major: "CE", score: 55 },
  { id: "6504", name: "Somying", major: "IT", score: 90 }
];
//ฟังก์ชันตัดเกรด (toGrade)
function toGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

// ฟังก์ชันดึงข้อมูลแบบ Promise (จากข้อ 2)
function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== "string" || id.trim() === "") {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }
    setTimeout(() => {
      const student = STUDENTS.find((s) => s.id === id);
      if (student) resolve({ ...student });
      else reject(new Error('ไม่พบรหัสนักศึกษา ${id}'));
    }, 300);
  });
}


// ส่วนที่ 1 — ดึงข้อมูลตามลำดับ (Sequential)

async function reportSequential(ids) {
  console.log("\n--- แบบที่ 1: ดึงข้อมูลตามลำดับ ---");
  const start = Date.now(); // เริ่มจับเวลา
  
  // ใช้ for...of ร่วมกับ await เพื่อรอให้เสร็จทีละคน
  for (const id of ids) {
    const student = await fetchStudentByIdAsync(id);
    console.log('ดึงข้อมูล ${student.name} สำเร็จ');
  }
  
  const end = Date.now();
  const timeTaken = end - start;
  console.log('วลาที่ใช้ (ตามลำดับ): ${timeTaken} ms');
  return timeTaken;
}


// ส่วนที่ 2 — ดึงข้อมูลพร้อมกันขนาน (Parallel)

async function reportParallel(ids, seqTime) {
  console.log("\n--- แบบที่ 2: ดึงข้อมูลขนานกัน ---");
  const start = Date.now();
  
  // ใช้ map สร้าง Array ของ Promise แล้วรอรวบยอดทีเดียวด้วย Promise.all
  const promises = ids.map(id => fetchStudentByIdAsync(id));
  const students = await Promise.all(promises);
  
  students.forEach(student => console.log('ดึงข้อมูล ${student.name} สำเร็จ'));
  
  const end = Date.now();
  const timeTaken = end - start;
  console.log('เวลาที่ใช้ (ขนาน): ${timeTaken} ms');
  
  // เปรียบเทียบความเร็ว
  const speedUp = (seqTime / timeTaken).toFixed(1);
  console.log('เร็วขึ้นประมาณ ${speedUp} เท่า');
}


// ส่วนที่ 3 — safeReport(id) ครบ try-catch-finally

async function safeReport(id) {
  console.log('\n[ตรวจสอบรหัส ${id}]');
  try {
    const student = await fetchStudentByIdAsync(id);
    const grade = toGrade(student.score);
    // หากสำเร็จ พิมพ์ข้อความตามที่โจทย์กำหนด
    console.log('พบข้อมูล: ${student.name} (เกรด ${grade})');
  } catch (error) {
    // หากล้มเหลว (reject) จะกระโดดมาที่นี่
    console.log('ตรวจไม่พบ: ${error.message}');
  } finally {
    // ทำงานเสมอไม่ว่าจะสำเร็จหรือล้มเหลว
    console.log('-- จบการตรวจสอบ ${id} --');
  }
}


// ควบคุมลำดับการทำงานด้วย main() ห้ามใช้ .then

async function main() {
  const targetIds = ["6501", "6502", "6503"];
  
  // รอให้ส่วนที่ 1 ทำงานเสร็จก่อน
  const seqTime = await reportSequential(targetIds);
  
  // ค่อยเริ่มส่วนที่ 2 (ส่งเวลาจากส่วนแรกไปเปรียบเทียบ)
  await reportParallel(targetIds, seqTime);
  
  // ทดสอบส่วนที่ 3 ทั้งกรณีพบและไม่พบ (ไม่ให้โปรแกรม Crash)
  await safeReport("6501"); // กรณีพบข้อมูล
  await safeReport("9999"); // กรณีไม่พบข้อมูล
}

main();

/*
==========================================
ส่วนที่ 4 — ตอบคำถาม (ฉบับอธิบายเข้าใจง่าย)
==========================================
1.ทำไม try-catch ครอบ await จับ reject ได้ แต่ครอบการเรียก callback ธรรมดาไม่ได้?
- เมื่อใช้ await: โค้ดจะ "หยุดรอ" อยู่บรรทัดนั้นจนกว่างานจะเสร็จ ถ้ามีปัญหาเกิดขึ้นตอนที่กำลังรอ มันก็จะโยน Error ออกมาเข้า catch ที่กำลังดักรออยู่ได้ทันที
- เมื่อใช้ Callback: โค้ดแค่สั่งงานทิ้งไว้แบบรันอยู่เบื้องหลัง แล้ว "วิ่งทะลุหลุดกรอบ" try-catch ไปจนจบเลย พอมี Error ตามมาทีหลัง (ในอนาคต) ตัว try-catch มันทำงานเสร็จและปิดตัวไปนานแล้ว จึงไม่มีใครรอรับ Error

2.ทดลอง "ลืม await" หน้า Promise.all แล้วเอาผลไปใช้ต่อ — เกิดอะไรขึ้น?
-ถ้าลืม await ระบบจะไม่รอให้ดึงข้อมูลเสร็จก่อน ตัวแปร students จึงได้รับค่าเป็นแค่ "กล่อง Promise ที่กำลังรอดำเนินการ" (ยังไม่ได้ตัว Array ข้อมูลนักศึกษามาจริงๆ) 
เมื่อเราฝืนเอากล่อง Promise นี้ไปสั่งวนลูป โปรแกรมจึงพัง (Crash) ทันที และแจ้ง Error ว่า students.forEach is not a function เพราะกล่อง Promise ไม่ใช่อาร์เรย์ จึงไม่มีคำสั่งนี้ให้ใช้
*/