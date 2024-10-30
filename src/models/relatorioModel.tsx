export interface Pessoa {
    name: string | null;                   // Nome completo da pessoa (pode ser nulo)
    role: string | null;                   // Função ou papel
    doc: string | null;                    // Documento de identificação
    tier: string | null;                   // Categoria ou nível de classificação
    preferenceRating: number | null;       // Classificação de preferência
    isa: boolean | null;                   // Indicador de status ISA
    status: string | null;                 // Status atual
    mc: string | null;                     // MC, pode representar um código ou descrição
    risk: string | null;                   // Indicador de risco
    monthlyIncome: number | null;          // Renda mensal
    fullAddress: string | null;            // Endereço completo
    lastUpdate: string | null;             // Data da última atualização
    associatedSince: string | null;        // Data de associação
    monthlyScr: number | null;             // SCR mensal
    monthlyScr12: number | null;             // SCR mensal
    internalStrikes: number | null;        // Contagem de restritivos internos
    externalStrikes: number | null;        // Contagem de restritivos externos
}

export interface Investimento {
    potentialExposure: number | null;
    monthlyDebt: number | null;
    realStateNetWorth: number | null;
    vehiclesNetWorth: number | null;
    investmentsNetWorth: number | null;
    fundsInvestments: number | null;
    termDepositsInvestments: number | null;
    imediateDepositsInvestments: number | null;
}

export interface InvestimentoTotais {
    monthlyScrTotal: number | null;             // SCR mensal
    monthlyScr12Total: number | null;             // SCR mensal
    potentialExposureTotal: number | null;
    monthlyDebtTotal: number | null;
    realStateNetWorthTotal: number | null;
    vehiclesNetWorthTotal: number | null;
    investmentsNetWorthTotal: number | null;
    fundsInvestmentsTotal: number | null;
    termDepositsInvestmentsTotal: number | null;
    imediateDepositsInvestmentsTotal: number | null;
}