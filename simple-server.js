const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3333;

// Enable CORS
app.use(cors());
app.use(express.json());

// Simple logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Sample book data
let bookIdCounter = 4;
const books = [
  {
    _id: "1",
    id: 1,
    title: "React Native แบบง่ายๆ",
    author: "นักพัฒนา A",
    description: "เรียนรู้ React Native จากพื้นฐานสู่การพัฒนาแอปจริง",
    price: 299,
    category: "Technology",
    publisher: "สำนักพิมพ์เทคโนโลยี",
    isbn: "978-616-123-456-7",
    publishDate: "2024-01-15",
    image:
      "https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=React+Native",
  },
  {
    _id: "2",
    id: 2,
    title: "JavaScript สำหรับมือใหม่",
    author: "นักพัฒนา B",
    description: "เรียน JavaScript จากเบื้องต้นจนเป็นมืออาชีพ",
    price: 250,
    category: "Programming",
    publisher: "สำนักพิมพ์โปรแกรมมิ่ง",
    isbn: "978-616-123-457-4",
    publishDate: "2024-02-20",
    image: "https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=JavaScript",
  },
  {
    _id: "3",
    id: 3,
    title: "Mobile App Development",
    author: "Developer C",
    description: "การพัฒนาแอปมือถืออย่างมืออาชีพ",
    price: 350,
    category: "Mobile",
    publisher: "สำนักพิมพ์มือถือ",
    isbn: "978-616-123-458-1",
    publishDate: "2024-03-10",
    image: "https://via.placeholder.com/300x400/45B7D1/FFFFFF?text=Mobile+App",
  },
];

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// GET all books
app.get("/api/books", (req, res) => {
  res.json({ success: true, books, total: books.length });
});

// GET single book
app.get("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b._id === id || b.id.toString() === id);

  if (!book) {
    return res.status(404).json({ success: false, error: "Book not found" });
  }

  res.json({ success: true, book });
});

// POST new book
app.post("/api/books", (req, res) => {
  console.log("📝 Creating new book:", req.body);

  const {
    title,
    author,
    description,
    price,
    category,
    publisher,
    isbn,
    publishDate,
    image,
  } = req.body;

  if (!title || !author || !price) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields",
      message: "กรุณาระบุชื่อหนังสือ ผู้แต่ง และราคา",
    });
  }

  const newId = bookIdCounter++;
  const newBook = {
    _id: newId.toString(),
    id: newId,
    title,
    author,
    description: description || "",
    price: Number(price),
    category: category || "General",
    publisher: publisher || "",
    isbn: isbn || "",
    publishDate: publishDate || new Date().toISOString().split("T")[0],
    image:
      image || "https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Book",
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    book: newBook,
    message: "เพิ่มหนังสือเรียบร้อยแล้ว",
  });
});

// PUT update book
app.put("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((b) => b._id === id || b.id.toString() === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: "Book not found",
      message: "ไม่พบหนังสือที่ต้องการแก้ไข",
    });
  }

  books[index] = { ...books[index], ...req.body };

  res.json({
    success: true,
    book: books[index],
    message: "แก้ไขหนังสือเรียบร้อยแล้ว",
  });
});

// DELETE book
app.delete("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((b) => b._id === id || b.id.toString() === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: "Book not found",
      message: "ไม่พบหนังสือที่ต้องการลบ",
    });
  }

  const deletedBook = books.splice(index, 1)[0];

  res.json({
    success: true,
    message: "ลบหนังสือเรียบร้อยแล้ว",
    deletedBook,
  });
});

// Sample users for auth
const users = [];
let userIdCounter = 1;

// Signup
app.post("/api/auth/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "กรุณาระบุข้อมูลให้ครบถ้วน",
    });
  }

  // Check if email exists
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({
      success: false,
      message: "อีเมลนี้มีผู้ใช้งานแล้ว",
    });
  }

  const newUser = {
    _id: userIdCounter++,
    username,
    email,
    password,
  };

  users.push(newUser);

  const { password: _, ...userWithoutPassword } = newUser;

  res.status(201).json({
    success: true,
    user: userWithoutPassword,
    message: "สมัครสมาชิกเรียบร้อยแล้ว",
  });
});

// Signin
app.post("/api/auth/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "กรุณาระบุอีเมลและรหัสผ่าน",
    });
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "ไม่พบผู้ใช้งานนี้",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      success: false,
      message: "รหัสผ่านไม่ถูกต้อง",
    });
  }

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    success: true,
    user: userWithoutPassword,
    token: `fake_token_${user._id}_${Date.now()}`,
    message: "เข้าสู่ระบบเรียบร้อยแล้ว",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Simple server running on port ${PORT}`);
  console.log(`📚 Available at: http://192.168.115.194:${PORT}`);
  console.log(`📖 Books loaded: ${books.length}`);
});
