"use client";

import { useState } from "react";

interface DailyLog {
  day: number;
  tanque01: boolean;
  tanque02: boolean;
  tanque03: boolean;
  tanque04: boolean;
  tanque05: boolean;
  tanque06: boolean;
  gaiola01: boolean;
  gaiola02: boolean;
  gaiola03: boolean;
  gaiola04: boolean;
  gaiola05: boolean;
  gaiola06: boolean;
  gaiola07: boolean;
  gaiola08: boolean;
  piso: boolean;
  telas: boolean;
  assinatura: string | null;
}

const MONTHS = [
  { id: "JAN", name: "Janeiro", color: "bg-blue-50 border-blue-200", days: 31 },
  {
    id: "FEV",
    name: "Fevereiro",
    color: "bg-purple-50 border-purple-200",
    days: 28,
  },
  { id: "MAR", name: "Março", color: "bg-green-50 border-green-200", days: 31 },
  {
    id: "ABR",
    name: "Abril",
    color: "bg-yellow-50 border-yellow-200",
    days: 30,
  },
  { id: "MAI", name: "Maio", color: "bg-red-50 border-red-200", days: 31 },
  {
    id: "JUN",
    name: "Junho",
    color: "bg-indigo-50 border-indigo-200",
    days: 30,
  },
  { id: "JUL", name: "Julho", color: "bg-pink-50 border-pink-200", days: 31 },
  { id: "AGO", name: "Agosto", color: "bg-teal-50 border-teal-200", days: 31 },
  {
    id: "SET",
    name: "Setembro",
    color: "bg-orange-50 border-orange-200",
    days: 30,
  },
  { id: "OUT", name: "Outubro", color: "bg-cyan-50 border-cyan-200", days: 31 },
  {
    id: "NOV",
    name: "Novembro",
    color: "bg-emerald-50 border-emerald-200",
    days: 30,
  },
  {
    id: "DEZ",
    name: "Dezembro",
    color: "bg-rose-50 border-rose-200",
    days: 31,
  },
];

