สรุป Workshop2
ข้อ 1 ระบบคำนวณคะแนน
-isValidScore: ตรวจสอบว่าคะแนนเป็นตัวเลขช่วง 0–100 หรือไม่
-toGrade: ตรวจสอบความถูกต้องของคะแนนด้วย isValidScore ก่อน แล้วใช้ .find() ค้นหาเกรดที่ตรงกับเกณฑ์ใน Array gradeCriteria
-calculateWorkshopScore: คำนวณคะแนน Workshop โดยใช้ Default Parameters เช่น (raw, full = 60, weight = 20) ป้องกันโปรแกรมทำงานผิดพลาดหากลืมส่งค่ามา
-calculateTotal: รวมคะแนนทั้ง 5 ส่วนเข้าด้วยกันก่อนนำไปตัดเกรด


ข้อ 2 ระบบค้นหาและจัดการข้อมูลทะเบียนนักศึกษา
-findById และ findByMajor: ประกาศแบบ Function Declaration โดย findById ใช้ .find() ค้นหาวัตถุนักศึกษาที่มี ID ตรงกัน ส่วน findByMajor ใช้ .filter() จัดกลุ่มนักศึกษาตามสาขาวิชา
-hasFailingStudent: ใช้ .some() เช็คว่ามีคนสอบตก (คะแนน < 50) หรือไม่
-getEmail: ใช้ Optional Chaining (?.) ช่วยเช็คชั้นของข้อมูลเพื่อป้องกัน Error ร่วมกับ Nullish Coalescing (??) ในการส่งคืนข้อความสำรอง "ไม่พบข้อมูลติดต่อ" กรณีหาไม่เจอหรือไม่มีอีเมล
-การเพิ่มข้อมูลใหม่: ไม่ใช้ .push() แต่ใช้ Spread Operator (...) เพื่อสร้าง Array ใหม่ (currentStudents) โดยไม่กระทบหรือแก้ไขข้อมูลต้นฉบับ


ข้อ 3 การจัดการและสรุปผล Array ด้วย map, filter, reduce
-calculateGrade: แปลงเป็น Arrow Function ใช้ .find() ค้นหาเกรดจาก gradeRules ตามคีย์ minScore
-getNames (ใช้ .map()): ดึงเฉพาะรายชื่อนักศึกษาทุกคนออกมาเป็น Array
-getPassedStudents (ใช้ .filter()): คัดกรองเฉพาะคนที่ได้คะแนนผ่านเกณฑ์ 50 คะแนนขึ้นไป
-getTotalScore และ getAverageScore (ใช้ .reduce()): รวบรวมคะแนนเพื่อหาผลรวมและคะแนนเฉลี่ย โดยมีเงื่อนไขเช็คความยาว Array ก่อน หากเป็น Array ว่างจะคืนค่า 0 เพื่อป้องกันการเกิด NaN

-countByGrade (ใช้ .reduce()): สรุปจำนวนนักศึกษาแยกรายเกรดลงใน Object ด้วยการเช็ค acc[grade] = (acc[grade] || 0) + 1
-getTopStudent (ใช้ .reduce()): เปรียบเทียบคะแนนเพื่อค้นหานักศึกษาที่ได้คะแนนสูงสุด โดยใส่ค่าเริ่มต้นเป็น null
-Method Chaining: นำคำสั่งมาต่อกันในบรรทัดเดียว filter -> map -> reduce เพื่อคำนวณหาคะแนนเฉลี่ยเฉพาะกลุ่มเด็กสาขา CE ที่สอบผ่านได้โดยไม่ต้องใช้ลูป for หรือ while