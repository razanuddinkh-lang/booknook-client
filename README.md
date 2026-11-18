# 📚 BookNook – A Small Online Library

**Discover books. Build your collection. Borrow and read.**

BookNook is a modern online library platform where readers can explore books, add their own books, borrow available books for a limited period, and manage their borrowing activities. It provides a user-friendly interface with secure authentication and a responsive design for desktop, tablet, and mobile devices.

## 🌐 Live Website

- **Live Client:** [Add your deployed frontend URL]
- **Backend API:** [Add your deployed backend URL]
- **Server Repository:** [Add your server GitHub repository URL]

## ✨ Key Features

- 🔐 **User Authentication:** Register, sign in, and manage your account securely using Better Auth.
- 📖 **Explore Books:** Browse the available books in the online library.
- ➕ **Add Books:** Logged-in users can contribute new books to the library.
- 📚 **My Books:** Manage books added by the currently logged-in user.
- 🤝 **Borrow Books:** Borrow available books for a selected period.
- ↩️ **Return Books:** Return borrowed books and update book availability.
- 📋 **My Borrows:** View and manage your borrowing history.
- 🔎 **Book Discovery:** Find books using search and category filters, where supported.
- 🛡️ **Protected Pages:** Restrict private sections to authenticated users.
- 📱 **Responsive Design:** Optimized for mobile, tablet, and desktop screens.
- 🔄 **Real-time API Communication:** Connect the frontend with the Express.js backend.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| React | User interface |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| DaisyUI | UI components |
| Better Auth | Authentication |
| MongoDB | Database |
| JWT | API authentication |
| Express.js | Backend REST API |
| Vercel | Deployment |

## 📁 Project Structure

```text
client/
├── public/
├── src/
│   ├── app/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── books/
│   │   ├── add-book/
│   │   ├── my-books/
│   │   ├── my-borrows/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   └── types/
├── .env.example
├── package.json
└── README.md
```

*Note: The structure above is illustrative. Adjust it to match the actual project folders.*

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
```

### 2. Open the project folder

```bash
cd client
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the client root directory.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_uri

JWT_SECRET=your_shared_jwt_secret
```

Use only the variables actually referenced by your client application. Never expose private secrets through `NEXT_PUBLIC_` variables.

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🔗 Backend API Integration

The client communicates with the BookNook Express API.

Configure the API base URL using:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production, replace it with your deployed backend URL.

## 🚀 Deployment

The frontend can be deployed using Vercel.

1. Push the client project to GitHub.
2. Import the repository into Vercel.
3. Configure the environment variables.
4. Set the correct production API URL.
5. Deploy the application.
6. Add the deployed frontend URL to the backend's `CLIENT_URL` environment variable.

## 🔒 Security

- Keep private environment variables out of GitHub.
- Use secure authentication and JWT verification.
- Protect private pages and API operations.
- Validate user input on both client and server.
- Verify book ownership before allowing modifications.
- Verify borrow ownership before allowing returns.

## 👨‍💻 Author

**Razan Uddin Khan**

BookNook – A Small Online Library

---

⭐ If you find this project useful, consider giving it a star on GitHub!
