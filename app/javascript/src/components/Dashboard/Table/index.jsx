/* eslint-disable react/jsx-key */
import React from "react";

import classNames from "classnames";
import { useTable } from "react-table";

const Table = ({ type, columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const reportStyle = {
    "border-2 border-black": type === "report",
  };

  return (
    <div>
      <table
        {...getTableProps()}
        className="w-full border-black border-2 border-collapse text-left my-4"
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  className={classNames("py-2 px-3 bg-gray-400", reportStyle)}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="odd:bg-gray-100">
                {row.cells.map(cell => (
                  <td
                    className={classNames("p-3", reportStyle)}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
