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
        <div className="shadow overflow-hidden border-b border-gray-400 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-400">
            <thead className="bg-gray-200">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-400"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-400">
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {headers.map((header) => {
                    const cellValue = row[header]?.value || "";
                    const displayValue = cellValue.includes("http://")
                      ? cellValue.split("#").pop()
                      : cellValue;

                    return (
                      <td
                        key={`${rowIndex}-${header}`}
                        className="px-6 py-4 text-sm text-gray-700 border-b border-gray-400"
                      >
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