export default function LimpezaHidrotermico() {
  const [selectedMonth, setSelectedMonth] = useState("JAN");
  const [year, setYear] = useState(2026);
  const [showLegend, setShowLegend] = useState(true);
  const [showStats, setShowStats] = useState(true);

  const currentMonth = MONTHS.find((m) => m.id === selectedMonth) || MONTHS[0];

  const [logs, setLogs] = useState<DailyLog[]>(
    Array.from({ length: currentMonth.days }, (_, i) => ({
      day: i + 1,
      tanque01: false,
      tanque02: false,
      tanque03: false,
      tanque04: false,
      tanque05: false,
      tanque06: false,
      gaiola01: false,
      gaiola02: false,
      gaiola03: false,
      gaiola04: false,
      gaiola05: false,
      gaiola06: false,
      gaiola07: false,
      gaiola08: false,
      piso: false,
      telas: false,
      assinatura: null,
    })),
  );

  // Atualizar logs quando mês mudar
  const handleMonthChange = (monthId: string) => {
    setSelectedMonth(monthId);
    const month = MONTHS.find((m) => m.id === monthId) || MONTHS[0];
    setLogs(
      Array.from({ length: month.days }, (_, i) => ({
        day: i + 1,
        tanque01: false,
        tanque02: false,
        tanque03: false,
        tanque04: false,
        tanque05: false,
        tanque06: false,
        gaiola01: false,
        gaiola02: false,
        gaiola03: false,
        gaiola04: false,
        gaiola05: false,
        gaiola06: false,
        gaiola07: false,
        gaiola08: false,
        piso: false,
        telas: false,
        assinatura: null,
      })),
    );
  };

  const toggleCheck = (dayIndex: number, field: keyof DailyLog) => {
    const newLogs = [...logs];
    // @ts-ignore
    newLogs[dayIndex][field] = !newLogs[dayIndex][field];
    setLogs(newLogs);
  };

  const signStandard = (dayIndex: number) => {
    const newLogs = [...logs];
    newLogs[dayIndex].assinatura = "/raivans.png";
    setLogs(newLogs);
  };

  const handleFileUpload = (
    dayIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const newLogs = [...logs];
      newLogs[dayIndex].assinatura = URL.createObjectURL(file);
      setLogs(newLogs);
    }
  };

  // Remover assinatura
  const removeSignature = (dayIndex: number) => {
    const newLogs = [...logs];
    newLogs[dayIndex].assinatura = null;
    setLogs(newLogs);
  };

  // Calcular estatísticas
  const totalCompleted = logs.reduce((acc, log) => {
    const completedChecks = [
      log.tanque01,
      log.tanque02,
      log.tanque03,
      log.tanque04,
      log.tanque05,
      log.tanque06,
      log.gaiola01,
      log.gaiola02,
      log.gaiola03,
      log.gaiola04,
      log.gaiola05,
      log.gaiola06,
      log.gaiola07,
      log.gaiola08,
      log.piso,
      log.telas,
    ].filter(Boolean).length;
    return acc + (completedChecks === 16 ? 1 : 0);
  }, 0);

  const tanquesCompleted = logs.reduce((acc, log) => {
    return (
      acc +
      [
        log.tanque01,
        log.tanque02,
        log.tanque03,
        log.tanque04,
        log.tanque05,
        log.tanque06,
      ].filter(Boolean).length
    );
  }, 0);

  const gaiolasCompleted = logs.reduce((acc, log) => {
    return (
      acc +
      [
        log.gaiola01,
        log.gaiola02,
        log.gaiola03,
        log.gaiola04,
        log.gaiola05,
        log.gaiola06,
        log.gaiola07,
        log.gaiola08,
      ].filter(Boolean).length
    );
  }, 0);

  const outrasCompleted = logs.reduce((acc, log) => {
    return acc + [log.piso, log.telas].filter(Boolean).length;
  }, 0);

  // Equipamentos utilizados
  const equipmentList = [
    "Escova",
    "Balde",
    "Esponja",
    "Vassoura",
    "Rodo",
    "Mangueira",
    "Pano",
    "Detergente Alcalino Clorado",
  ];

  return (
    <div className="bg-linear-to-br from-gray-50 to-blue-50 p-2 sm:p-3 md:p-4 lg:p-6 font-sans min-h-screen">
      <div className="w-full xl:max-w-7xl mx-auto">
        {/* === HEADER PRINCIPAL === */}
        <header className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl mb-4 sm:mb-6 overflow-hidden border border-gray-200">
          <div className="p-4 sm:p-6 bg-linear-to-r from-emerald-600 to-teal-600">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                    Limpeza do Hidrotérmico
                  </h1>
                  <p className="text-xs sm:text-sm text-emerald-100 mt-0.5 truncate">
                    Sistema de Controle de Limpeza - 6 Tanques + 8 Gaiolas
                  </p>
                </div>
              </div>

              <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-end gap-3">
                <div className="text-right">
                  <p className="text-emerald-100 text-xs sm:text-sm">
                    Ano Fiscal
                  </p>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => setYear(year - 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
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
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <span className="text-white font-bold text-base sm:text-lg md:text-xl px-1 sm:px-2">
                      {year}
                    </span>
                    <button
                      onClick={() => setYear(year + 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* === SELEÇÃO DE MÊS === */}
          <div className="p-3 sm:p-4 bg-linear-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
            <div className="mb-2 sm:mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-700 text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600"
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
                  Selecione o Mês
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 sm:mt-1 truncate">
                  {currentMonth.name} {year} • {logs.length} dias
                </p>
              </div>

              <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setShowLegend(!showLegend)}
                  className="px-2 sm:px-3 py-1.5 text-black bg-white border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2 whitespace-nowrap cursor-pointer"
                >
                  <svg
                    className="w-3 h-3"
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
                  {showLegend ? "Ocultar" : "Mostrar"} Legenda
                </button>
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="px-2 sm:px-3 py-1.5 text-black bg-white border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2 whitespace-nowrap cursor-pointer"
                >
                  <svg
                    className="w-3 h-3"
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

            <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1 sm:gap-2">
              {MONTHS.map((month) => (
                <button
                  key={month.id}
                  onClick={() => handleMonthChange(month.id)}
                  className={`p-2 sm:p-3 rounded-lg text-center transition-all cursor-pointer ${
                    selectedMonth === month.id
                      ? `${month.color} border-2 border-emerald-500 shadow-md transform scale-105`
                      : "bg-white hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div className="text-xs font-bold text-gray-800">
                    {month.id}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5 sm:mt-1 hidden xs:block">
                    {month.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* === CARDS DE ESTATÍSTICAS === */}
        {showStats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Dias Completos
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
                    {totalCompleted}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">
                    de {logs.length} dias
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600"
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

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Tanques Limpos
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                    {tanquesCompleted}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">
                    de {logs.length * 6} verificações
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
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

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Gaiolas Limpas
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-amber-600">
                    {gaiolasCompleted}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">
                    de {logs.length * 8} verificações
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-amber-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Áreas Comuns
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">
                    {outrasCompleted}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">
                    de {logs.length * 2} verificações
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
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
          </div>
        )}

        {/* === TABELA PRINCIPAL === */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden border border-gray-200 mb-4 sm:mb-6">
          {/* CABEÇALHO DA TABELA (AÇÕES) */}
          <div className="p-4 sm:p-5 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-gray-800 leading-tight">
                  Controle Diário de Limpeza - {currentMonth.name} {year}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">
                  Detergente Alcalino Clorado • Monitoramento diário, quinzenal
                  e alternado
                </p>
              </div>

              <div className="mt-2 sm:mt-0 flex items-center gap-2 sm:gap-3">
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 sm:gap-2 whitespace-nowrap cursor-pointer">
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Exportar
                </button>
              </div>
            </div>

            {/* LEGENDA */}
            {showLegend && (
              <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <div className="flex items-center gap-2 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="font-bold text-blue-700 text-xs sm:text-sm">
                      #
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-blue-800 text-xs sm:text-sm truncate">
                      Tanques (dias alternados)
                    </p>
                    <p className="text-xs text-blue-600 truncate">
                      6 tanques • Verificação alternada
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 sm:p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <span className="font-bold text-amber-700 text-xs sm:text-sm">
                      *
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-amber-800 text-xs sm:text-sm truncate">
                      Gaiolas (1-8) Quinzenal
                    </p>
                    <p className="text-xs text-amber-600 truncate">
                      8 gaiolas • Limpeza quinzenal
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 sm:p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="font-bold text-emerald-700 text-xs sm:text-sm">
                      +
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-emerald-800 text-xs sm:text-sm truncate">
                      Áreas Diárias
                    </p>
                    <p className="text-xs text-emerald-600 truncate">
                      Piso, corrimão, sala de controle, telas
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* EQUIPAMENTOS UTILIZADOS */}
          <div className="p-2 sm:p-3 bg-linear-to-r from-gray-100 to-gray-50 border-b border-gray-200">
            <div className="flex flex-wrap gap-1 sm:gap-2 overflow-x-auto pb-1">
              {equipmentList.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-white rounded-lg border border-gray-200 shrink-0"
                >
                  <svg
                    className="w-2 h-2 sm:w-3 sm:h-3 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-xs text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-auto max-h-[70vh] shadow-inner relative">
            <div className="min-w-max">
              <table className="w-full border-collapse">
                <thead className="z-40">
                  <tr className="bg-gray-100 border-b border-gray-200 shadow-sm">
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-center font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider min-w-16 sticky left-0 top-0 z-50 bg-gray-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                      <div className="flex flex-col items-center">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mb-0.5 sm:mb-1"
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
                        <span className="text-[10px] sm:text-xs">Dia</span>
                      </div>
                    </th>

                    {/* Tanques - Responsivos */}
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <th
                        key={num}
                        className="py-3 sm:py-4 px-1 sm:px-2 text-center font-semibold text-blue-700 text-[10px] sm:text-xs uppercase tracking-wider min-w-14 sm:min-w-20 sticky top-0 z-40 bg-gray-100"
                      >
                        <div className="flex flex-col items-center h-full justify-between py-1">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                            <span className="font-bold text-blue-700 text-xs sm:text-sm">
                              #
                            </span>
                          </div>
                          <div className="text-[9px] sm:text-[10px] font-bold">
                            Tanques {num}
                          </div>
                          <div className="text-[8px] sm:text-[9px] text-gray-500 mt-0.5 hidden xs:block">
                            Alt.
                          </div>
                        </div>
                      </th>
                    ))}

                    {/* Gaiolas (1-8) - Responsivos */}
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <th
                        key={`gaiola-${num}`}
                        className="py-3 sm:py-4 px-1 sm:px-2 text-center font-semibold text-amber-700 text-[10px] sm:text-xs uppercase tracking-wider min-w-14 sm:min-w-20 sticky top-0 z-40 bg-gray-100"
                      >
                        <div className="flex flex-col items-center h-full justify-between py-1">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                            <span className="font-bold text-amber-700 text-xs">
                              {num}
                            </span>
                          </div>
                          <div className="text-[9px] sm:text-[10px] font-bold">
                            Gaiolas {num}
                          </div>
                          <div className="text-[8px] sm:text-[9px] text-gray-500 mt-0.5 hidden xs:block">
                            15d
                          </div>
                        </div>
                      </th>
                    ))}

                    {/* Piso e Telas */}
                    <th className="py-3 sm:py-4 px-1 sm:px-2 text-center font-semibold text-emerald-700 text-[10px] sm:text-xs uppercase tracking-wider min-w-14 sm:min-w-20 sticky top-0 z-40 bg-gray-100">
                      <div className="flex flex-col items-center h-full justify-between py-1">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
                          <span className="font-bold text-emerald-700 text-xs sm:text-sm">
                            +
                          </span>
                        </div>
                        <div className="text-[9px] sm:text-[10px] font-bold">
                          Piso
                        </div>
                        <div className="text-[8px] sm:text-[9px] text-gray-500 mt-0.5 hidden xs:block">
                          Dia
                        </div>
                      </div>
                    </th>

                    <th className="py-3 sm:py-4 px-1 sm:px-2 text-center font-semibold text-emerald-700 text-[10px] sm:text-xs uppercase tracking-wider min-w-14 sm:min-w-20 sticky top-0 z-40 bg-gray-100">
                      <div className="flex flex-col items-center h-full justify-between py-1">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
                          <span className="font-bold text-emerald-700 text-xs sm:text-sm">
                            +
                          </span>
                        </div>
                        <div className="text-[9px] sm:text-[10px] font-bold">
                          Telas
                        </div>
                        <div className="text-[8px] sm:text-[9px] text-gray-500 mt-0.5 hidden xs:block">
                          Dia
                        </div>
                      </div>
                    </th>

                    {/* COLUNA FIXA: Assinatura (Top Right Corner) */}
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-center font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider min-w-32 sm:min-w-40 sticky right-0 top-0 z-50 bg-gray-100 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 flex items-center justify-center mb-1">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-teal-700"
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
                        </div>
                        <div className="text-xs font-bold">Resp.</div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {logs.map((log, index) => (
                    <tr
                      key={log.day}
                      className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    >
                      {/* DIA (Coluna Fixa à Esquerda) */}
                      <td
                        className={`py-2 sm:py-3 px-2 sm:px-4 text-center sticky left-0 z-30 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${currentMonth.color.split(" ")[0] || "bg-blue-100"}`}
                          >
                            <span className="font-bold text-gray-800 text-sm sm:text-lg">
                              {String(log.day).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">
                            {selectedMonth}/{year}
                          </div>
                        </div>
                      </td>

                      {/* TANQUES */}
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <td
                          key={`tanque-${num}`}
                          className="py-2 sm:py-3 px-1 sm:px-2 text-center"
                        >
                          <label className="cursor-pointer group flex justify-center">
                            <input
                              type="checkbox"
                              //@ts-ignore
                              checked={log[`tanque0${num}`] || false}
                              //@ts-ignore
                              onChange={() =>
                                //@ts-ignore
                                toggleCheck(index, `tanque0${num}`)
                              }
                              className="sr-only peer"
                            />
                            <div
                              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 flex items-center justify-center transition-all
                          
                            ${
                              //@ts-ignore
                              log[`tanque0${num}`]
                                ? "bg-blue-100 border-blue-500 text-blue-700"
                                : "bg-white border-gray-300 group-hover:border-blue-400"
                            }`}
                            >
                              {
                                //@ts-ignore

                                log[`tanque0${num}`] ? (
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
                                  <span className="text-[10px] text-gray-300"></span>
                                )
                              }
                            </div>
                          </label>
                        </td>
                      ))}

                      {/* GAIOLAS (1-8) */}
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <td
                          key={`gaiola-${num}`}
                          className="py-2 sm:py-3 px-1 sm:px-2 text-center"
                        >
                          <label className="cursor-pointer group flex justify-center">
                            <input
                              type="checkbox"
                              //@ts-ignore

                              checked={log[`gaiola0${num}`] || false}
                              onChange={() =>
                                //@ts-ignore
                                toggleCheck(index, `gaiola0${num}`)
                              }
                              className="sr-only peer"
                            />
                            <div
                              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 flex items-center justify-center transition-all
                            ${
                              //@ts-ignore
                              log[`gaiola0${num}`]
                                ? "bg-amber-100 border-amber-500 text-amber-700"
                                : "bg-white border-gray-300 group-hover:border-amber-400"
                            }`}
                            >
                              {
                                //@ts-ignore
                                log[`gaiola0${num}`] ? (
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
                                  <span className="text-[10px] text-gray-300"></span>
                                )
                              }
                            </div>
                          </label>
                        </td>
                      ))}

                      {/* PISO */}
                      <td className="py-2 sm:py-3 px-1 sm:px-2 text-center">
                        <label className="cursor-pointer group flex justify-center">
                          <input
                            type="checkbox"
                            checked={log.piso}
                            onChange={() => toggleCheck(index, "piso")}
                            className="sr-only peer"
                          />
                          <div
                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 flex items-center justify-center transition-all
                          ${
                            log.piso
                              ? "bg-emerald-100 border-emerald-500 text-emerald-700"
                              : "bg-white border-gray-300 group-hover:border-emerald-400"
                          }`}
                          >
                            {log.piso && (
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
                            )}
                          </div>
                        </label>
                      </td>

                      {/* TELAS */}
                      <td className="py-2 sm:py-3 px-1 sm:px-2 text-center">
                        <label className="cursor-pointer group flex justify-center">
                          <input
                            type="checkbox"
                            checked={log.telas}
                            onChange={() => toggleCheck(index, "telas")}
                            className="sr-only peer"
                          />
                          <div
                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 flex items-center justify-center transition-all
                          ${
                            log.telas
                              ? "bg-emerald-100 border-emerald-500 text-emerald-700"
                              : "bg-white border-gray-300 group-hover:border-emerald-400"
                          }`}
                          >
                            {log.telas && (
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
                            )}
                          </div>
                        </label>
                      </td>

                      {/* ASSINATURA (Coluna Fixa à Direita) */}
                      <td
                        className={`py-2 sm:py-3 px-2 sm:px-4 sticky right-0 z-30 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.05)] ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        <div className="flex items-center justify-center">
                          {log.assinatura ? (
                            <div className="relative group">
                              <img
                                src={log.assinatura}
                                alt="Assinatura"
                                className="h-8 w-24 sm:h-12 sm:w-32 object-contain border border-gray-200 rounded-lg bg-white p-1 sm:p-2 shadow-sm"
                              />
                              <button
                                onClick={() => removeSignature(index)}
                                className="
                                              absolute -top-2 -right-2 
                                              w-6 h-6 sm:w-6 sm:h-6 
                                              bg-red-500 text-white rounded-full 
                                              flex items-center justify-center text-xs 
                                              shadow-lg hover:bg-red-600 cursor-pointer z-50
                                              transition-opacity duration-200
                                              
                                              /* LÓGICA DE VISIBILIDADE */
                                              opacity-100                /* Mobile/Tablet: Sempre visível */
                                              lg:opacity-0               /* Desktop: Invisível por padrão */
                                              lg:group-hover:opacity-100 /* Desktop: Visível ao passar o mouse */
                                            "
                                title="Remover assinatura"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-1 sm:gap-2">
                              <button
                                onClick={() => signStandard(index)}
                                className="px-2 sm:px-3 py-1.5 sm:py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs font-medium hover:shadow-md transition-all flex items-center gap-1 sm:gap-2 cursor-pointer"
                              >
                                <svg
                                  className="w-3 h-3"
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
                                <span className="hidden xs:inline">Eu</span>
                              </button>
                              <label className="px-2 sm:px-3 py-1.5 sm:py-2 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 rounded-lg text-xs font-medium hover:shadow-md transition-all flex items-center gap-1 sm:gap-2 border border-gray-200 cursor-pointer hover:bg-gray-100">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                  />
                                </svg>
                                <span className="hidden xs:inline">Up</span>
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(index, e)}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RODAPÉ DA TABELA */}
          <div className="p-3 sm:p-4 bg-linear-to-r from-gray-50 to-gray-100 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                <span className="font-medium">
                  {logs.length} dias registrados
                </span>
                <span className="mx-1 sm:mx-2">•</span>
                <span className="inline-block">
                  6 Tanques • 8 Gaiolas • Piso • Telas
                </span>
              </div>
              <div className="text-xs text-gray-500 text-center sm:text-right">
                Atualizado por:{" "}
                <span className="font-semibold">Clebitânia Carvalho</span>
                <span className="mx-1 sm:mx-2">•</span>
                <span className="font-bold bg-gray-800 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs">
                  POP-14
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* === RODAPÉ GLOBAL === */}
        <footer className="bg-linear-to-r from-gray-900 to-black text-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
          <div className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                  <span className="font-bold text-base sm:text-lg">GV</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-base sm:text-lg">GrandValle</h3>
                  <p className="text-gray-300 text-xs sm:text-sm truncate">
                    Controle de Limpeza do Hidrotérmico
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-300 text-xs sm:text-sm">
                  Frequência de Limpeza
                </p>
                <div className="mt-1 sm:mt-2 flex flex-wrap gap-1 sm:gap-2 justify-center">
                  <div className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs">
                    Tanques: Alternado
                  </div>
                  <div className="px-2 sm:px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs">
                    Gaiolas: Quinzenal
                  </div>
                  <div className="px-2 sm:px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs">
                    Piso/Telas: Diário
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-800">
              <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                <p>© 2026 GrandValle. Sistema de Controle de Qualidade.</p>
                <p className="mt-1 sm:mt-0">
                  Última atualização: {new Date().toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
