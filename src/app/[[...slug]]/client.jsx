import dynamic from 'next/dynamic';
import '../../global.css';

const App = dynamic(() => import('../../App'), { ssr: false });

export function ClientOnly() {
  return <App />;
}
