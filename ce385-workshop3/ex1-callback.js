// ส่วนที่ 1 — สร้างข้อมูลArray ของนักศึกษาอย่างน้อย 4 คน
const STUDENTS = [
  { id: "6501", name: "Somchai", major: "CE", score: 85 },
  { id: "6502", name: "Somsri", major: "CE", score: 72 },
  { id: "6503", name: "Sommai", major: "CE", score: 55 },
  { id: "6504", name: "Somying", major: "IT", score: 90 }
];

// ส่วนที่ 2 — เขียนฟังก์ชัน fetchStudentById(id, callback)
function fetchStudentById(id, callback) {
  // 1. เช็คว่า id ถูกต้องไหม (ทำทันที ไม่ต้องรอ delay)
  if (typeof id !== "string" || id.trim() === "") {
    return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง")); 
  }

  // 2. จำลองหน่วงเวลา 300ms ตามที่โจทย์กำหนด
  setTimeout(() => {
    const student = STUDENTS.find((s) => s.id === id);

    if (!student) {
      // ค้นหาไม่พบ -> ส่ง Error กลับไป
      return callback(new Error('ไม่พบรหัสนักศึกษา ${id}'));
    }

    // งานเสร็จสมบูรณ์ -> error เป็น null และคืนค่าสำเนาออบเจกต์ (...student)
    callback(null, { ...student }); 
  }, 300);
}

//ส่วนที่ 3 — เรียกใช้ครบ 3 กรณีทดสอบเรียกใช้งาน---
// กรณี ก) id ที่มีจริง
fetchStudentById("6501", (error, student) => {
  if (error) {
    return console.error("เกิดข้อผิดพลาด:", error.message);
  }
  console.log("ได้ข้อมูล:", student.name);
});

// กรณี ข) id ที่ไม่มี
fetchStudentById("9999", (error, student) => {
  if (error) {
    return console.error("เกิดข้อผิดพลาด:", error.message);
  }
  console.log("ได้ข้อมูล:", student.name);
});

// กรณี ค) id ผิดรูปแบบ
fetchStudentById(42, (error, student) => {
  if (error) {
    return console.error("เกิดข้อผิดพลาด:", error.message);
  }
  console.log("ได้ข้อมูล:", student.name);
});

console.log("บรรทัดนี้พิมพ์ก่อนได้ข้อมูล!"); // พิสูจน์ว่าทำงานแบบ Asynchronous

/*
ส่วนที่ 4 — ตอบคำถามท้ายไฟล์:
1.ถ้าลืมตรวจ error แล้วอ่าน .name ทันที จะเกิด TypeError ทำให้โปรแกรมพัง (Crash)
2.ต้อง return หลังเรียก callback(error) เพื่อหยุดการทำงานของฟังก์ชัน ป้องกันไม่ให้ทำงานต่อจนเรียก callback ซ้ำ
*/