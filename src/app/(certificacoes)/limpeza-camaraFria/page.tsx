"use client";

import { SignatureSelector } from "@/src/components/SignatureSelector";
import { useState } from "react";

const SECTORS = {
  camara: {
    id: "camara",
    title: "CÂMARA FRIA (01 A 05)",
    popCode: "POP-05-01",
    frequency: "Diária, Semanal, Quinzenal e Mensal",
    icon: "❄️",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    items: [
      { key: "teto", label: "Teto", frequency: "quinzenal" },
      { key: "parede", label: "Parede", frequency: "diária" },
      { key: "piso", label: "Piso", frequency: "diária" },
      { key: "painel", label: "Painel", frequency: "semanal" }, // ← Alterado para SEMANAL
      { key: "portas", label: "Portas", frequency: "diária" },
      { key: "ventiladores", label: "Ventil.", frequency: "mensal" }, // ← Alterado para MENSAL
      { key: "evaporador", label: "Evap.", frequency: "mensal" }, // ← Alterado para MENSAL
      { key: "lampadas", label: "Lâmp.", frequency: "mensal" }, // ← Alterado para MENSAL
    ],
  },
  tunel1: {
    id: "tunel1",
    title: "TÚNEL (01 A 06)",
    popCode: "POP-05-01",
    frequency: "Diária e Quinzenal",
    icon: "🚇",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    items: [
      { key: "teto", label: "Teto", frequency: "quinzenal" },
      { key: "parede", label: "Parede", frequency: "diária" },
      { key: "piso", label: "Piso", frequency: "diária" },
      { key: "painel", label: "Painel", frequency: "diária" },
      { key: "cortinas", label: "Cortinas", frequency: "diária" },
      { key: "ventiladores", label: "Ventil.", frequency: "quinzenal" },
      { key: "evaporador", label: "Evap.", frequency: "quinzenal" },
      { key: "lampadas", label: "Lâmp.", frequency: "quinzenal" },
    ],
  },
  tunel2: {
    id: "tunel2",
    title: "TÚNEL (07 A 11)",
    popCode: "POP-05-01",
    frequency: "Diária e Quinzenal",
    icon: "🚇",
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
    items: [
      { key: "teto", label: "Teto", frequency: "quinzenal" },
      { key: "parede", label: "Parede", frequency: "diária" },
      { key: "piso", label: "Piso", frequency: "diária" },
      { key: "painel", label: "Painel", frequency: "diária" },
      { key: "cortinas", label: "Cortinas", frequency: "diária" },
      { key: "ventiladores", label: "Ventil.", frequency: "quinzenal" },
      { key: "evaporador", label: "Evap.", frequency: "quinzenal" },
      { key: "lampadas", label: "Lâmp.", frequency: "quinzenal" },
    ],
  },
  antecamara: {
    id: "antecamara",
    title: "ANTECÂMARA (01 A 03)",
    popCode: "POP-05-01",
    frequency: "Diária e Quinzenal",
    icon: "🏢",
    color: "bg-cyan-50 border-cyan-200 text-cyan-700",
    items: [
      { key: "teto", label: "Teto", frequency: "quinzenal" },
      { key: "parede", label: "Parede", frequency: "diária" },
      { key: "piso", label: "Piso", frequency: "diária" },
      { key: "painel", label: "Painel", frequency: "diária" },
      { key: "portas", label: "Portas", frequency: "diária" },
      { key: "ventiladores", label: "Ventil.", frequency: "quinzenal" },
      { key: "evaporador", label: "Evap.", frequency: "quinzenal" },
      { key: "lampadas", label: "Lâmp.", frequency: "quinzenal" },
    ],
  },
};

type SectorKey = keyof typeof SECTORS;

interface TeamMember {
  code: string;
  name: string;
  signature: string | null;
}

interface DailyCheck {
  day: number;
  checks: { [key: string]: boolean };
  responsibleCode: string;
}

