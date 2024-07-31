import { useMemo } from 'react'
import './App.css'
import jsonData from './data.json'
import { User } from './types'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  useReactTable
} from '@tanstack/react-table'

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('name', {
    header: () => 'Имя',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    enableSorting: false
  }),
  columnHelper.accessor('email', {
    header: () => 'Электронная почта',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    enableSorting: false
  }),
  columnHelper.accessor('age', {
    header: () => 'Возраст',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    enableSorting: true
  }),
  columnHelper.accessor('registrationDate', {
    header: () => 'Дата регистрации',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    enableSorting: true
  })
]

function App() {
  const data = useMemo(() => jsonData.users, [])

  const handleRowClick = (row: Row<User>) => {
    console.log('Вы выбрали пользователя: ' + row.original.name)
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <div className="table-container">
      <table className="table">
        <thead className="thead">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="trHead" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className={`th ${
                    header.column.getCanSort()
                      ? 'th-sortable'
                      : 'th-non-sortable'
                  }`}
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  <span className="sort-icon">
                    {header.column.getCanSort() ? ' ⬍' : ' '}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="tbody">
          {table.getRowModel().rows.map((row) => (
            <tr
              className="trBody"
              key={row.id}
              onClick={() => handleRowClick(row)}
            >
              {row.getVisibleCells().map((cell) => (
                <td className="td" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
