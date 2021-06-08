import React, { useEffect, useState } from "react";
import { LancamentoContaClienteT } from "../../../types/Entries";
import { Line } from 'react-chartjs-2';

interface TableT {
    ChartSeries: LancamentoContaClienteT[];
    loaded: boolean;
}

const LancamentoChart: React.FC<TableT> = ({ ChartSeries }) => {
    const [data, setData] = useState<any>({
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: 'Lançamento R$',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                backgroundColor: '#00aeef',
                borderColor: '#01aeef',
            },
        ],
    });

    const [loaded, hasLoaded] = useState<boolean | any>(false);

    useEffect(() => {
        recuperaParametros(ChartSeries);
    }, []);

    function recuperaParametros(values: any) {
        let LancamentosConta: any[] = []
        let DataLancamentos: any = [];
        values.map((entry: LancamentoContaClienteT) => {
            LancamentosConta.push(entry.valorLancamentoRemessa)
            DataLancamentos.push(entry.dataLancamentoContaCorrenteCliente)
        });
        setData({
            ...data,
            labels: DataLancamentos,
            datasets: [{
                ...data.datasets[0],
                data: LancamentosConta
            }]
        })
        hasLoaded(true)
    }

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Lançamentos em Conta Corrente'
            },
        },
        interaction: {
            intersect: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function (value: any, index: any, values: any) {
                        if (parseInt(value) >= 1000) {
                            return 'R$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        } else {
                            return 'R$' + value;
                        }
                    }
                }
            }]
        }
    };

    return (
        <>
            {loaded && <Line type={'line'} data={data} options={options} />}
        </>
    );
};

export default LancamentoChart;
