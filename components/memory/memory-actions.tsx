'use client';
import { MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { DeleteMemoryDialog } from './delete-memory-dialog';
import { MemoryBlock } from '@/types/memory-block';
import { EditMemoryDialog } from './edit-memory-dialog';

type Props = { memoryData: MemoryBlock };

export function MemoryActions({ memoryData }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          className='h-8 w-8'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='border-zinc-800 bg-zinc-950 text-white'>
        <EditMemoryDialog memoryData={memoryData}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Pencil className='mr-2 h-4 w-4' />
            Edit
          </DropdownMenuItem>
        </EditMemoryDialog>
        <DeleteMemoryDialog
          workspaceId={memoryData.workspace_id}
          memoryId={memoryData.id}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className='text-red-500 focus:text-red-500'>
            <Trash2 className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DeleteMemoryDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
