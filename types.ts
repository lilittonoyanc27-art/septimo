export interface FullTextSection {
  id: string;
  esTitle: string;
  hyTitle: string;
  paragraphs: {
    id: string;
    es: string;
    hy: string;
  }[];
}

export interface LanguageFunctionItem {
  id: number;
  slug: string;
  esName: string;
  hyName: string;
  esPurpose: string;
  hyPurpose: string;
  types?: { es: string; hy: string }[];
  examples: {
    es: string;
    hy: string;
  }[];
  toRemember?: {
    es: string;
    hy: string;
  };
}

export interface MemoryTableRow {
  id: number;
  función: string;
  paraQueSirve: string;
  hyText: string;
}

export interface QuestionAnswer {
  id: number;
  esQuestion: string;
  hyQuestion: string;
  esAnswer: string;
  hyAnswer: string;
}

export interface ShortText {
  esParagraphs: string[];
  hyParagraphs: string[];
}
