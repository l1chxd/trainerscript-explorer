export type RemarkHtmlTransformer = (markdown: string) => string | Promise<string>;

export default function remarkHtml(): RemarkHtmlTransformer;
