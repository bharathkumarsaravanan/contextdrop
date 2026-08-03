import posthog from "posthog-js";

export const analytics = {
    workspaceCreated: () => {
        posthog.capture("workspace.created");
    }, 
    workspacedeleted: () => {
        posthog.capture("workspace.deleted");
    }, 
    memoryCreated: () => {
        posthog.capture("memory.created");
    },
    memoryUpdated: () => {
        posthog.capture("memory.updated");
    },
    memoryDeleted: () => {
        posthog.capture("memory.deleted");
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
    },
    apiKeyDeleted: () => {
        posthog.capture("apikey.deleted")
    },

}