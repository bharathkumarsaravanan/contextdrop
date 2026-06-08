"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select";
import { MEMORY_CATEGORIES } from "@/lib/constants";


type Props = {
    initialValues?: {
        title: string;
        content: string;
        category: string;
    };
    submitText: string;
    isLoading: boolean;
    onSubmit: (
        formData: FormData
    ) => Promise<void>;
};

export function MemoryForm({
    initialValues,
    submitText,
    onSubmit,
    isLoading
}: Props) {

    const [category, setCategory] = useState(initialValues?.category || "Development");

    function handleSubmit(formData: FormData) {
        formData.set("category", category);
        onSubmit(formData);
    }

    return (
        <form
            action={handleSubmit}
            className='space-y-4'>
            <Input
              defaultValue={initialValues?.title}
              name='title'
              placeholder='Title'
              className='h-12 rounded-xl border-zinc-800 bg-zinc-950 focus-visible:ring-1 focus-visible:ring-zinc-500'
            />

            <Select
              value={category}
              onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent
                position='popper'
                className='z-50 border-zinc-800 bg-zinc-900 text-white'>
                {MEMORY_CATEGORIES.map((cate) => (
                  <SelectItem
                    key={cate}
                    className="hover:bg-zinc-800/80"
                    value={cate}>
                    {cate}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              name='content'
              defaultValue={initialValues?.content}
              placeholder='Paste reusable AI context here...'
              className='min-h-[180px] rounded-xl border-zinc-800 bg-zinc-950 focus-visible:ring-1 focus-visible:ring-zinc-500'
            />
            <Button
              type='submit'
              className='h-11 w-full rounded-xl bg-zinc-100 text-black hover:bg-white'
              disabled={isLoading}>
              {isLoading ? 'Loading...' : submitText}
            </Button>
          </form>
    )
}