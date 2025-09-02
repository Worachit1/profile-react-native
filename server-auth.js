// Simple Express Server with Authentication
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3333;

// Enable CORS for React Native
app.use(cors());
app.use(express.json());

// Simple middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Sample users data
let userIdCounter = 1;
const sampleUsers = new Map();

// Sample book data
let bookIdCounter = 4;
const sampleBooks = new Map([
  [
    1,
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
  ],
  [
    2,
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
      image:
        "https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=JavaScript",
    },
  ],
  [
    3,
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
      image:
        "https://via.placeholder.com/300x400/45B7D1/FFFFFF?text=Mobile+App",
    },
  ],
]);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Books endpoints
app.get("/api/books", (req, res) => {
  console.log("📚 GET /api/books");
  const books = Array.from(sampleBooks.values());
  res.json({ success: true, books, total: books.length });
});

app.get("/api/books/:id", (req, res) => {
  const { id } = req.params;
  console.log(`📖 GET /api/books/${id}`);

  const book = Array.from(sampleBooks.values()).find(
    (b) => b._id === id || b.id.toString() === id
  );

  if (!book) {
    return res.status(404).json({ success: false, error: "Book not found" });
  }

  res.json({ success: true, book });
});

// POST - Create new book
app.post("/api/books", (req, res) => {
  console.log("📝 POST /api/books", req.body);

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

  // Validation
  if (!title || !author || !price) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields",
      message: "กรุณาระบุชื่อหนังสือ ผู้แต่ง และราคา",
    });
  }

  // Create new book
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
    createdAt: new Date().toISOString(),
  };

  sampleBooks.set(newId, newBook);

  res.status(201).json({
    success: true,
    book: newBook,
    message: "เพิ่มหนังสือเรียบร้อยแล้ว",
  });
});

// PUT - Update book
app.put("/api/books/:id", (req, res) => {
  const { id } = req.params;
  console.log(`✏️ PUT /api/books/${id}`, req.body);

  const bookId = parseInt(id);
  const existingBook = Array.from(sampleBooks.values()).find(
    (b) => b._id === id || b.id === bookId
  );

  if (!existingBook) {
    return res.status(404).json({
      success: false,
      error: "Book not found",
      message: "ไม่พบหนังสือที่ต้องการแก้ไข",
    });
  }

  // Update book data
  const updatedBook = {
    ...existingBook,
    ...req.body,
    id: existingBook.id,
    _id: existingBook._id,
    updatedAt: new Date().toISOString(),
  };

  // Find the actual key and update
  for (const [key, book] of sampleBooks.entries()) {
    if (book._id === id || key === bookId) {
      sampleBooks.set(key, updatedBook);
      break;
    }
  }

  res.json({
    success: true,
    book: updatedBook,
    message: "แก้ไขหนังสือเรียบร้อยแล้ว",
  });
});

// DELETE - Delete book
app.delete("/api/books/:id", (req, res) => {
  const { id } = req.params;
  console.log(`🗑️ DELETE /api/books/${id}`);

  const bookId = parseInt(id);
  const existingBook = Array.from(sampleBooks.values()).find(
    (b) => b._id === id || b.id === bookId
  );

  if (!existingBook) {
    return res.status(404).json({
      success: false,
      error: "Book not found",
      message: "ไม่พบหนังสือที่ต้องการลบ",
    });
  }

  // Find the actual key and delete
  for (const [key, book] of sampleBooks.entries()) {
    if (book._id === id || key === bookId) {
      sampleBooks.delete(key);
      break;
    }
  }

  res.json({
    success: true,
    message: "ลบหนังสือเรียบร้อยแล้ว",
    deletedBook: existingBook,
  });
});

// Authentication endpoints
app.post("/api/auth/signup", (req, res) => {
  console.log("👤 POST /api/auth/signup", req.body);

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields",
      message: "กรุณาระบุข้อมูลให้ครบถ้วน",
    });
  }

  // Check if email already exists
  const existingUser = Array.from(sampleUsers.values()).find(
    (user) => user.email === email
  );
  if (existingUser) {
    return res.status(409).json({
      success: false,
      error: "Email already exists",
      message: "อีเมลนี้มีผู้ใช้งานแล้ว",
    });
  }

  // Create new user
  const newId = userIdCounter++;
  const newUser = {
    _id: newId.toString(),
    id: newId,
    username,
    email,
    password, // In real app, should hash this!
    createdAt: new Date().toISOString(),
  };

  sampleUsers.set(newId, newUser);

  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;

  res.status(201).json({
    success: true,
    user: userWithoutPassword,
    message: "สมัครสมาชิกเรียบร้อยแล้ว",
  });
});

app.post("/api/auth/signin", (req, res) => {
  console.log("🔐 POST /api/auth/signin", { email: req.body.email });

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields",
      message: "กรุณาระบุอีเมลและรหัสผ่าน",
    });
  }

  const user = Array.from(sampleUsers.values()).find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({
      success: false,
      error: "User not found",
      message: "ไม่พบผู้ใช้งานนี้",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      success: false,
      error: "Invalid password",
      message: "รหัสผ่านไม่ถูกต้อง",
    });
  }

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    success: true,
    user: userWithoutPassword,
    message: "เข้าสู่ระบบเรียบร้อยแล้ว",
    token: `fake_token_${user._id}_${Date.now()}`,
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`\n📚 API Endpoints:`);
  console.log(`   GET    /api/books        - ดูรายการหนังสือ`);
  console.log(`   GET    /api/books/:id    - ดูรายละเอียดหนังสือ`);
  console.log(`   POST   /api/books        - เพิ่มหนังสือใหม่`);
  console.log(`   PUT    /api/books/:id    - แก้ไขหนังสือ`);
  console.log(`   DELETE /api/books/:id    - ลบหนังสือ`);
  console.log(`   GET    /api/health       - ตรวจสอบสถานะเซิร์ฟเวอร์`);
  console.log(`\n🔐 Authentication Endpoints:`);
  console.log(`   POST   /api/auth/signup  - สมัครสมาชิก`);
  console.log(`   POST   /api/auth/signin  - เข้าสู่ระบบ`);

  console.log(`\n📡 Available on:`);
  console.log(`   http://192.168.115.194:${PORT}`);
  console.log(`   http://localhost:${PORT}`);

  console.log(`\n📖 Sample books loaded: ${sampleBooks.size} books`);
});
