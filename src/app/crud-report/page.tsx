"use client";
import { Investimento, Pessoa, InvestimentoTotais } from "@/models/relatorioModel";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { FaFileAlt } from "react-icons/fa";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Props } from "next/script";

export default function CrudReport() {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
    const [investimentosTotais, setInvestimentosTotais] = useState<InvestimentoTotais>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const crudReport = async () => {
        let dataPessoa = {};
        try {
            const response = await fetch('https://run.mocky.io/v3/7418c556-0349-4141-bb41-71238728e329'); // Substitua pelo seu URL real
            if (!response.ok) {
                throw new Error(`Erro na chamada da API: ${response.statusText}`);
            }
            dataPessoa = await response.json();

            setPessoas(dataPessoa);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                return
            }

            setError("Houve um erro ao buscar os dados da api");

        } finally {
            setLoading(false);
        }

        try {
            const responseInvestimentos = await fetch('https://run.mocky.io/v3/279801db-d80a-47da-982e-f09e72cc386d'); // Substitua pelo seu URL real
            if (!responseInvestimentos.ok) {
                throw new Error(`Erro na chamada da API: ${responseInvestimentos.statusText}`);
            }
            const dataInvestimentos = await responseInvestimentos.json();
            console.log(dataInvestimentos)

            setInvestimentos(dataInvestimentos);

            calcularTotais(dataInvestimentos, dataPessoa);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                return
            }

            setError("Houve um erro ao buscar os dados da api de investimentos");

        } finally {
            setLoading(false);
        }
    };


    const generatePDF = async () => {
        const element = document.getElementById('relatorioContent');
        if (element) {
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190; // Largura da imagem no PDF
            const pageHeight = 290; // Altura da página A4 no PDF
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position + 10, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position + 10, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('relatorio.pdf');
        }
    };

    useEffect(() => {
        crudReport();
    }, []);

    const calcularTotais = async (investimentosCalc: Investimento[], pessoasCalc: Pessoa[]) => {

        let totais: InvestimentoTotais = {
            monthlyScrTotal: 0,
            monthlyScr12Total: 0,
            potentialExposureTotal: 0,
            monthlyDebtTotal: 0,
            realStateNetWorthTotal: 0,
            vehiclesNetWorthTotal: 0,
            investmentsNetWorthTotal: 0,
            fundsInvestmentsTotal: 0,
            termDepositsInvestmentsTotal: 0,
            imediateDepositsInvestmentsTotal: 0,
        };

        for (let i = 0; i < investimentosCalc.length; i++) {
            totais.potentialExposureTotal += investimentosCalc[i].potentialExposure;
            totais.monthlyDebtTotal += investimentosCalc[i].monthlyDebt;
            totais.realStateNetWorthTotal += investimentosCalc[i].realStateNetWorth;
            totais.vehiclesNetWorthTotal += investimentosCalc[i].vehiclesNetWorth;
            totais.investmentsNetWorthTotal += investimentosCalc[i].investmentsNetWorth;
            totais.fundsInvestmentsTotal += investimentosCalc[i].fundsInvestments;
            totais.termDepositsInvestmentsTotal += investimentosCalc[i].termDepositsInvestments;
            totais.imediateDepositsInvestmentsTotal += investimentosCalc[i].imediateDepositsInvestments;

            if (pessoasCalc[i]) {
                totais.monthlyScrTotal += pessoasCalc[i].monthlyScr;
                totais.monthlyScr12Total += pessoasCalc[i].monthlyScr12;
            }

        }

        setInvestimentosTotais(totais);

    }


    return (
        <div className="p-4 lg:p-8 space-y-4">

            {loading && <p>Carregando dados...</p>}
            {error && <p>Erro: {error}</p>}
            {pessoas && pessoas.length > 0 && (<div>



                {/* Cabeçalho */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
                    {/* Título com Ícone */}
                    <div className="flex items-center space-x-2">
                        <FaFileAlt className="text-[#3CB371] text-2xl" />
                        <h1 className="text-2xl font-bold">Relatório de Dados</h1>
                    </div>

                    {/* Data de Corte */}
                    <div className="text-center text-gray-700">
                        <span className="font-semibold">Data de Corte dos Dados: </span>
                        <span>00/00/00</span>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex space-x-2">
                        <button className="bg-[#3CB371] text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition" onClick={generatePDF} >
                            Relatório
                        </button>

                        <Link href="/">

                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
                                Fechar
                            </button>
                        </Link>

                    </div>
                </div>

                {/* Corpo da Página */}
                <div id="relatorioContent"  className="flex flex-col lg:flex-row gap-4">

                    {/* Coluna Esquerda - Dados do Usuário */}
                    <div className="w-full lg:w-1/5 bg-gray-100 p-4 rounded-lg shadow-md">

                        {/*proponente */}
                        {pessoas.map((pessoa, index) => (
                            <div key={index} className="mt-4" >
                                <div className="flex items-baseline justify-between">
                                    <h2 className="text-2xl font-bold">{pessoa.name}</h2>
                                    <span className="text-gray-600 text-sm">{pessoa.role}</span>
                                </div>
                                <div className="border-t-4 border-[#3CB371] my-4"></div>
                                <div className="flex flex-col gap-2">
                                    <p>Email: <strong>{pessoa.lastUpdate}</strong></p>
                                    <p>Endereço: <strong>{pessoa.fullAddress}</strong></p>
                                    <p>Data de atualização: <strong>00/00/0000 </strong></p>
                                    <p>Data de associação: <strong> {pessoa.associatedSince} </strong></p>
                                    <p>SCR mensal: <strong>{pessoa.monthlyScr} </strong></p>
                                    <p>SCR anual: <strong> {pessoa.monthlyScr12} </strong></p>
                                    <p>Restritivo interno: <strong>{pessoa.internalStrikes} </strong></p>
                                    <p>Restritivo externo: <strong> {pessoa.externalStrikes} </strong></p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Coluna Direita - Tabela */}
                    <div className="w-full lg:w-4/5 bg-white p-4 rounded-lg shadow-md overflow-auto">

                        <h2 className="text-2xl font-bold text-[#3CB371] mb-4">Endividamento</h2>
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-[#3CB371] text-white text-left">
                                    <th className="p-2">Nome</th>
                                    <th className="p-2">Src anual</th>
                                    <th className="p-2">SRC mensal</th>
                                    <th className="p-2">Aquisição potencial</th>
                                    <th className="p-2">Compartilhamento mensal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {investimentos.map((investimento, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2">{pessoas[index].name}</td>
                                        <td className="p-2">{pessoas[index].monthlyScr || 0}</td>
                                        <td className="p-2">{pessoas[index].monthlyScr12 || 0}</td>
                                        <td className="p-2">{investimento.potentialExposure || 0}</td>
                                        <td className="p-2">{investimento.monthlyDebt || 0}</td>
                                    </tr>
                                ))}
                                <tr className="border-b">
                                    <td className="p-2">Total</td>
                                    <td className="p-2">{investimentosTotais.monthlyScr12Total || 0}</td>
                                    <td className="p-2">{investimentosTotais.monthlyScrTotal || 0}</td>
                                    <td className="p-2">{investimentosTotais.potentialExposureTotal || 0}</td>
                                    <td className="p-2">{investimentosTotais.monthlyDebtTotal || 0}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h2 className="text-2xl font-bold text-[#3CB371] mb-4 mt-4">Patrimônio</h2>
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-[#3CB371] text-white text-left">
                                    <th className="p-2">Nome</th>
                                    <th className="p-2">Imóveis</th>
                                    <th className="p-2">Veículos</th>
                                    <th className="p-2">Investimentos</th>
                                    <th className="p-2">Todos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {investimentos.map((investimento, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2">{pessoas[index].name}</td>
                                        <td className="p-2">{investimento.realStateNetWorth || 0}</td>
                                        <td className="p-2">{investimento.vehiclesNetWorth || 0}</td>
                                        <td className="p-2">{investimento.investmentsNetWorth || 0}</td>
                                        <td className="p-2">0</td>
                                    </tr>
                                ))}
                                <tr className="border-b">
                                    <td className="p-2">Total</td>
                                    <td className="p-2">{investimentosTotais.realStateNetWorthTotal}</td>
                                    <td className="p-2">{investimentosTotais.vehiclesNetWorthTotal}</td>
                                    <td className="p-2">{investimentosTotais.investmentsNetWorthTotal}</td>
                                    <td className="p-2">{0}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h2 className="text-2xl font-bold text-[#3CB371] mb-4 mt-4">Investimentos</h2>
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-[#3CB371] text-white text-left">
                                    <th className="p-2">Nome</th>
                                    <th className="p-2">Fundos</th>
                                    <th className="p-2">Depósito a prazo</th>
                                    <th className="p-2">Depósito a vista</th>
                                    <th className="p-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {investimentos.map((investimento, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2">{pessoas[index].name}</td>
                                        <td className="p-2">{investimento.fundsInvestments || 0}</td>
                                        <td className="p-2">{investimento.termDepositsInvestments || 0}</td>
                                        <td className="p-2">{investimento.imediateDepositsInvestments || 0}</td>
                                        <td className="p-2">{(investimento.fundsInvestments || 0) + (investimento.termDepositsInvestments || 0) + (investimento.imediateDepositsInvestments || 0)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
            )}
        </div >
    );
}