export default function LimpezaCamarasFrias() {
  const [currentSector, setCurrentSector] = useState<SectorKey>("camara");
  const [selectedMonth, setSelectedMonth] = useState("JANEIRO");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [obs, setObs] = useState("");
  const [showStats, setShowStats] = useState(true);

  const [team, setTeam] = useState<TeamMember[]>([
    { code: "01", name: "Operador 1", signature: null },
    { code: "02", name: "Operador 2", signature: null },
    { code: "03", name: "Operador 3", signature: null },
    { code: "04", name: "Supervisor", signature: null },
  ]);

  const [dailyChecks, setDailyChecks] = useState<DailyCheck[]>(
    Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      checks: {},
      responsibleCode: "",
    })),
  );

  const activeConfig = SECTORS[currentSector];

  const handleTeamSignature = (index: number, file: File | null) => {
    if (file) {
      const newTeam = [...team];
      newTeam[index].signature = URL.createObjectURL(file);
      setTeam(newTeam);
    }
  };

  const signTeamStandard = (index: number) => {
    const newTeam = [...team];
    newTeam[index].signature = "/raivans.png";
    setTeam(newTeam);
  };

  const removeTeamSignature = (index: number) => {
    const newTeam = [...team];
    newTeam[index].signature = null;
    setTeam(newTeam);
  };

  const toggleCheck = (dayIndex: number, itemKey: string) => {
    const newChecks = [...dailyChecks];
    if (!newChecks[dayIndex].checks) {
      newChecks[dayIndex].checks = {};
    }
    newChecks[dayIndex].checks[itemKey] = !newChecks[dayIndex].checks[itemKey];
    setDailyChecks(newChecks);
  };

  const updateResponsibleCode = (dayIndex: number, code: string) => {
    const newChecks = [...dailyChecks];
    newChecks[dayIndex].responsibleCode = code.toUpperCase();
    setDailyChecks(newChecks);
  };

  // Calcular estatísticas
  const totalChecks = 31 * activeConfig.items.length;
  const completedChecks = dailyChecks.reduce((acc, day) => {
    return acc + Object.values(day.checks).filter(Boolean).length;
  }, 0);

  const completionRate =
    totalChecks > 0 ? Math.round((completedChecks / totalChecks) * 100) : 0;
  const daysCompleted = dailyChecks.filter(
    (day) =>
      Object.values(day.checks).filter(Boolean).length ===
      activeConfig.items.length,
  ).length;

  const months = [
    "JANEIRO",
    "FEVEREIRO",
    "MARÇO",
    "ABRIL",
    "MAIO",
    "JUNHO",
    "JULHO",
    "AGOSTO",
    "SETEMBRO",
    "OUTUBRO",
    "NOVEMBRO",
    "DEZEMBRO",
  ];

  // Função para obter a cor e o ícone baseado na frequência
  const getFrequencyStyle = (frequency: string) => {
    switch (frequency) {
      case "diária":
        return { color: "bg-green-100 text-green-700", icon: "D" };
      case "semanal":
        return { color: "bg-yellow-100 text-yellow-700", icon: "S" };
      case "quinzenal":
        return { color: "bg-blue-100 text-blue-700", icon: "Q" };
      case "mensal":
        return { color: "bg-purple-100 text-purple-700", icon: "M" };
      default:
        return { color: "bg-gray-100 text-gray-700", icon: "?" };
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-6 font-sans text-black">
      <div className="max-w-7xl mx-auto">
        {/* === HEADER PRINCIPAL === */}
        <header className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl mb-4 sm:mb-6 overflow-hidden border border-gray-200">
          {/* === TOPO AZUL (TÍTULO E ÍCONE) === */}
          <div className="p-4 sm:p-6 bg-linear-to-r from-blue-600 to-cyan-600">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Lado Esquerdo: Ícone e Título */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <span className="text-xl sm:text-2xl">
                    {activeConfig.icon}
                  </span>
                </div>
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold text-white leading-tight">
                    Controle de Limpeza de Câmaras Frias
                  </h1>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1">
                    Sistema de Higienização e Manutenção Preventiva
                  </p>
                </div>
              </div>

              {/* Lado Direito: Código POP */}
              <div className="flex justify-end md:block mt-2 md:mt-0">
                <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-lg text-right">
                  <p className="text-white text-xs sm:text-sm">Código POP</p>
                  <p className="text-white font-bold text-lg sm:text-xl leading-none">
                    {activeConfig.popCode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* === ÁREA DE CONTROLES (CINZA/AZUL CLARO) === */}
          <div className="p-4 sm:p-5 bg-linear-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* 1. SELEÇÃO DE SETOR */}
              <div>
                <label className="font-bold text-gray-700 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-600"
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
                  Área de Controle
                </label>
                <div className="relative">
                  <select
                    value={currentSector}
                    //@ts-ignore
                    onChange={(e) => setCurrentSector(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 sm:py-3 sm:px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                  >
                    {Object.keys(SECTORS).map((key) => (
                      <option key={key} value={key}>
                        {
                          //@ts-ignore
                          SECTORS[key].title
                        }
                      </option>
                    ))}
                  </select>
                  {/* Ícone da seta para garantir visual consistente */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* 2. PERÍODO (MÊS E ANO) - Lado a Lado no Mobile */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 text-xs sm:text-sm mb-2">
                    Mês
                  </label>
                  <div className="relative">
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 sm:py-3 sm:px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                    >
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 text-xs sm:text-sm mb-2">
                    Ano
                  </label>
                  <div className="relative">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 sm:py-3 sm:px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                    >
                      {["2024", "2025", "2026", "2027", "2028"].map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. INFORMAÇÕES DO SISTEMA */}
              <div>
                <label className="font-bold text-gray-700 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Informações do Sistema
                </label>
                <div className="bg-white p-3 rounded-lg border border-gray-200 h-[calc(100%-28px)] flex flex-col justify-center">
                  <div className="flex justify-between items-start text-xs sm:text-sm gap-2">
                    <span className="font-semibold text-gray-600 shrink-0">
                      Produtos:
                    </span>
                    <span className="text-blue-600 text-right font-medium truncate sm:whitespace-normal">
                      Detergente Neutro, Hipoclorito
                    </span>
                  </div>
                  <div className="w-full h-px bg-gray-100 my-2"></div>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="font-semibold text-gray-600">
                      Frequência:
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">
                      {activeConfig.frequency}
                    </span>
                  </div>
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
                  <p className="text-gray-500 text-sm">Conclusão Mensal</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {completionRate}%
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {completedChecks} de {totalChecks}
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Dias Completos</p>
                  <p className="text-3xl font-bold text-green-600">
                    {daysCompleted}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">de 31 dias</p>
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Itens por Dia</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {activeConfig.items.length}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {
                      activeConfig.items.filter((i) => i.frequency === "diária")
                        .length
                    }{" "}
                    diários
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-600"
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
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Equipe Registrada</p>
                  <p className="text-3xl font-bold text-amber-600">
                    {team.filter((m) => m.signature).length}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    de {team.length} membros
                  </p>
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === TABELA PRINCIPAL === */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-6">
          {/* CABEÇALHO DO CARD */}
          <div className="p-4 sm:p-5 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-800">
                  {activeConfig.title} - {selectedMonth} {selectedYear}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Controle diário • {activeConfig.frequency}
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
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
                  {showStats ? "Ocultar" : "Stats"}
                </button>
              </div>
            </div>

            {/* LEGENDA */}
            <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-sm"></div>
                <span className="text-[10px] sm:text-xs text-gray-600">
                  Diária
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-sm"></div>
                <span className="text-[10px] sm:text-xs text-gray-600">
                  Semanal
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-sm"></div>
                <span className="text-[10px] sm:text-xs text-gray-600">
                  Quinzenal
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-500 rounded-sm"></div>
                <span className="text-[10px] sm:text-xs text-gray-600">
                  Mensal
                </span>
              </div>
            </div>
          </div>

          {/* === ÁREA DA TABELA COM SCROLL DUPLO E FIXAÇÃO === */}
          <div className="overflow-auto max-h-[70vh]">
            <div className="min-w-max">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    {/* CANTO SUPERIOR ESQUERDO (DIA) - FIXO NOS 2 EIXOS */}
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-left font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider sticky left-0 top-0 z-50 bg-gray-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] min-w-15">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-gray-500">Dia</span>
                        <span className="font-bold text-gray-800">#</span>
                      </div>
                    </th>

                    {/* CABEÇALHO DOS ITENS - FIXO NO TOPO */}
                    {activeConfig.items.map((item) => {
                      const style = getFrequencyStyle(item.frequency);
                      return (
                        <th
                          key={item.key}
                          className="py-3 sm:py-4 px-2 text-center font-semibold text-gray-700 text-[10px] sm:text-xs uppercase tracking-wider min-w-20 sticky top-0 z-20 bg-gray-100"
                        >
                          <div className="flex flex-col items-center h-full justify-between py-1">
                            <div
                              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mb-1.5 ${style.color}`}
                            >
                              <span className="text-[9px] sm:text-[10px] font-bold">
                                {style.icon}
                              </span>
                            </div>
                            <div className="text-[9px] sm:text-[10px] font-bold leading-tight px-1">
                              {item.label}
                            </div>
                          </div>
                        </th>
                      );
                    })}

                    {/* CANTO SUPERIOR DIREITO (RESPONSÁVEL) - FIXO NOS 2 EIXOS */}
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-center font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider min-w-22.5 sticky right-0 top-0 z-50 bg-gray-100 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                      <div className="flex flex-col items-center">
                        <svg
                          className="w-4 h-4 text-gray-600 mb-1"
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
                        <span className="text-[10px] sm:text-xs">Resp.</span>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {dailyChecks.map((dayCheck, dayIndex) => (
                    <tr
                      key={dayCheck.day}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* DIA (COLUNA FIXA ESQUERDA) */}
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-center font-bold text-gray-800 sticky left-0 z-10 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-gray-200">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-linear-to-r from-blue-100 to-cyan-100 flex items-center justify-center mx-auto text-sm sm:text-base">
                          {String(dayCheck.day).padStart(2, "0")}
                        </div>
                      </td>

                      {/* CHECKBOXES DOS ITENS */}
                      {activeConfig.items.map((item) => {
                        const isChecked = dayCheck.checks[item.key] || false;
                        const style = getFrequencyStyle(item.frequency);
                        return (
                          <td
                            key={item.key}
                            className="py-2 sm:py-3 px-1 sm:px-2 text-center border-r border-gray-100"
                          >
                            <label className="cursor-pointer group flex justify-center">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleCheck(dayIndex, item.key)}
                                className="sr-only peer"
                              />
                              <div
                                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 flex items-center justify-center transition-all transform active:scale-95
                        ${isChecked
                                    ? `${style.color.replace("100", "50")} border-${style.color.split(" ")[0].replace("bg-", "")}-500 text-${style.color.split(" ")[0].replace("bg-", "")}-700`
                                    : "bg-white border-gray-200 group-hover:border-gray-300 text-gray-400"
                                  }`}
                              >
                                {isChecked ? (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <span className="text-[10px]">—</span>
                                )}
                              </div>
                            </label>
                          </td>
                        );
                      })}

                      {/* RESPONSÁVEL (COLUNA FIXA DIREITA) */}
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-center sticky right-0 z-10 bg-white shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.05)] border-l border-gray-200">
                        <input
                          type="text"
                          value={dayCheck.responsibleCode}
                          onChange={(e) =>
                            updateResponsibleCode(dayIndex, e.target.value)
                          }
                          className="w-12 sm:w-16 mx-auto bg-white border border-gray-200 rounded-lg py-1.5 px-1 text-center text-xs sm:text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all uppercase"
                          placeholder="CÓD"
                          maxLength={3}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RODAPÉ DA TABELA */}
          <div className="p-3 sm:p-4 bg-linear-to-r from-gray-50 to-gray-100 border-t border-gray-200">
            <div className="text-[10px] sm:text-xs text-gray-500 italic text-center sm:text-left">
              D = Diário • S = Semanal • Q = Quinzenal • M = Mensal • CÓD =
              Código
            </div>
          </div>
        </div>

        {/* === EQUIPE E OBSERVAÇÕES === */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-6">
          <div className="p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-6 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Equipe e Observações
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* EQUIPE */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13 1a6 6 0 01-9 5.197M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Relação da Equipe
                </h4>

                <div className="space-y-3">
                  {team.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                          <span className="font-bold text-blue-700 text-sm">
                            {member.code}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Código: {member.code}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <SignatureSelector
                          value={member.signature}
                          onChange={(v) => {
                            const newTeam = [...team];
                            newTeam[index].signature = v;
                            setTeam(newTeam)
                          }
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* OBSERVAÇÕES */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-700 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Observações
                  </h4>
                  <span className="text-xs text-gray-500">
                    Máx. 500 caracteres
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    value={obs}
                    onChange={(e) => setObs(e.target.value)}
                    className="w-full h-40 bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Registre aqui observações importantes, não conformidades identificadas ou observações sobre a limpeza..."
                    maxLength={500}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                    {obs.length}/500
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-500">
                  <p className="font-semibold">Registre:</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Não conformidades identificadas</li>
                    <li>• Problemas encontrados na limpeza</li>
                    <li>• Observações sobre equipamentos</li>
                    <li>• Sugestões de melhoria</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === RODAPÉ GLOBAL === */}
        <footer className="bg-linear-to-r from-gray-900 to-black text-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-r from-blue-500 to-cyan-600 flex items-center justify-center">
                  <span className="font-bold text-lg">GV</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">GrandValle</h3>
                  <p className="text-gray-300 text-sm">
                    Sistema de Controle de Limpeza de Câmaras Frias
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-300 text-sm">Período de Controle</p>
                <div className="mt-2 flex gap-2">
                  <div className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs">
                    {selectedMonth}
                  </div>
                  <div className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-xs">
                    {selectedYear}
                  </div>
                  <div className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-xs">
                    {activeConfig.popCode}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                <p className="text-gray-400">
                  © 2026 GrandValle. Sistema de Higienização e Manutenção
                  Preventiva.
                </p>
                <p className="mt-2 md:mt-0 text-gray-400">
                  Versão: 3.1 • Atualizado em:{" "}
                  {new Date().toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
