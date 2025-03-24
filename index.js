import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

const app = express();

// Middleware xử lý cookie trước khi bật CORS
app.use(cookieParser());

// Cấu hình CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Cho phép gửi cookie và thông tin xác thực
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware xử lý Preflight Request
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  return res.sendStatus(200);
});

// Middleware xử lý JSON
app.use(express.json());

// Cấu hình Multer (sửa lại đường dẫn)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Lưu vào thư mục 'uploads' trong backend
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// API Upload File
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }
  res.status(200).json({ filename: req.file.filename });
});

// Import các route
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";

// Sử dụng các route
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);

// Khởi động server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
