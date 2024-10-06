import '../../App.css'
import { ClientOnly } from './client'
 
export function generateStaticParams() {
  return [ {slug: [""]}, {slug: ["blog"]}, {slug: ["about"]}, {slug: ["contact"]}, {slug: ["profile"]}]
}
 
export default function Page() {
  return <ClientOnly />
}