'use client';
import { useState } from 'react';
import { MemoryBlock } from '@/types/memory-block';
import { MemoryBlockCard } from './memory-block-card';
import { generateContext } from '@/lib/context-generator';
import { Button } from '../ui/button';
import { ContextPreview } from '../context/context-preview';
import { ContextEmptyState } from '../context/context-empty-state';
import { toast } from 'sonner';
import { optimizeContextAction } from '@/app/dashboard/actions/optimize-context';
import { ContextLoadingState } from '../context/context-loading-state';
import { saveGeneratedContext } from '@/app/dashboard/actions/save-generated-context';
import { Workspace } from '@/types/workspace';

type Props = { blocks: MemoryBlock[]; workspace: Workspace };

export function MemoryBlockList({ blocks, workspace }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [generatedContext, setGeneratedContext] = useState('');
  const [copied, setCopied] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleGenerate() {
    const selectedBlocks = blocks.filter((block) => selectedIds.has(block.id));
    const context = generateContext(workspace.name, selectedBlocks);
    setGeneratedContext(context);
  }

  async function handleOptimize() {
    try {
      setOptimizing(true);
      const { success, data, error } =
        await optimizeContextAction(generatedContext);
      if (!success) {
        toast.error(error);
        console.error(error);
        return;
      }
      console.log(data);
      setGeneratedContext(data);
      toast.success('Context has optimized with AI');
    } catch (error) {
      console.error(error);
      toast.error('Failed to optimize context');
    } finally {
      setOptimizing(false);
    }
  }

  async function handleSave() {
    try {
        setSaving(true);
        const { success, error } = await saveGeneratedContext(workspace.id, generatedContext);
        if (!success) {
            toast.error(error);
            console.error(error);
            return;
        };
        setSaving(false);
        toast.success("Context saved");
    } catch (error) {
        console.error(error);
        toast.error("Failed to save context");
    } finally {
        setSaving(false);
    }
  }

  function handleSelect(blockId: string, checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (checked) {
        next.add(blockId);
      } else {
        next.delete(blockId);
      }

      return next;
    });
  }

  async function handleCopy() {
    if (!generatedContext) {
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedContext);
      setCopied(true);
      toast.success('Context copied to clipboard');
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error('Failed to copy context');
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='text-sm text-zinc-500'>{selectedIds.size} selected</div>
        <div>
          <Button
            size='sm'
            onClick={handleGenerate}
            disabled={selectedIds.size === 0 || optimizing}>
            Generate Context
          </Button>
          <Button
            size='sm'
            onClick={handleOptimize}
            disabled={!generatedContext || optimizing}>
            {optimizing ? 'Optimizing' : 'Optimize with AI'}
          </Button>
        </div>
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        {blocks.map((block) => (
          <MemoryBlockCard
            key={block.id}
            block={block}
            selected={selectedIds.has(block.id)}
            onSelect={handleSelect}
          />
        ))}
      </div>
      <div className='mt-8'>
        {optimizing ? (
          <ContextLoadingState />
        ) : generatedContext ? (
          <ContextPreview
            content={generatedContext}
            onCopy={handleCopy}
            copied={copied}
            isLoading={optimizing}
            onSave={handleSave}
            saving={saving}
          />
        ) : (
          <ContextEmptyState />
        )}
      </div>
    </div>
  );
}
