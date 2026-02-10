"use client";

import { SignatureSelector } from "@/src/components/SignatureSelector";
import { useState } from "react";

const QUESTIONS = [
  "01. Todos os uniformes estão limpos e em bom estado de conservação, todos lavaram as mãos antes de entrar no packing house e depois de usar os banheiros e após os intervalos de trabalho?",
  "02. Todos estão utilizando seu EPI de forma correta, como especificado por área de risco?",
  "03. A higiene pessoal é rigorosamente respeitada? (Unhas, barba, cabelo...)",
  "04. Foram encontrados objetos pessoais na área de produção (Aplica-se também a relógios e Celulares)?",
  "05. Práticas educacionais como; Não fumar, não comer, não tossir, não cuspir no chão, etc. (na área de produção), são respeitadas?",
  "06. Todos antes de entrarem na área de produção, lavam e sanitizam as mãos?",
  "07. Funcionários que possuem feridas expostas e/ou doenças infectocontagiosas são retirados da atividade, que requer contato direto com o fruto?",
  "08. Todos inclusive os visitantes e os funcionários administrativos se ajustam às práticas de segurança alimentar ao adentrarem as áreas de produção e/ou áreas sanitárias?",
  "09. Os funcionários despem-se dos uniformes ao saírem da área de produção e/ou quando utilizam os sanitários?",
  "10. Os cestos de lixo estão tampados e com sacos plásticos? São esvaziados constantemente?",
  "11. As informações existentes nos cartazes educativos contemplam às necessidades do packing e estão em bom estado de conservação e limpeza?",
  "12. As instalações sanitárias estão funcionando adequadamente? (vasos, pias, chuveiros, estações de lavagem das mãos).",
  "13. Há disponibilidade de maneira adequada e satisfatória dos materiais de limpeza, higienização e sanitização? (gel, sabonete antisséptico, papel higiênico, sanitizantes)",
  "14. Os equipamentos e materiais utilizados na produção são devidamente manuseados e guardados, adequadamente, durante e após seu uso?",
  "15. Os bebedouros são limpos e sanitizados periodicamente?",
  "16. Equipamentos portáteis, como balanças, são devidamente limpos e sanitizados?",
  "17. Os Funcionários apresentam-se isentos de feridas expostas, lesões ou cortes na pele?",
  "18. Os Funcionários estão acometidos de doenças gastrintestinais crônicas ou agudas?",
  "19. Os funcionários estão acometidos de sintomas como infecções pulmonares ou faringites?",
];

const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

type DayStatus = "ok" | "no" | null;

interface ChecklistRow {
  questionId: number;
  Seg: DayStatus;
  Ter: DayStatus;
  Qua: DayStatus;
  Qui: DayStatus;
  Sex: DayStatus;
  Sáb: DayStatus;
}

interface ActionPlan {
  id: number;
  date: string;
  item: string;
  nonConformity: string;
  rootCause: string;
  action: string;
  responsible: string;
  status: "pending" | "in_progress" | "completed";
}

const COMPLIANCE = {
  revisedBy: "Clebitânia Carvalho",
  revisionDate: "02/01/2026",
  popCode: "POP-02",
};

