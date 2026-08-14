import { FileText } from "lucide-react";
import {
  getPropertyDocuments,
  type ApiPropertyDocument,
} from "@/utils/mapApiProperty";

interface Props {
  documents?: ApiPropertyDocument[] | null;
}

export default function PropertyDocuments({ documents }: Props) {
  const items = getPropertyDocuments(documents);
  if (items.length === 0) return null;

  return (
    <div className="tp-property-details-box box-5 mb-30">
      <h3 className="tp-property-details-box-title">Documents</h3>
      <ul className="tp-property-details-documents">
        {items.map((document) => (
          <li key={document.url}>
            <a
              href={document.url}
              target="_blank"
              rel="noopener noreferrer"
              download={document.fileName}
            >
              <FileText size={16} strokeWidth={2.2} aria-hidden="true" />
              <span>{document.fileName}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
