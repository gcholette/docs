import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react'
import * as dayjs from 'dayjs'


const getOptions = (data) => ({
    tooltip: {
        trigger: 'item'
    },
    radar: {
        scale: true,
        splitNumber: 10,
        radius: ["7%", "60%"],
        indicator: data?.challenge_categories?.map(cat => ({ name: cat.name, max: Number(cat.total_flags) })).reverse() || []
    },
    series: [
        {
            name: 'Categories',
            type: 'radar',
            tooltip: {
                trigger: 'item'
            },
            data: [
                {
                    name: 'Challenge categories',
                    value: data?.challenge_categories?.map(cat => Number(cat.owned_flags)).reverse() || [],
                    areaStyle: {
                        color: '#37cef0'
                    },
                    itemStyle: {

                        color: '#37cef0'
                    },
                    lineStyle: {
                        width: 1,
                        opacity: 1,
                        color: '#0aa5ff'
                    },
                }
            ]
        }
    ]
})

export const ChallengesChart = () => {
    const [challengesData, setChallengesData] = useState({})
    const [activityData, setActivityData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://143.110.214.36:8401/htbstats')
                const jsonData = await response.json()
                setChallengesData(jsonData.profile)
                console.log('JSON1', jsonData)
            } catch (e) {
                console.error(e)
            }

            try {
                const response = await fetch('http://143.110.214.36:8401/htbactivity')
                const jsonData = await response.json()
                setActivityData(jsonData.profile)
                console.log('JSON2', jsonData)
            } catch (e) {
                console.error(e)
            }
        }

        fetchData()
    }, [])

    if (Object.keys(challengesData).length === 0 || Object.keys(activityData) === 0) return <p> Loading ... </p>

    const options = getOptions(challengesData)

    return <div>
        <ReactECharts option={options} style={{ height: '500px', width: '500px' }} />
        <table>
            {activityData?.activity?.map(a =>
                <tr>
                    <td>
                        {a.challenge_category ? a.challenge_category : a.type}
                    </td>
                    <td>
                        {a.name}
                    </td>
                    <td>
                        {a.date_diff}
                    </td>
                </tr>
            )}
        </table>
    </div>

}