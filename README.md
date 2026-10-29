# Personal Blogging Platform API

A RESTful API where users can register, log in, and manage their own blog posts.

**Tech stack:** Node.js, Express, TypeScript, PostgreSQL, Prisma, JWT, bcrypt, Zod, Cors

**Live demo:** `blog-api-eight-psi.vercel.app`

## Setup and Run Locally

1. Clone the repo and install dependencies:

   ```bash
   git clone <your-repo-url>
   cd blog-api
   npm install
   ```

2. Create a `.env` file (see `.env.example`):

   ```
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME"
   JWT_SECRET="your-secret"
   JWT_EXPIRES_IN="1d"
   PORT=3000
   ```

3. Run the migrations and generate the Prisma client:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

The API runs on `http://localhost:3000`.

## Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Create a new user |
| POST | `/auth/login` | No | Log in and get a JWT |
| GET | `/posts` | No | List all posts |
| POST | `/posts` | Yes | Create a post |
| PUT | `/posts/:id` | Yes (owner only) | Update a post |
| DELETE | `/posts/:id` | Yes (owner only) | Delete a post |

Protected routes need this header:

```
Authorization: Bearer <token>
```

Errors are returned as JSON, for example `{ "error": "Post not found" }`, with status codes `400`, `401`, `403`, `404`, `409`, and `500`.

## Database Choice

I used **PostgreSQL** because the data is relational: one user has many posts (a one-to-many relationship). PostgreSQL enforces this with a foreign key (`Post.authorId` points to `User.id`), keeps emails unique with a unique constraint, and deletes a user's posts automatically when the user is deleted. I used **Prisma** as the ORM for type-safe queries and easy migrations.
