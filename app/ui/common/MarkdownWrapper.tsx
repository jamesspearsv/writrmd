import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './MarkdownWrapper.css';

interface MarkdownWrapperProps {
  value: string;
}

export default function MarkdownWrapper(props: MarkdownWrapperProps) {
  return (
    <div className="markdown-wrapper">
      <Markdown remarkPlugins={[remarkGfm]}>{props.value}</Markdown>
    </div>
  );
}
