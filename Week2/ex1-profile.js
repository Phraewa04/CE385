// const เป็นการประกาศตัวแปรเพื่อบอกว่าค่าคงที่เป็นไม่สามารถเปลี่ยนค่าได้
const Nickname = "Woon";
const StudentId = "68111918";
const Age = 21;
const Major = "Computer Engineering";
const Registered= 6;
const Remainingyears  = 2;  // ปีที่เหลือก่อนจบ

// คำนวณปีที่จะจบ
const Graduationyear = 2569 + Remainingyears;

// แสดงผลลัพธ์ในรูปแบบของ template Literal (`)
console.log(`===== บัตรแนะนำตัว =====
ชื่อเล่น       : ${Nickname}
รหัสนักศึกษา  : ${StudentId}
อายุ         : ${Age} ปี
สาขาวิชา     : ${Major}
ลงทะเบียน    : ${Registered} วิชา
ปีที่จะจบ      : ${Graduationyear}
========================`);