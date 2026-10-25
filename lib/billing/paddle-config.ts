import "server-only";
import type { PaddleEnvironment } from "@/lib/billing/plans";

export function getPaddleEnvironment(): PaddleEnvironment {
  const environment = process.env.PADDLE_ENVIRONMENT ?? "sandbox";

  if (environment !== "sandbox" && environment !== "live") {
    throw new Error("PADDLE_ENVIRONMENT must be set to sandbox or live.");
  }

  return environment;
}

export function getPaddleApiConfig() {
  const environment = getPaddleEnvironment();
  const apiKey = process.env.PADDLE_API_KEY;
  const expectedKeyPrefix = environment === "sandbox" ? "pdl_sdbx_" : "pdl_live_";

  if (!apiKey?.startsWith(expectedKeyPrefix)) {
    throw new Error(`A Paddle ${environment} API key is not configured.`);
  }

  return {
    apiKey,
    apiUrl: environment === "sandbox"
      ? "https://sandbox-api.paddle.com"
      : "https://api.paddle.com",
  };
}
