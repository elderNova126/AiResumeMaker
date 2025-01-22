import { overflowWrap } from "html2canvas/dist/types/css/property-descriptors/overflow-wrap";
import { useEffect, useRef, ReactNode } from "react";

interface ContenteditableProps {
  value: string;
  onChange: (value: string) => void;
  children?: ReactNode;
  as?: keyof JSX.IntrinsicElements | React.ElementType; // Allows for any HTML or SVG element
}

const Contenteditable: React.FC<ContenteditableProps> = (props) => {
  const { value, onChange, as: ElementType = "p", children, ...rest } = props;
  
  // For general compatibility, use React's generic ref type
  const contentEditableRef = useRef<HTMLElement | SVGElement>(null);

  useEffect(() => {
    if (contentEditableRef.current && contentEditableRef.current.textContent !== value) {
      contentEditableRef.current.textContent = value;
    }
  }, [value]);

  return (
    <ElementType
      contentEditable="true"
      ref={contentEditableRef}
      
      onInput={(event) => {
        if (contentEditableRef.current) {
          onChange(event.target.textContent || "");
        }
      }}
      style={{overflowWrap: "anywhere",}}
      {...rest}
    >
      {children}
    </ElementType>
  );
};

export default Contenteditable;
