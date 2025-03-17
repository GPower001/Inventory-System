import React, {useEffect} from 'react'
import * as echarts from 'echarts'

function BudgetChart() {
    useEffect(() => {
        echarts.init(document.querySelector('#budgetChart')).setOption({
            legend: {
                data: ['Allocated Budget', 'Actual Spending'],
            },
            radar: {
                shape: 'circle',
                indicator: [
                    {
                        name: 'Sales',
                        max: 6500,
                    },
                    {
                        name: 'Administration',
                        max: 16000,
                    },
                    {
                        name: 'Information Technology',
                        max: 30000
                    },
                    {
                        name: 'Customer Support',
                        max: 30000,
                    },
                    {
                        name: 'Development',
                        max: 52000,
                    },
                    {
                        name: 'Marketing',
                        max: 25000,
                    },
                ],
            },
            series: [
                {
                    name: 'Budget vs Spending',
                    type: 'radar',
                    data: [
                        {
                            value: [4200, 3000,20000, 35000, 50000, 18000],
                            name: 'Allocated Budget',
                        },
                        {
                            value: [5000, 14000, 20000, 26000, 42000, 21000],
                            name: 'Actual Spending',
                        },
                    ],
                },
            ],
        });
    }, []);

  return (
    <div id='budgetChart' style={{minHeight: '400px'}} className='echart'></div>
  )
}

export default BudgetChart
