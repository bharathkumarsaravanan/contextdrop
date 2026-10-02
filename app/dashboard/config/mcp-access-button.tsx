'use client';

import { Button } from '@/components/ui/button';
import { setMcpEnabled } from './actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = { enabled: boolean };

export function McpAccessButton({ enabled }: Props) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleToggle = async () => {
    setLoading(true);
    try {
      const result = await setMcpEnabled(!enabled);
      if (result.error) {
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant='outline'
      onClick={handleToggle}
      disabled={isLoading}>
      {isLoading ? 'Loading...' : enabled ? 'Disable' : 'Enable'}
    </Button>
  );
}
