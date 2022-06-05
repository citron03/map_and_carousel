import styled from "styled-components";
import { ApexOptions } from "apexcharts";
import ApexCharts from "react-apexcharts";
import { useEffect, useState } from "react";

interface dataProp {
    category_group_name: string;
}

interface PieChartProps {
    data: Array<dataProp>
}

const PieChartDiv = styled.div`
    margin: 50px auto;
    padding: 50px;
    width: 50%;
    @media only screen and (max-width: 767px) {
        width: 70%;
        margin: auto;
        padding: 0;
        h2 {
            font-size: 1rem;
        }
    }
`

const PieChart: React.FC<PieChartProps> = ({data}) => {
    
    const [series, setSeries] = useState([44, 55, 41, 17, 15]);
    const [options, setOptions] = useState<ApexOptions>({
        chart: {
            height: 300,
            type: "line",
            zoom: {
                enabled: true
            }
        },
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    });

    useEffect(() => {
        if(data.length > 0){
            const tmpObj = {} as any;
            for(let i of data){
                let {category_group_name} = i;
                let category = category_group_name || "카테고리 없음";
                if(tmpObj[category]) {
                    tmpObj[category] = tmpObj[category] + 1;
                } else {
                    tmpObj[category] = 1;
                }
            }
            let newLabels = Object.keys(tmpObj);
            let newSeries: number[] = Object.values(tmpObj);
            setOptions(prev => Object.assign({...prev}, {"labels": newLabels}));
            setSeries(newSeries);
            
        }
    }, [data])

    
    return (
        <PieChartDiv>
            <h2>검색 결과의 카테고리 파이 차트</h2>
            <ApexCharts options={options} series={series} type="donut"/>
        </PieChartDiv>
    );
}

export default PieChart;