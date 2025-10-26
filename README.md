# 🛍️ xDesire – Full-Stack E-Commerce Platform

## 🔗 Overview
**xDesire** is a modern full-stack e-commerce platform designed for a smooth online shopping experience. 
Users can browse products, manage carts, and securely pay using Stripe (test mode). 
Admins can manage product inventory, track orders, and add new products using a dedicated dashboard.

---

## 🚀 Features
### 🧑‍💻 User Features
- Product browsing and searching (fetched dynamically from MongoDB)
- Secure JWT-based login/signup system
- Persistent shopping cart (linked to user email)
- Stripe test payments for checkout
- View and manage orders

### 🛠️ Admin Features
- Add, edit, and delete products via dashboard
- Manage customer orders
- Secure access control for admin features

---

## 🧩 Tech Stack
| Area | Technology |
|------|-------------|
| **Frontend** | Next.js 14, Tailwind CSS |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB Atlas |
| **Authentication** | JWT (JSON Web Tokens) |
| **Payments** | Stripe (Test Mode) |
| **Hosting** | Vercel / Local |

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/anurag-yv/xDesire.git
cd xDesire

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env.local file in the root directory and add:

MONGODB_URI=mongodb+srv://<your-db-connection>
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

4️⃣ Run the development server
    npm run dev

🏁 Conclusion
xDesire is a complete e-commerce solution emphasizing scalability, performance, and user experience.
It combines responsive UI, secure backend systems, and modern payment integration for a production-ready platform.