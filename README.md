# **Chairish - Furniture Website**

A feature-rich furniture website showcasing a variety of products, powered by **Next.js** and **TypeScript** for fast performance and SEO-friendly capabilities.

---

## **Project Description**

Chairish is a **dynamic furniture website** migrated from **React + Vite** to **Next.js** with **TypeScript** for improved type safety and scalability.  
It showcases modern furniture collections from **12 different brands**, offering features like:

- **User Authentication:** Signup, Signin, and Password Reset  
- **Product Management:** Add, Buy, Delete, and View Products  
- **Cart Functionality:** Seamless buying and cart management  
- **Search, Sort, and Filter:** Enhanced product discovery  
- **Order History:** View orders  
- **Blog Management:** Delete, and Search Blog Posts  
- **Contact Form:** Sends emails directly from the website  
- **Subscription Plans:** Free and Premium options  
- **Dark and Light Modes:** Toggle themes for better UX  
- **Multi-Language Support:** English and Georgian  
- **Responsive Design:** Fully optimized for all screen sizes  

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
   
3. **Create .env.local file:**  
   In the root directory of the project, create a `.env.local` file and add the following environment variables (replace the placeholder values with your own):
   > **Note:** Make sure to replace `your_supabase_url`, `your_anon_key`, `your_github_client_id`, etc., with your actual keys and URLs. Never share sensitive keys publicly.

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your_url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_GITHUB_CLIENT_ID=your_github_client_id
   SUPABASE_GITHUB_CLIENT_SECRET=your_github_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
   STRIPE_SECRET_KEY=your_secret_key
   SUPABASE_KEY=your_service_role_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

4. **Start the development server:**  
   ```bash
   npm run dev
5. **View the site in your browser:**
   Open http://localhost:3000
