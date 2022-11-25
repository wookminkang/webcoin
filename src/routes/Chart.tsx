import { useQuery } from "react-query";
import {fetchChartCoin } from "../api"
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";



interface IHistorical {
    time_open: string
    time_close: number
    open: number
    high: number
    low: number
    close: number
    volume: number
    market_cap: number
}


interface IcoinId {
    coinId : string
}


function Chart ({coinId}:IcoinId){
    
    const {isLoading,data} = useQuery<IHistorical[]>(["ohlcv",coinId],()=>
        fetchChartCoin(coinId)
    );

    const isDark = useRecoilValue(isDarkAtom);

        
    return (
        <>
            <div>
                {isLoading ? "Loading Chart..." : <ApexChart type="line"                    
                 series={[
                   {
                     name: "Price",
                     data: data?.map((price) => price.close),
                   },
                 ]}
                 options={{
                   theme: {
                     mode: isDark ? "dark" : "light",
                   },
                   chart: {
                     height: 300,
                     width: 500,
                     toolbar: {
                       show: false,
                     },
                     background: "transparent",
                   },
                   grid: { show: false },
                   stroke: {
                     curve: "smooth",
                     width: 4,
                   },
                   yaxis: {
                     show: false,
                   },
                   xaxis: {
                     axisBorder: { show: false },
                     axisTicks: { show: false },
                     labels: { show: false },
                     type: "datetime",
                     categories: data?.map(price => (price.time_close * 1000))
                   },
                   fill: {
                    type: "gradient",
                    gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                  },
                  colors: ["#0fbcf9"],
                   tooltip: {
                    y: {
                      formatter: (value) => `$${value.toFixed(2)}`,
                    },
                  },
                 }}
                />}
            </div>    
        </>
    )
}


export default Chart
