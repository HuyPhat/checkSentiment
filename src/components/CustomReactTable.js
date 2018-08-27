import React from 'react';
import ReactTable from 'react-table';

function CustomReactTable({ page, pageSize, showPageSizeOptions, data, columns, onPageChange, onPageSizeChange }) {
  return (
    <ReactTable
      filterable
      className="custom-react-table -striped -highlight"
      defaultPageSize={10}
      page={page}
      pageSize={pageSize}
      showPageSizeOptions={showPageSizeOptions}
      data={data}
      columns={columns}
      onPageChange={e => onPageChange(e)}
      onPageSizeChange={e => onPageSizeChange(e)}
    />
  );
}

export default CustomReactTable;
