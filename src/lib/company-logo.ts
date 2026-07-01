export const DEFAULT_COMPANY_LOGO_URL = "/favicon.ico";

export function isUploadedCompanyLogoUrl(url: string | null | undefined) {
  if (!url) return false;

  try {
    return new URL(url).hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}
