import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'

export interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChenge: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  perPage,
  pageIndex,
  totalCount,
  onPageChenge,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Pagina {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={'outline'}
            size={'xs'}
            className="h-8 w-8 p-0"
            onClick={() => onPageChenge(0)}
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira pagina</span>
          </Button>

          <Button
            variant={'outline'}
            size={'xs'}
            className="h-8 w-8 p-0"
            onClick={() => onPageChenge(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Pagina Anterior</span>
          </Button>
          <Button
            variant={'outline'}
            size={'xs'}
            className="h-8 w-8 p-0"
            onClick={() => onPageChenge(pageIndex + 1)}
            disabled={pages <= pageIndex + 1}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Proxíma pagina</span>
          </Button>
          <Button
            variant={'outline'}
            size={'xs'}
            className="h-8 w-8 p-0"
            onClick={() => onPageChenge(pages - 1)}
            disabled={pages <= pageIndex + 1}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Ùltima pagina</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
