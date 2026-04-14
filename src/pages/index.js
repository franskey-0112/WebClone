import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/bose');
  }, [router]);

  return <p>Redirecting to Bose Clone...</p>;
}
