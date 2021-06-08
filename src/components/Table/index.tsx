import React, { useContext, useState } from "react";
import { RecuperaLancamentosConta } from "./../../services/requests";
import {
    LancamentoContaClienteContextState,
    LancamentoContaClienteT,
} from "./../../types/Entries";
import './index.css'

interface TableT {
    LancamentoConta: LancamentoContaClienteT[];
    loaded: boolean;
}

const Table: React.FC<TableT> = ({ LancamentoConta, loaded }) => {

    return (
        <div className="table-responsive">
            <table className="table table-hover ">
                <thead>
                    <tr>
                        <th scope="col">Data do Lançamento</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Numero</th>
                        <th scope="col">Situação</th>
                        <th scope="col">Data da Confirmação</th>
                        <th scope="col">Dados Bancários</th>
                        <th scope="col">Valor Final</th>
                    </tr>
                </thead>
                <tbody>
                    {(loaded && LancamentoConta) &&
                        LancamentoConta.map(
                            (Lancamento: LancamentoContaClienteT) => {
                                return (
                                    <tr>
                                        <td>{Lancamento.dataEfetivaLancamento || "ops"}</td>
                                        <td>
                                            {
                                                Lancamento.lancamentoContaCorrenteCliente
                                                    ?.nomeTipoOperacao
                                            }
                                        </td>
                                        <td>
                                            {
                                                Lancamento.lancamentoContaCorrenteCliente
                                                    ?.numeroRemessaBanco
                                            }
                                        </td>
                                        <td className="paid">
                                            {
                                                Lancamento.lancamentoContaCorrenteCliente
                                                    ?.nomeSituacaoRemessa
                                            }
                                        </td>
                                        <td>{Lancamento.dataLancamentoContaCorrenteCliente}</td>
                                        <td>
                                            {Lancamento.nomeBanco}
                                            {
                                                Lancamento.lancamentoContaCorrenteCliente
                                                    ?.dadosDomicilioBancario.numeroContaCorrente
                                            }
                                        </td>
                                        <td>{Lancamento.valorLancamentoRemessa}</td>
                                    </tr>
                                );
                            }
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
