import Link from "next/link";

interface Post{
  id:number,
  title:string,
  description:string,

}
export default async function PostsPage() {
  const response = await fetch("http://localhost:3000/api/posts");
  const posts:Post[] = await response.json();
  
}