import React from "react";

interface DataTableProps {
  jsonData: {
    head: {
      vars: string[];
    };
    results: {
      bindings: {
        [key: string]: {
          value: string;
        };
      }[];
    };
  } | null;
}

const DataTable: React.FC<DataTableProps> = ({ jsonData }) => {
  if (!jsonData || !jsonData.head || !jsonData.results) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  const headers = jsonData.head.vars;
  const rows = jsonData.results.bindings;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full py-2 align-middle inline-block">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header) => {
                    const cellValue = row[header]?.value || "";
                    const displayValue = cellValue.includes("http://")
                      ? cellValue.split("#").pop()
                      : cellValue;

                    return (
                      <td key={`${rowIndex}-${header}`} className="p-2 text-sm">
                        {displayValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
