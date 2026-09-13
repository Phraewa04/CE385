// ex4-combinators.js

// เครื่องมือจำลองที่โจทย์กำหนด (ห้ามแก้)
const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(
      () => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)),
      ms
    );
  });

// ==========================================
// สถานการณ์ที่ 1 — โหลดหน้าแรก (ต้องมาครบเท่านั้น)
// ==========================================
async function situation1(isAnnouncementFail) {
  try {
    // เหตุผลที่เลือก all: เพราะเงื่อนไขคือข้อมูล "ทุกชิ้น" ต้องโหลดสำเร็จหน้าแรกถึงจะแสดงได้
    // หากมีชิ้นใดชิ้นหนึ่งล้มเหลว (reject) Promise.all จะ reject ทันที ทำให้เราไปจับ Error ใน catch ได้เลย
    const results = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ", isAnnouncementFail), 
    ]);
    console.log(`เปิดหน้าแรก: ${results.join(", ")}`);
  } catch (error) {
    console.log(`หน้าแรกเปิดไม่ได้: <error> ${error.message}`);
  }
}

// ==========================================
// สถานการณ์ที่ 2 — แจ้งเตือนผลสอบ (รายงานทุกช่องทาง ห้ามพัง)
// ==========================================
async function situation2() {
  // เหตุผลที่เลือก allSettled: เพราะต้องการรอให้ครบ "ทุกช่องทาง" ไม่ว่าจะสำเร็จหรือล้มเหลว 
  // โดยที่ช่องทางที่ reject จะไม่ทำให้ระบบพังกลางคัน ทำให้เราสามารถประเมินผลลัพธ์ (status) ของแต่ละตัวได้
  const results = await Promise.allSettled([
    wait(300, "อีเมล"),
    wait(500, "SMS", true), // ตั้งใจให้ล้มเหลว
    wait(400, "แอป"),
  ]);

  console.log("รายงานผลแจ้งเตือน:");
  results.forEach((res) => {
    if (res.status === "fulfilled") {
      console.log(`- ส่งสำเร็จ: ${res.value}`);
    } else {
      console.log(`- ส่งล้มเหลว: ${res.reason.message}`);
    }
  });
}

// ==========================================
// สถานการณ์ที่ 3 — Mirror Server (เอาตัวแรกที่รอด)
// ==========================================
async function situation3() {
  try {
    // เหตุผลที่เลือก any: เพราะเราต้องการข้อมูลแค่ "ตัวแรกที่สำเร็จ (resolve)" เท่านั้น
    // ถ้า mirror-A ล้มเหลว มันจะข้ามไปรอ mirror-B ที่สำเร็จแทน โดยไม่หยุดการทำงาน
    const result = await Promise.any([
      wait(300, "mirror-A", true), // ล้มเหลว
      wait(600, "mirror-B"),       // สำเร็จ
    ]);
    console.log(`ได้ข้อมูลตัวแรกที่สำเร็จ -> ใช้ข้อมูลจาก: ${result}`);
  } catch (error) {
    console.log("เซิร์ฟเวอร์พังทั้งหมด");
  }
}

// ==========================================
// สถานการณ์ที่ 4 — ระบบค้นหา (จำกัดเวลา 800ms)
// ==========================================
// ฟังก์ชันสร้าง Timeout ของเราเอง
const timeoutPromise = (ms) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );

async function situation4() {
  try {
    // เหตุผลที่เลือก race: เพราะต้องการจับคู่ "แข่งขัน" กันระหว่างงานดึงข้อมูล กับ นาฬิกาจับเวลา
    // ใครทำงานเสร็จก่อน (ไม่ว่าจะ resolve หรือ reject) ระบบจะยึดผลลัพธ์จากตัวนั้นทันที
    const result = await Promise.race([
      wait(1200, "ฐานข้อมูล"), // ใช้เวลาเกินไปเยอะ
      timeoutPromise(800),     // หมดเวลาก่อน
    ]);
    console.log(`ได้ข้อมูล: ${result}`);
  } catch (error) {
    console.log(`เกิน 800ms -> เลิกรอ -> ใช้แคชเก่าแทน`);
  }
}

// ==========================================
// รันทุกสถานการณ์เรียงกันใน main()
// ==========================================
async function main() {
  console.log("--- สถานการณ์ที่ 1 (กรณีสำเร็จ) ---");
  await situation1(false);

  console.log("\n--- สถานการณ์ที่ 1 (กรณีประกาศล้มเหลว) ---");
  await situation1(true);

  console.log("\n--- สถานการณ์ที่ 2 ---");
  await situation2();

  console.log("\n--- สถานการณ์ที่ 3 ---");
  await situation3();

  console.log("\n--- สถานการณ์ที่ 4 ---");
  await situation4();
}

main();