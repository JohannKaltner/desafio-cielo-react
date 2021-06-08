import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import LancamentoChart from "../components/Table/components/Chart";
import { LancamentoContaClienteT } from "../types/Entries";
import { RecuperaLancamentosConta } from "./../services/requests";
import "./index.css";
const Home: React.FC = () => {
  const [LancamentoContaCliente, setLancamento] = useState<any>([]);
  const [loaded, hasLoaded] = useState<boolean | any>(false);
  const [showAlert, setShowAlert] = useState<boolean | any>("");

  useEffect(() => {
    let resArray: LancamentoContaClienteT[] = [];
    RecuperaLancamentosConta()
      .then((res) => {
        let value = res.data.listaControleLancamento;
        value.forEach((lancamento: LancamentoContaClienteT) => {
          resArray.push(lancamento);
        });
        setLancamento(resArray);
        setShowAlert(true);
        setTimeout(() => {
          hasLoaded(true);
          setShowAlert("success");
        }, 600);
      })
      .catch((err) => {
        setShowAlert("error");
      });
  }, []);

  useEffect(() => {
    dismiss();
  }, [showAlert]);

  function dismiss() {
    if (showAlert === "error") return;
    if (showAlert === "success") {
      setTimeout(() => {
        setShowAlert("");
      }, 5000);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="jumbotron">
          <h1 className="display-4">Lançamentos em Conta</h1>
          <p className="lead">
            consulte seus lançamentos recentes na tabela abaixo.
          </p>
          <hr className="my-4" />
        </div>
        <div className="row">
          {showAlert === "error" && (
            <div className="alert alert-danger" role="alert">
              Não foi possivel recuperar os lançamentos.
            </div>
          )}
          {showAlert === "success" && (
            <div className="alert alert-info" role="alert">
              Dados recuperados com sucesso!
            </div>
          )}
        </div>
        <div className="col-12 chart-container">
          <div id="chart" className=""></div>
        </div>
      </div>
      {!loaded && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {loaded && (
        <>
          <div className="row">
            <div className="col-12 chart-container">
              <LancamentoChart
                loaded={loaded}
                ChartSeries={LancamentoContaCliente}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 table-container">
              <Table loaded={loaded} LancamentoConta={LancamentoContaCliente} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
