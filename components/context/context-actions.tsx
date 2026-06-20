'use client';
import { MoreHorizontal, Trash2, Share2, BookOpenText } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { DeleteContextDialog } from './delete-context-dialog';
import { GeneratedContext } from '@/types/generated-context';
import { ViewContextDialog } from './view-context-dialog';
import { ShareContextDialog } from './share-dialog';

type Props = { context: GeneratedContext };

export function ContextActions({ context }: Props) {

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            size='icon'
            variant='ghost'
            className='h-8 w-8'>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='border-zinc-800 bg-zinc-950 text-white flex flex-col'>
          <ViewContextDialog context={context}>
            <DropdownMenuItem className='hover:bg-zinc-900 w-full' onSelect={(e) => e.preventDefault()}>
              <BookOpenText className='h-4 w-4 mr-2' />
              View
            </DropdownMenuItem>
          </ViewContextDialog>
          <ShareContextDialog context={context}>
            <DropdownMenuItem className='hover:bg-zinc-900 w-full' onSelect={(e) => e.preventDefault()}>
              <Share2 className='h-4 w-4 mr-2' />
              Share
            </DropdownMenuItem>
          </ShareContextDialog>
          <DeleteContextDialog
            workspaceId={context.workspace_id}
            contextId={context.id}>
            <DropdownMenuItem className='text-red-500 focus:text-red-500 hover:bg-zinc-900 w-full' onSelect={(e) => e.preventDefault()}>
              <Trash2 className='h-4 w-4 mr-2' />
              Delete
            </DropdownMenuItem>
          </DeleteContextDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
