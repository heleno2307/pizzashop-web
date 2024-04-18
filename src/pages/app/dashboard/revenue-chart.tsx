import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DateRengePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'

export function RevenueChart() {
  const [dateRenge, setDateRenge] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })
  const { data: dailyRevenue } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', dateRenge],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRenge?.from,
        to: dateRenge?.to,
      }),
  })

  const chartData = useMemo(() => {
    return dailyRevenue?.map((chartItem) => {
      return {
        receipt: chartItem.receipt / 100,
        date: chartItem.date,
      }
    })
  }, [dailyRevenue])
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="scroll-py-1">
          <CardTitle className="text-base font-medium">
            Recita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRengePicker onDateChenge={setDateRenge} date={dateRenge} />
        </div>
      </CardHeader>
      <CardContent>
        {dailyRevenue && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart style={{ fontSize: 12 }} data={chartData}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
              <Line
                type={'linear'}
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.violet['500']}
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
