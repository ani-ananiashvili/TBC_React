# **Furniture Website**

A feature-rich furniture website showcasing a variety of products, powered by **Next.js** and **TypeScript** for fast performance and SEO-friendly capabilities.

---

## **Project Description**

This project is a **dynamic furniture website** migrated from **React + Vite** to **Next.js** with **TypeScript** for improved type safety and scalability.  
It showcases modern furniture collections, offering features like:

- Real-time product search and filtering  
- Optimized image loading for faster performance  
- Dynamic and static rendering for a seamless browsing experience  
- Enhanced developer experience with TypeScript

---

## **How to Install**

Follow these steps to set up the project locally:

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/ani-ananiashvili/TBC_React.git
   cd TBC_React

2. **Install dependencies:**  
   ```bash
   npm install
3. **Start the development server:**  
   ```bash
   npm run dev
4. **View the site in your browser:**
   Open http://localhost:3000

---

## **Supabase**

How to use Supabase base to fetch products from API points:

1. ### Add those to your existing .env.local file:

NEXT_PUBLIC_SUPABASE_URL=<SUBSTITUTE_SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUBSTITUTE_SUPABASE_ANON_KEY>

Get Supabase URL and AON KEY from: Supabase -> Project Settings -> Api and replace above links with those links.

2. ### Create new table from Table Editor in your Supabase account:

Go to Table Editor to the from left side panel and click "Create a new table".

**For blogs:**
Name: Blogs;
Collumns: Name[Title, Description], Type [Text, Text]; Remove created_at collumn;

**For products:**
Name: Products;
Collumns: Name[Title, Title, Description, Price], Type[text, text, text, float8];  Remove created_at collumn;


3. ### How to create API endpoints:
Create /blogs and /products subfolders in /api folder;
Create route.ts in each of them;
Template for API endpoints:

      const { data: posts, error } = await supabase.from("Blogs").select();

      return NextResponse.json(posts);

4. ### Template to fetch data on /blogsPage and /productsPage:

      const res = await fetch("http://localhost:3000/api/blogs");
      const posts: Blog[] = await res.json();