declare module 'pdf-parse' {
  interface PdfData {
    /** Number of pages */
    numpages: number;
    /** Number of rendered pages */
    numrender: number;
    /** PDF info */
    info: Record<string, unknown>;
    /** PDF metadata */
    metadata: Record<string, unknown> | null;
    /** PDF.js version */
    version: string;
    /** Extracted text content */
    text: string;
  }

  interface PdfOptions {
    /** Max pages to parse (default: 0 = all pages) */
    max?: number;
    /** Page render callback */
    pagerender?: (pageData: unknown) => string;
  }

  function pdfParse(dataBuffer: Buffer, options?: PdfOptions): Promise<PdfData>;

  export = pdfParse;
}

