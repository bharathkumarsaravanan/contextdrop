import { Button } from '../ui/button';
import { ContextLoadingState } from './context-loading-state';

type Props = {
  content: string;
  onCopy: () => void;
  copied: boolean;
  isLoading: boolean;
  onSave?: () => Promise<void>;
  saving?: boolean;
  selectedCount?: number;
  lastUpdate: Date | null;
  optimizeBtn: React.ReactElement;
};

export function ContextPreview({
  content,
  onCopy,
  copied,
  onSave,
  saving,
  selectedCount,
  lastUpdate,
  optimizeBtn,
  isLoading
}: Props) {
  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const charCountNoSpaces = content.replace(/\s/g, '').length;

  return (
    <div className='rounded-2xl border border-zinc-800 bg-zinc-900/50'>
      <div className='border-b border-zinc-800 p-4 flex justify-between items-center'>
        <h2 className='font-semibold'>✨ AI-Ready Context</h2>
        <div>
          <Button
            size='sm'
            variant='secondary'
            onClick={onCopy}>
            {copied ? 'Copied!' : 'Copy Context'}
          </Button>
          {optimizeBtn && optimizeBtn}
          {onSave && (
            <Button
              disabled={saving}
              size='sm'
              variant='secondary'
              onClick={onSave}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          )}
        </div>
      </div>
      <div className='flex justify-between items-start p-4'>
        <p className='text-sm text-zinc-500'>
          Generated from {selectedCount} memories
          <br />
          Ready to paste into ChatGPT, Claude, Gemini, etc.
        </p>
        <div className='flex gap-2 text-xs text-zinc-500'>
          <span>Words: {wordCount}</span>
          <span>Characters: {charCountNoSpaces}</span>
          <span>Memories: {selectedCount}</span>
        </div>
      </div>
      {isLoading ? (
        <ContextLoadingState />
      ) : (
        <pre className='overflow-x-auto whitespace-pre-wrap p-4 text-sm text-zinc-200'>
          {content}
        </pre>
      )}
      <div className='flex p-4'>
        {lastUpdate && (
          <p className='text-zinc-500 text-sm'>
            Last update:{' '}
            {lastUpdate?.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}
          </p>
        )}
      </div>
    </div>
  );
}
