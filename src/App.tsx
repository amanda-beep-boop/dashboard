import { useEffect, useState } from 'react';
import { AppLayout } from './components/AppLayout/AppLayout';
import { HomePage } from './pages/HomePage';
import { IndexPage } from './pages/IndexPage';

/*
 * A stand-in for the real project's router: the page follows the URL hash.
 *   #/       home page
 *   #/index  index page
 */
function useHashPath() {
  const read = () => window.location.hash.replace(/^#\/?/, '');
  const [path, setPath] = useState(read);

  useEffect(() => {
    const onChange = () => {
      setPath(read());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return path;
}

export default function App() {
  const path = useHashPath();

  return (
    <AppLayout currentPath={path}>{path === 'index' ? <IndexPage /> : <HomePage />}</AppLayout>
  );
}
