// ข้อมูลArray ของนักศึกษาอย่างน้อย 4 คน
const STUDENTS = [
  { id: "6501", name: "Somchai", major: "CE", score: 85 },
  { id: "6502", name: "Somsri", major: "CE", score: 72 },
  { id: "6503", name: "Sommai", major: "CE", score: 55 },
  { id: "6504", name: "Somying", major: "IT", score: 90 }
];

// ฟังก์ชันตัดเกรด (toGrade)
function toGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

// ส่วนที่ 1 — เขียน fetchStudentByIdAsync(id) คืนค่า Promise

// (ห้ามใช้ async, ห่อด้วย new Promise เท่านั้น, หน่วงเวลา 300ms)
function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    // เช็ค id ผิดรูปแบบ (ทำทันที)
    if (typeof id !== "string" || id.trim() === "") {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }

    // หน่วงเวลา 300ms
    setTimeout(() => {
      const student = STUDENTS.find((s) => s.id === id);

      if (student) {
        // ค้นพบ -> resolve สำเนา object
        resolve({ ...student });
      } else {
        // ไม่พบ -> reject ข้อความ error
        reject(new Error('ไม่พบรหัสนักศึกษา ${id}'));
      }
    }, 300);
  });
}

// ส่วนที่ 2 — เรียกใช้ครบ 3 กรณีด้วย .then / .catch / .finally

// ก) id ที่มีจริง
fetchStudentByIdAsync("6501")
  .then((student) => {
    console.log("กรณี ก) สำเร็จ:", student.name);
  })
  .catch((error) => {
    console.error("กรณี ก) ล้มเหลว:", error.message);
  })
  .finally(() => {
    console.log("กรณี ก) finally: ดำเนินการเสร็จสิ้น");
  });

// ข) id ที่ไม่มี
fetchStudentByIdAsync("9999")
  .then((student) => {
    console.log("กรณี ข) สำเร็จ:", student.name);
  })
  .catch((error) => {
    console.error("กรณี ข) ล้มเหลว:", error.message);
  })
  .finally(() => {
    console.log("กรณี ข) finally: ดำเนินการเสร็จสิ้น");
  });

// ค) id ผิดรูปแบบ (เป็น Number)
fetchStudentByIdAsync(42)
  .then((student) => {
    console.log("กรณี ค) สำเร็จ:", student.name);
  })
  .catch((error) => {
    console.error("กรณี ค) ล้มเหลว:", error.message);
  })
  .finally(() => {
    console.log("กรณี ค) finally: ดำเนินการเสร็จสิ้น");
  });


// ส่วนที่ 3 — เขียน "โซ่" (Promise Chaining) 3 ขั้น

fetchStudentByIdAsync("6501")
  .then((student) => {
    // ขั้น 1: แปลงเป็น { name, grade }
    return { name: student.name, grade: toGrade(student.score) };
  })
  .then((data) => {
    // ขั้น 2: แปลงเป็นข้อความรายงาน 1 บรรทัด
    return `รายงานนักศึกษา: ${data.name} ได้รับเกรด ${data.grade}`;
  })
  .then((report) => {
    // ขั้น 3: พิมพ์ออกทาง console
    console.log("โซ่ 3 ขั้น (ผลลัพธ์):", report);
  })
  .catch((error) => {
    console.error("เกิดข้อผิดพลาดในโซ่:", error.message);
  });


// ส่วนที่ 4 (โบนัส +0.5) — เขียน promisify(fn) อเนกประสงค์

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  };
}

// --- ตัวอย่างฟังก์ชัน error-first อื่นสำหรับทดสอบ promisify ---
function multiplyAsync(a, b, callback) {
  setTimeout(() => {
    if (typeof a !== "number" || typeof b !== "number") {
      return callback(new Error("พารามิเตอร์ต้องเป็นตัวเลขเท่านั้น"));
    }
    callback(null, a * b);
  }, 100);
}

// แปลงฟังก์ชัน callback ให้กลายเป็นเวอร์ชัน Promise
const multiplyPromise = promisify(multiplyAsync);

// ทดสอบเรียกใช้งานฟังก์ชันที่ promisify แล้ว
multiplyPromise(5, 4)
  .then((result) => console.log("โบนัส Promisify (สำเร็จ): 5 * 4 =", result))
  .catch((err) => console.error("โบนัส Promisify (ล้มเหลว):", err.message));

multiplyPromise(5, "invalid")
  .then((result) => console.log("โบนัส Promisify (สำเร็จ):", result))
  .catch((err) => console.error("โบนัส Promisify (ล้มเหลว):", err.message));