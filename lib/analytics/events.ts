import posthog from "posthog-js";

export const analytics = {
    workspaceCreated: () => {
        posthog.capture("workspace.created");
    }, 
    memoryCreated: () => {
        posthog.capture("memory.created");
    },
    contextGenerated: () => {
        posthog.capture("context.generated");
    },
    contextCopied: () => {
        posthog.capture("context.copied");
    },
    contextShared: () => {
        posthog.capture("context.shared");
    },
    aiOptimizeSuccess: () => {
        posthog.capture("ai.optimize.success");
    }, 
    apiKeyConnected: () => {
        posthog.capture("apikey.connected")
    }
}