export default function MonitoramentoConduta() {
  const [week, setWeek] = useState("01 a 07 de Janeiro");
  const [area, setArea] = useState<"embaladora" | "camara">("embaladora");
  const [showStats, setShowStats] = useState(true);
  const [showActionPlan, setShowActionPlan] = useState(true);

  const [signatures, setSignatures] = useState({
    coordinator: null as string | null,
  });


  const [checklist, setChecklist] = useState<ChecklistRow[]>(
    QUESTIONS.map((_, i) => ({
      questionId: i + 1,
      Seg: null,
      Ter: null,
      Qua: null,
      Qui: null,
      Sex: null,
      Sáb: null,
    })),
  );

  const [actions, setActions] = useState<ActionPlan[]>([
    {
      id: 1,
      date: "",
      item: "",
      nonConformity: "",
      rootCause: "",
      action: "",
      responsible: "",
      status: "pending",
    },
  ]);

  const toggleStatus = (rowIndex: number, day: string) => {
    const newChecklist = [...checklist];
    // @ts-ignore
    const current = newChecklist[rowIndex][day];

    let next: DayStatus = "ok";
    if (current === "ok") next = "no";
    if (current === "no") next = null;

    // @ts-ignore
    newChecklist[rowIndex][day] = next;
    setChecklist(newChecklist);
  };

  const addActionRow = () => {
    const newId = actions.length > 0 ? actions[actions.length - 1].id + 1 : 1;
    setActions([
      ...actions,
      {
        id: newId,
        date: "",
        item: "",
        nonConformity: "",
        rootCause: "",
        action: "",
        responsible: "",
        status: "pending",
      },
    ]);
  };

  const updateAction = (
    index: number,
    field: keyof ActionPlan,
    value: string,
  ) => {
    const newActions = [...actions];
    // @ts-ignore
    newActions[index][field] = value;
    setActions(newActions);
  };

  // Calcular estatísticas
  const totalDays = DAYS.length;
  const totalQuestions = QUESTIONS.length;
  const totalCells = totalDays * totalQuestions;

  let okCount = 0;
  let noCount = 0;
  let pendingCount = 0;

  checklist.forEach((row) => {
    DAYS.forEach((day) => {
      // @ts-ignore
      const status = row[day];
      if (status === "ok") okCount++;
      if (status === "no") noCount++;
      if (status === null) pendingCount++;
    });
  });

  const completionRate = Math.round(((okCount + noCount) / totalCells) * 100);
  const complianceRate =
    totalCells > 0 ? Math.round((okCount / totalCells) * 100) : 0;
  const ncRate = totalCells > 0 ? Math.round((noCount / totalCells) * 100) : 0;

  const ncItems = actions.filter((a) => a.nonConformity.trim()).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-red-50 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* === HEADER PRINCIPAL === */}
        <header className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl mb-6 overflow-hidden border border-gray-200">
          {/* === TOPO COLORIDO === */}
          <div className="p-4 sm:p-6 bg-linear-to-r from-red-600 to-orange-600">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold text-white leading-tight">
                    Monitoramento de Conduta e Saúde
                  </h1>
                  <p className="text-xs sm:text-sm text-red-100 mt-1">
                    Sistema de Segurança Alimentar e BPF
                  </p>
                </div>
              </div>

              <div className="flex justify-end md:block">
                <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-lg text-right">
                  <p className="text-white text-xs sm:text-sm">Código</p>
                  <p className="text-white font-bold text-lg sm:text-xl">
                    {COMPLIANCE.popCode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* === CONTROLES DO CABEÇALHO === */}
          <div className="p-4 sm:p-5 bg-linear-to-r from-red-50 to-orange-50 border-b border-red-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* 1. SEMANA */}
              <div>
                <label className="font-bold text-gray-700 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Período da Semana
                </label>
                <input
                  type="text"
                  value={week}
                  onChange={(e) => setWeek(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 sm:py-3 sm:px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Ex: 01 a 07 de Janeiro"
                />
              </div>

              {/* 2. ÁREA (Layout Flexível: Coluna no Mobile / Linha no PC) */}
              {/* Opção 1: Estilo Segmentado (Botões) */}
              <div>
                <label className="font-bold text-gray-700 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Área de Monitoramento
                </label>

                <div className="bg-gray-100 p-1 rounded-lg flex relative">
                  {/* Botão Embaladora */}
                  <button
                    onClick={() => setArea("embaladora")}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
        ${area === "embaladora"
                        ? "bg-white text-red-600 shadow-sm ring-1 ring-gray-200"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    <span className={area === "embaladora" ? "font-bold" : ""}>
                      Embaladora
                    </span>
                  </button>

                  {/* Botão Câmara Fria */}
                  <button
                    onClick={() => setArea("camara")}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
        ${area === "camara"
                        ? "bg-white text-red-600 shadow-sm ring-1 ring-gray-200"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    <span className={area === "camara" ? "font-bold" : ""}>
                      Câmara Fria
                    </span>
                  </button>
                </div>

                {/* Texto de apoio abaixo (Opcional) */}
                <p className="text-xs text-gray-400 mt-1.5 text-center">
                  {area === "embaladora"
                    ? "Área de Processamento Primário"
                    : "Área de Armazenamento Refrigerado"}
                </p>
              </div>

              {/* 3. ASSINATURA (Botões Responsivos) */}
              <div>
                <label className="font-bold text-gray-700 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Coordenador de Segurança
                </label>
                <div className="min-h-12 border border-gray-200 rounded-lg flex items-center justify-center bg-white p-1">
                  <SignatureSelector
                    value={signatures.coordinator}
                    onChange={(v) => setSignatures((prev) => ({ ...prev, coordinator: v }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* === CARDS DE ESTATÍSTICAS === */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Conformidade</p>
                  <p className="text-3xl font-bold text-green-600">
                    {complianceRate}%
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {okCount} de {totalCells}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Não Conformidades</p>
                  <p className="text-3xl font-bold text-red-600">{noCount}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {ncRate}% das verificações
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Preenchimento</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {completionRate}%
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {pendingCount} pendentes
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Ações Pendentes</p>
                  <p className="text-3xl font-bold text-amber-600">{ncItems}</p>
                  <p className="text-xs text-gray-400 mt-1">no plano de ação</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === CHECKLIST PRINCIPAL === */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-6">
          {/* CABEÇALHO DA TABELA */}
          <div className="p-5 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Checklist de Conduta e Saúde
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {totalQuestions} itens • {totalDays} dias da semana •{" "}
                  {area === "embaladora"
                    ? "Área: Embaladora"
                    : "Área: Câmara Fria"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  {showStats ? "Ocultar" : "Mostrar"} Estatísticas
                </button>
              </div>
            </div>

            {/* LEGENDA */}
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">SIM</span>
                </div>
                <span className="text-xs text-gray-600">Conforme</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">NÃO</span>
                </div>
                <span className="text-xs text-gray-600">Não Conforme</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <span className="text-xs text-gray-600">
                  Não Houve Produção
                </span>
              </div>
              <div className="text-xs text-gray-500 italic ml-4">
                Clique para alternar entre SIM, NÃO e PENDENTE
              </div>
            </div>
          </div>

          {/* TABELA */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-gray-100 to-gray-50 border-b border-gray-200">
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider sticky left-0 bg-gray-100 z-10">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      Item
                    </div>
                  </th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider min-w-96">
                    Inspeção - Itens Observados
                  </th>
                  {DAYS.map((day) => (
                    <th
                      key={day}
                      className="py-4 px-2 text-center font-semibold text-gray-700 text-xs uppercase tracking-wider min-w-20"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {checklist.map((row, index) => (
                  <tr
                    key={row.questionId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* NÚMERO DO ITEM */}
                    <td className="py-3 px-4 text-center font-bold text-gray-700 sticky left-0 bg-white z-10 border-r border-gray-200">
                      <div className="w-8 h-8 rounded-lg bg-linear-to-r from-red-100 to-orange-100 flex items-center justify-center mx-auto">
                        {String(row.questionId).padStart(2, "0")}
                      </div>
                    </td>

                    {/* DESCRIÇÃO DA PERGUNTA */}
                    <td className="py-3 px-4 text-gray-700 text-sm leading-relaxed border-r border-gray-200">
                      {QUESTIONS[index]}
                    </td>

                    {/* DIAS DA SEMANA */}
                    {DAYS.map((day) => {
                      // @ts-ignore
                      const status = row[day];
                      return (
                        <td
                          key={day}
                          onClick={() => toggleStatus(index, day)}
                          className="py-3 px-2 text-center border-r border-gray-200"
                        >
                          <div
                            className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center cursor-pointer transition-all transform hover:scale-105 active:scale-95
                            ${status === "ok"
                                ? "bg-green-100 border-2 border-green-500 text-green-800"
                                : status === "no"
                                  ? "bg-red-100 border-2 border-red-500 text-red-800"
                                  : "bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-400"
                              }`}
                          >
                            <span className="font-bold text-sm">
                              {status === "ok"
                                ? "SIM"
                                : status === "no"
                                  ? "NÃO"
                                  : "—"}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RODAPÉ DA TABELA */}
          <div className="p-4 bg-linear-to-r from-gray-50 to-gray-100 border-t border-gray-200">
            <div className="text-xs text-gray-500 italic">
              Observação: Se ocorrer alguma não conformidade, é obrigatório o
              preenchimento do Plano de Ação Corretiva abaixo.
            </div>
          </div>
        </div>

        {/* === PLANO DE AÇÃO CORRETIVA === */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-6">
          {/* CABEÇALHO DO PLANO DE AÇÃO */}
          <div className="p-5 bg-linear-to-r from-red-50 to-orange-50 border-b border-red-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  Plano de Ação Corretiva
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Preenchimento obrigatório para não conformidades identificadas
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowActionPlan(!showActionPlan)}
                  className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  {showActionPlan ? "Recolher" : "Expandir"}
                </button>

                <button
                  onClick={addActionRow}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Nova Ação
                </button>
              </div>
            </div>
          </div>

          {/* TABELA DO PLANO DE AÇÃO */}
          {showActionPlan && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-red-100 to-red-50 border-b border-red-200">
                    <th className="py-4 px-4 text-left font-semibold text-red-700 text-sm uppercase tracking-wider min-w-28">
                      Data
                    </th>
                    <th className="py-4 px-4 text-left font-semibold text-red-700 text-sm uppercase tracking-wider min-w-16">
                      Item
                    </th>
                    <th className="py-4 px-4 text-left font-semibold text-red-700 text-sm uppercase tracking-wider min-w-48">
                      Não Conformidade
                    </th>
                    <th className="py-4 px-4 text-left font-semibold text-red-700 text-sm uppercase tracking-wider min-w-48">
                      Causa Raiz
                    </th>
                    <th className="py-4 px-4 text-left font-semibold text-red-700 text-sm uppercase tracking-wider min-w-48">
                      Ação Corretiva
                    </th>
                    <th className="py-4 px-4 text-left font-semibold text-red-700 text-sm uppercase tracking-wider min-w-32">
                      Responsável
                    </th>
                    <th className="py-4 px-4 text-left font-semibold text-red-700 text-sm uppercase tracking-wider min-w-32">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-100">
                  {actions.map((action, index) => (
                    <tr
                      key={action.id}
                      className="hover:bg-red-50/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <input
                          type="date"
                          value={action.date}
                          onChange={(e) =>
                            updateAction(index, "date", e.target.value)
                          }
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          placeholder="#"
                          value={action.item}
                          onChange={(e) =>
                            updateAction(index, "item", e.target.value)
                          }
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-center"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          placeholder="Descreva a não conformidade..."
                          value={action.nonConformity}
                          onChange={(e) =>
                            updateAction(index, "nonConformity", e.target.value)
                          }
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          placeholder="Identifique a causa raiz..."
                          value={action.rootCause}
                          onChange={(e) =>
                            updateAction(index, "rootCause", e.target.value)
                          }
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          placeholder="Defina a ação corretiva..."
                          value={action.action}
                          onChange={(e) =>
                            updateAction(index, "action", e.target.value)
                          }
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          placeholder="Nome do responsável..."
                          value={action.responsible}
                          onChange={(e) =>
                            updateAction(index, "responsible", e.target.value)
                          }
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={action.status}
                          onChange={(e) =>
                            updateAction(index, "status", e.target.value)
                          }
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        >
                          <option value="pending">⏳ Pendente</option>
                          <option value="in_progress">🔄 Em Andamento</option>
                          <option value="completed">✓ Concluído</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* === RODAPÉ GLOBAL === */}
        <footer className="bg-linear-to-r from-gray-900 to-black text-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden mt-6">
          <div className="p-4 sm:p-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
              {/* === BLOCO ESQUERDA: LOGO E NOME === */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-r from-red-500 to-orange-600 flex items-center justify-center shrink-0">
                  <span className="font-bold text-base sm:text-lg">GV</span>
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">GrandValle</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Monitoramento de Conduta e Saúde
                  </p>
                </div>
              </div>

              {/* === BLOCO DIREITA: INFORMAÇÕES TÉCNICAS === */}
              {/* No mobile: flex-wrap centralizado. No desktop: linha única alinhada à direita */}
              <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-4 w-full md:w-auto">
                <div className="text-center">
                  <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">
                    Revisado por
                  </p>
                  <p className="font-bold text-sm sm:text-base text-orange-300">
                    {COMPLIANCE.revisedBy}
                  </p>
                </div>

                {/* Separador (Escondido no Mobile, Visível no Desktop) */}
                <div className="hidden md:block h-8 w-px bg-gray-700"></div>

                <div className="text-center">
                  <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">
                    Revisão
                  </p>
                  <p className="font-bold text-sm sm:text-base">
                    {COMPLIANCE.revisionDate}
                  </p>
                </div>

                {/* Separador (Escondido no Mobile, Visível no Desktop) */}
                <div className="hidden md:block h-8 w-px bg-gray-700"></div>

                <div className="text-center flex flex-col items-center">
                  <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider mb-1">
                    POP
                  </p>
                  <div className="px-3 py-1 bg-red-600/90 rounded-md border border-red-500/50">
                    <span className="font-bold text-xs sm:text-sm">
                      {COMPLIANCE.popCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* === COPYRIGHT === */}
            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 text-center md:text-left gap-2">
                <p>© 2026 GrandValle. Segurança Alimentar.</p>
                <p>Módulo 1.4.1 - Conduta</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
