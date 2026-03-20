📝 Blog Application

A full-stack blog platform built using Node.js, Express, MongoDB, and EJS.
Users can create, edit, delete blogs and interact through comments with authentication.

⸻

🚀 Features
	•	User Authentication (JWT-based)
	•	Create, Edit, Delete Blogs
	•	Comment System
	•	Image Upload for Blogs
	•	Authorization (only author can edit/delete)
	•	Clean UI using Bootstrap

⸻

🛠️ Tech Stack
	•	Backend: Node.js, Express
	•	Database: MongoDB (Mongoose)
	•	Frontend: EJS, Bootstrap (CDN)
	•	Authentication: JWT

⸻

📂 User Schema

fullName: String
email: String
salt: String
password: String
profileImageUrl: String
role: ["USER", "ADMIN"]
timestamps: true

⸻

🔐 Password Security
	•	Uses salt + hash (HMAC SHA-256)
	•	A random string (salt) is generated for each user
	•	Password is hashed using:
    hash = HMAC(password + salt)
    •	Protects against common attacks like rainbow tables

⸻

🔑 Authentication Flow

Signup
	•	User data stored with hashed password
	•	Default role: USER
	•	Default profile image assigned

Signin
	•	Find user using email
	•	Hash entered password with stored salt
	•	Compare hashes
	•	If matched → generate JWT token

⸻

🔒 JWT Authentication
	•	Token generated after login
	•	Stored in cookies
	•	Used to:
	•	Verify user identity
	•	Protect routes (edit/delete/comment)

⸻

✏️ Blog Features
	•	Create blog with image upload
	•	Edit blog content
	•	Delete blog (with confirmation)
	•	Only author can modify their blog

⸻

💬 Comment System
	•	Logged-in users can comment
	•	Each comment is linked to:
	•	Blog
	•	User (createdBy)

⸻