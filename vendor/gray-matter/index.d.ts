declare namespace matter {
  interface GrayMatterFile {
    content: string;
    data: Record<string, unknown>;
    matter: string;
  }
}

declare function matter(input: string): matter.GrayMatterFile;

export = matter;
