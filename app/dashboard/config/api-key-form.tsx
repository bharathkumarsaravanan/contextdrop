'use client';
import { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { saveOpenRouterKey } from '@/app/dashboard/actions/save-openrouter-key';
import { toast } from 'sonner';
import { CircleCheckBig } from 'lucide-react';

type Props = { hasKey: boolean };

export function ApiKeyForm({ hasKey }: Props) {
  const [apikey, setApikey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    try {
      setSaving(true);

      const { success, error } = await saveOpenRouterKey(apikey);

      if (!success) {
        toast.error(error);
        return;
      }

      toast.success('OpenRouter connected successfully.');

      setApikey('');
    } catch (error) {
      console.error(error);

      toast.error('Failed to save API key.');
    } finally {
      setSaving(false);
    }
  }

  if (hasKey) {
    return (
      <div className='space-y-4 mt-4'>
        <div className='rounded-lg border p-4'>
          <p className='font-medium flex gap-2 items-center'><CircleCheckBig className="h-4 w-4 text-green-500" /> OpenRouter Connected</p>
          <p className='text-sm text-muted-foreground mt-1'>
            Your API key is securely encrypted and will only
            be used for requests from your account.
          </p>


          <p className="text-xs text-muted-foreground text-zinc-400 mt-4">
            Free optimizations are no longer
            consumed while this key is connected.
          </p>

          
          
        </div>
        <div className="flex gap-3 mt-6">
            <Button variant="outline">Replace API Key</Button>
            <Button variant="destructive">Remove API Key</Button>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4 mt-4'>
      <div className='relative'>
        <Input
          type={showKey ? 'password' : 'text'}
          value={apikey}
          onChange={(e) => setApikey(e.target.value)}
          placeholder='sk-or-v1-...'
          className='pr-10'
        />

        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2'
          onClick={() => setShowKey((current) => !current)}>
          {showKey ? (
            <EyeOff className='h-4 w-4' />
          ) : (
            <Eye className='h-4 w-4' />
          )}
        </Button>
      </div>
      <Button
        onClick={handleSave}
        disabled={!apikey.trim() || saving}>
        {saving ? 'Connecting...' : 'Connect OpenRouter'}
      </Button>
    </div>
  );
}
