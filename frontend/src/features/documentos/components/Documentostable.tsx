import { DocumentTableRow } from "@/components/ui/table/Table"; // ajustá el import según dónde tengas definido el tipo
import {
  DocumentCell,
  EntityCell,
  StatusBadge,
  DateCell,
} from "@/components/ui/table/table.components";
import {
  PdfClientCell,
  ActionsClientCell,
} from "@/components/ui/table/ClientCells";

type DocumentsTbodyProps = {
  rows: DocumentTableRow[];
};

export function DocumentsTbody({ rows }: DocumentsTbodyProps) {
  return (
    <>
      {rows.map((row) => (
        <tr
          key={row.id}
          className="border-t border-slate-200 transition-colors hover:bg-slate-50"
        >
          <td className="px-5 py-4 align-middle">
            <DocumentCell
              title={row.document.title}
              version={row.document.version}
            />
          </td>

          <td className="px-5 py-4 align-middle">
            <EntityCell title={row.entity.title} type={row.entity.type} />
          </td>

          <td className="px-5 py-4 text-center align-middle">
            <StatusBadge status={row.status} />
          </td>

          <td className="px-5 py-4 align-middle">
            <DateCell
              expiration={row.dates.expiration}
              expired={row.dates.expired}
            />
          </td>

          <td className="px-5 py-4 text-center align-middle">
            <PdfClientCell row={row} />
          </td>

          <td className="px-5 py-4 text-center align-middle">
            <ActionsClientCell row={row} />
          </td>
        </tr>
      ))}
    </>
  );
}
