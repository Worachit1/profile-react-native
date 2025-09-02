# 📚 Book Management System - API Server

## การตั้งค่าและเริ่มใช้งาน

### 1. ติดตั้ง Dependencies สำหรับ API Server

```bash
# ติดตั้ง dependencies สำหรับเซิร์ฟเวอร์
npm install express cors

# หรือสำหรับ development
npm install express cors nodemon
```

### 2. เริ่มต้น API Server

```bash
# เริ่ม server
node server-example.js

# หรือใช้ nodemon สำหรับ development
npx nodemon server-example.js
```

### 3. API Endpoints ที่พร้อมใช้งาน

#### 📖 Books Management

- `GET /api/books` - ดูรายการหนังสือทั้งหมด
- `GET /api/books/:id` - ดูรายละเอียดหนังสือตาม ID
- `POST /api/books` - เพิ่มหนังสือใหม่
- `PUT /api/books/:id` - แก้ไขข้อมูลหนังสือ
- `DELETE /api/books/:id` - ลบหนังสือ

#### ⚕️ Health Check

- `GET /api/health` - ตรวจสอบสถานะเซิร์ฟเวอร์

### 4. ตัวอย่างการใช้งาน API

#### GET /api/books

```json
{
  "success": true,
  "books": [
    {
      "_id": "1",
      "id": 1,
      "title": "React Native แบบง่ายๆ",
      "author": "นักพัฒนา A",
      "description": "เรียนรู้ React Native จากพื้นฐานสู่การพัฒนาแอปจริง",
      "price": 299,
      "category": "Technology",
      "publisher": "สำนักพิมพ์เทคโนโลยี",
      "isbn": "978-616-123-456-7",
      "image": "https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=React+Native"
    }
  ]
}
```

#### POST /api/books

```json
// Request Body
{
  "title": "หนังสือใหม่",
  "author": "ผู้แต่งใหม่",
  "description": "คำอธิบายหนังสือ",
  "price": 350,
  "category": "เทคโนโลยี",
  "publisher": "สำนักพิมพ์ ABC",
  "isbn": "978-xxx-xxx-xxx-x",
  "image": "https://example.com/image.jpg"
}

// Response
{
  "success": true,
  "book": { ... },
  "message": "สร้างหนังสือใหม่เรียบร้อยแล้ว"
}
```

### 5. การตั้งค่า IP Address ในแอป React Native

ในไฟล์ React Native ให้แก้ไข IP Address ให้ตรงกับคอมพิวเตอร์ของคุณ:

```javascript
// ใน book.jsx, book_detail.jsx, book_new.jsx, book_edit.jsx
const API_BASE_URL = "http://YOUR_IP_ADDRESS:3000/api";

// ตัวอย่าง
const API_BASE_URL = "http://10.30.132.49:3000/api";
```

### 6. การตรวจสอบ IP Address ของคอมพิวเตอร์

#### Windows:

```cmd
ipconfig
```

#### macOS/Linux:

```bash
ifconfig
# หรือ
ip addr show
```

### 7. การทดสอบ API ด้วยเบราว์เซอร์

เปิดเบราว์เซอร์และไปที่:

- `http://localhost:3000/api/books` - ดูรายการหนังสือ
- `http://localhost:3000/api/health` - ตรวจสอบสถานะเซิร์ฟเวอร์

### 8. ฟีเจอร์ในแอป React Native

#### 📱 หน้าจอและฟังก์ชันที่พร้อมใช้งาน:

1. **หน้ารายการหนังสือ** (`/book`)

   - ✅ แสดงรายการหนังสือทั้งหมด
   - ✅ กดดูรายละเอียดหนังสือ
   - ✅ ปุ่มเพิ่มหนังสือใหม่
   - ✅ Pull to refresh

2. **หน้ารายละเอียดหนังสือ** (`/book_detail`)

   - ✅ แสดงข้อมูลหนังสือครบถ้วน
   - ✅ ปุ่มแชร์หนังสือ
   - ✅ ปุ่มแก้ไขหนังสือ
   - ✅ ปุ่มลบหนังสือ (พร้อม confirmation)

3. **หน้าเพิ่มหนังสือ** (`/book_new`)

   - ✅ ฟอร์มเพิ่มหนังสือใหม่
   - ✅ Validation ข้อมูล
   - ✅ บันทึกข้อมูลไปยัง API

4. **หน้าแก้ไขหนังสือ** (`/book_edit`)
   - ✅ โหลดข้อมูลหนังสือเดิม
   - ✅ ฟอร์มแก้ไขข้อมูล
   - ✅ อัปเดตข้อมูลผ่าน API
   - ✅ ปุ่มเรียกคืนข้อมูลเดิม

### 9. Troubleshooting

#### ปัญหา Network Request Failed:

1. ตรวจสอบว่าเซิร์ฟเวอร์ทำงานอยู่
2. ตรวจสอบ IP Address ให้ถูกต้อง
3. ตรวจสอบ Firewall/Antivirus
4. ลองใช้ `http://localhost:3000` แทน IP

#### ปัญหาการเชื่อมต่อบนมือถือ:

1. ต้องใช้ IP Address ของคอมพิวเตอร์ ไม่ใช่ localhost
2. มือถือและคอมพิวเตอร์ต้องอยู่ใน WiFi เดียวกัน
3. ตรวจสอบ Windows Firewall

### 10. การพัฒนาต่อ

สามารถเพิ่มฟีเจอร์เพิ่มเติมได้เช่น:

- 🔍 ค้นหาหนังสือ
- 🏷️ กรองตามหมวดหมู่
- ⭐ ระบบให้คะแนนหนังสือ
- 📷 อัปโหลดรูปภาพ
- 👤 ระบบจัดการผู้ใช้
- 💾 เชื่อมต่อฐานข้อมูลจริง (MongoDB, PostgreSQL)
