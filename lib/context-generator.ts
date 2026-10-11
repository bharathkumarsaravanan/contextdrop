import { MemoryBlock } from "@/types/memory-block";

export function generateContext(
    workspaceName: string,
    blocks: MemoryBlock[]
) {
    const sections = blocks.map(block => {
        return(
`## ${block.title}  
Category: ${block.category}
Memory Type: ${block.memory_type}

${block.content}`
        ) 
        
    });

    return `WORKSPACE: ${workspaceName}
    
${sections.join("\n\n")}`

}