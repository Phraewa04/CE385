import express from "express";

const app = express();
app.use(express.json());

const TODOS = [
  { id: "1", title: "อ่านสไลด์สัปดาห์ที่ 5", done: true, priority: "high" },
  { id: "2", title: "ติดตั้ง Express", done: true, priority: "high" },
  { id: "3", title: "ทำ Workshop", done: false, priority: "normal" }, // แก้ nomal เป็น normal
  { id: "4", title: "เตรียมสอบกลางภาค", done: false, priority: "low" }
];

const PRIORITIES = ["high", "normal", "low"]; // แก้ชื่อตัวแปรและ normal

function validateTodo(req, res, next) {
  const { title, priority } = req.body ?? {};

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "ต้องมี title เป็นข้อความ" }); // แก้ eror เป็น error
  }
  if (priority !== undefined && !PRIORITIES.includes(priority)) {
    return res.status(400).json({ error: "priority ไม่ถูกต้อง" }); // แก้ eror เป็น error
  }
  return next();
}

const todoRouter = express.Router();

todoRouter.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

todoRouter.get("/", (req, res) => {
  // แก้จาก res.status เป็น res.json
  res.json(TODOS.map((t) => ({ ...t })));
});

todoRouter.get("/:id", (req, res) => {
  const todo = TODOS.find((t) => t.id === req.params.id);
  if (!todo) {
    // ลบช่องว่างตรง res.status และเปลี่ยนไปใช้ Backtick (`)
    return res.status(404).json({ error: `ไม่พบรายการ ${req.params.id}` });
  }
  return res.json({ ...todo });
});

// แก้จาก "/todos" เป็น "/" เพื่อไม่ให้ path กลายเป็น /api/v1/todos/todos
todoRouter.post("/", validateTodo, (req, res) => {
  const created = {
    id: String(TODOS.length + 1),
    title: req.body.title,
    done: false, // เพิ่มสถานะเริ่มต้น
    priority: req.body.priority ?? "normal", // แก้ nomal เป็น normal
  };
  TODOS.push(created);
  res.status(201).json({ ...created });
});

app.use("/api/v1/todos", todoRouter);

app.listen(3000, () => {
  console.log("เซิร์ฟเวอร์ทำงานที่ http://localhost:3000");
});