
import React from 'react';

interface Column<T> {
    key: string;
    label: string;
    render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
}

export function DataTable<T extends { id: string }>({ columns, data }: DataTableProps<T>) {
    return (
        <div className="overflow-x-auto h-full">
            <div className="h-full overflow-y-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-300 uppercase bg-gray-700/50 sticky top-0">
                        <tr>
                            {columns.map(col => (
                                <th key={col.key} scope="col" className="px-4 py-2">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                                {columns.map(col => (
                                    <td key={`${item.id}-${col.key}`} className="px-4 py-2 whitespace-nowrap">
                                        {col.render ? col.render(item) : (item as any)[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {data.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No data available.
                    </div>
                 )}
            </div>
        </div>
    );
}
