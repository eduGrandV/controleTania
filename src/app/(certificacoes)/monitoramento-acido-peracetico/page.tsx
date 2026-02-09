"use client";

import { useState } from "react";

const MACHINES = {
  chesy: {
    id: "chesy",
    title: "MONITORAMENTO DIÁRIO DO ÁCIDO PERACÉTICO – CHESY AP-501215",
    product: "Chesy 501215 (Ácido Peracético)",
    dosageText: "100 ppm a 400ppm (faixa operacional ideal)",
    repositionText: "Reposição automática controlada por sistema",
    obsPoints: [
      "Filtro da Máquina: Verificar diariamente para evitar entupimento com resíduos de papel",
      "Marcador de Pressão: Monitorar vazão da água para leitura precisa",
      "Calibração: Verificar calibração do sensor semanalmente",
      "Temperatura: Manter entre 15°C e 25°C para estabilidade química",
    ],
    elaboratedBy: "Clebitânia Carvalho",
    revisedBy: "César Frank",
    popCode: "POP-13",
    minPPM: 100,
    maxPPM: 400,
    color: "bg-blue-50 border-blue-200 text-blue-700",
    icon: "⚗️",
    status: "Operacional",
  },
  hortoxy: {
    id: "hortoxy",
    title: "MONITORAMENTO DIÁRIO DO ÁCIDO PERACÉTICO – HORTOXY",
    product: "Hortoxy (Ácido Peracético)",
    dosageText: "150 ppm a 500ppm (faixa operacional ideal)",
    repositionText: "Reposição automática controlada por sistema",
    obsPoints: [
      "Filtro da Máquina: Verificar diariamente para evitar entupimento com resíduos de papel",
      "Marcador de Pressão: Monitorar vazão da água para leitura precisa",
      "Calibração: Verificar calibração do sensor semanalmente",
      "Temperatura: Manter entre 15°C e 25°C para estabilidade química",
      "Validade: Verificar data de validade do produto mensalmente",
    ],
    elaboratedBy: "Clebitânia Carvalho",
    revisedBy: "César Frank",
    popCode: "POP-13",
    minPPM: 150,
    maxPPM: 500,
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    icon: "🧪",
    status: "Operacional",
  },
};

type MachineKey = keyof typeof MACHINES;

interface ReadingLog {
  id: number;
  date: string;
  time: string;
  ppm: string;
  action: string;
  responsible: string | null;
  status: "normal" | "warning" | "critical";
}

export default function MonitoramentoAcido() {
  const [currentMachine, setCurrentMachine] = useState<MachineKey>("chesy");
  const [monitorSignature, setMonitorSignature] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);

  const [readings, setReadings] = useState<ReadingLog[]>([
    {
      id: 1,
      date: "",
      time: "",
      ppm: "",
      action: "",
      responsible: null,
      status: "normal",
    },
    {
      id: 2,
      date: "",
      time: "",
      ppm: "",
      action: "",
      responsible: null,
      status: "normal",
    },
    {
      id: 3,
      date: "",
      time: "",
      ppm: "",
      action: "",
      responsible: null,
      status: "normal",
    },
  ]);

  const addRow = () => {
    const newId =
      readings.length > 0 ? readings[readings.length - 1].id + 1 : 1;
    setReadings([
      ...readings,
      {
        id: newId,
        date: "",
        time: "",
        ppm: "",
        action: "",
        responsible: null,
        status: "normal",
      },
    ]);
  };

  const updateField = (
    index: number,
    field: keyof ReadingLog,
    value: string,
  ) => {
    const newReadings = [...readings];
    // @ts-ignore
    newReadings[index][field] = value;

    // Atualizar status baseado no PPM
    if (field === "ppm") {
      newReadings[index].status = getPPMStatus(value);
    }

    setReadings(newReadings);
  };

  const signStandard = (index: number) => {
    const newReadings = [...readings];
    newReadings[index].responsible = "/raivans.png";
    setReadings(newReadings);
  };

  const handleFileUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const newReadings = [...readings];
      newReadings[index].responsible = URL.createObjectURL(file);
      setReadings(newReadings);
    }
  };

  const removeSignature = (index: number) => {
    const newReadings = [...readings];
    newReadings[index].responsible = null;
    setReadings(newReadings);
  };

  const getPPMStatus = (value: string): "normal" | "warning" | "critical" => {
    if (!value.trim()) return "normal";
    const num = parseFloat(value);
    if (isNaN(num)) return "warning";

    const config = MACHINES[currentMachine];
    const range = config.maxPPM - config.minPPM;
    const margin = range * 0.1; // 10% de margem

    if (num >= config.minPPM - margin && num <= config.maxPPM + margin) {
      return "normal";
    }

    return "critical";
  };

  const signMonitor = () => {
    setMonitorSignature("/raivans.png");
  };

  const uploadMonitor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMonitorSignature(URL.createObjectURL(file));
    }
  };

  const removeMonitorSignature = () => {
    setMonitorSignature(null);
  };

  const activeConfig = MACHINES[currentMachine];

  // Estatísticas
  const criticalReadings = readings.filter(
    (r) => r.status === "critical",
  ).length;
  const warningReadings = readings.filter((r) => r.status === "warning").length;
  const normalReadings = readings.filter((r) => r.status === "normal").length;
  const signedReadings = readings.filter((r) => r.responsible).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* === HEADER PRINCIPAL === */}
        <header className="bg-indigo-600 rounded-2xl shadow-xl mb-6 overflow-hidden border border-gray-200">
          <div className="p-6 bg-linear-to-rrom-indigo-600 to-purple-600">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl">{activeConfig.icon}</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Monitoramento de Ácido Peracético
                  </h1>
                  <p className="text-indigo-100">
                    Controle de Dosagem e Qualidade - Sistema Automatizado
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-indigo-100 text-sm">Status do Sistema</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-white font-bold">
                      {activeConfig.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* === SELEÇÃO DE MÁQUINA === */}
          <div className="p-4 bg-linear-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
            <div className="mb-3">
              <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-indigo-600"
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
                Selecione o Sistema
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(Object.keys(MACHINES) as MachineKey[]).map((key) => {
                const machine = MACHINES[key];
                return (
                  <button
                    key={key}
                    onClick={() => setCurrentMachine(key)}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      currentMachine === key
                        ? "bg-white shadow-lg border-2 border-indigo-500 transform scale-[1.02]"
                        : "bg-white/70 hover:bg-white hover:shadow-md border border-gray-200 hover:border-indigo-300"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-linear-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                      <span className="text-xl">{machine.icon}</span>
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold text-gray-800 text-sm">
                        {key === "chesy" ? "CHESY AP-501215" : "HORTOXY"}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs text-black px-2 py-0.5 rounded-full ${machine.color.split(" ")[0]}`}
                        >
                          {machine.minPPM}-{machine.maxPPM} ppm
                        </span>
                      </div>
                    </div>
                    {currentMachine === key && (
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* === CARDS DE ESTATÍSTICAS === */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Leituras Normais</p>
                <p className="text-3xl font-bold text-green-600">
                  {normalReadings}
                </p>
                <p className="text-xs text-gray-400 mt-1">Dentro da faixa</p>
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
                <p className="text-gray-500 text-sm">Leituras Críticas</p>
                <p className="text-3xl font-bold text-red-600">
                  {criticalReadings}
                </p>
                <p className="text-xs text-gray-400 mt-1">Fora da faixa</p>
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
                <p className="text-gray-500 text-sm">Assinaturas</p>
                <p className="text-3xl font-bold text-blue-600">
                  {signedReadings}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  de {readings.length} registros
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Faixa Ideal</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {activeConfig.minPPM}-{activeConfig.maxPPM}
                </p>
                <p className="text-xs text-gray-400 mt-1">ppm</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-indigo-600"
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
              </div>
            </div>
          </div>
        </div>

        {/* === TABELA PRINCIPAL === */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-6">
          {/* CABEÇALHO DA TABELA */}
          <div className="p-5 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {activeConfig.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1 ">
                  {activeConfig.product} • Sistema Automatizado de Monitoramento
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowInstructions(!showInstructions)}
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {showInstructions ? "Ocultar" : "Mostrar"} Instruções
                </button>

                <button
                  onClick={addRow}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
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
                  Nova Leitura
                </button>
              </div>
            </div>

            {/* INSTRUÇÕES */}
            {showInstructions && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
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
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-blue-800 mb-2">
                      Informações do Sistema:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-semibold text-black">
                          Faixa Operacional:{" "}
                        </span>
                        <span className="text-blue-700">
                          {activeConfig.dosageText}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-black">
                          Reposição:{" "}
                        </span>
                        <span className="text-blue-700">
                          {activeConfig.repositionText}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ALERTAS CRÍTICOS */}
            {showAlerts && criticalReadings > 0 && (
              <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
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
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-red-800">
                      Alerta: {criticalReadings} leitura(s) fora da faixa ideal!
                    </p>
                    <p className="text-sm text-red-700 mt-1">
                      É necessário ação corretiva para leituras fora de{" "}
                      {activeConfig.minPPM}-{activeConfig.maxPPM} ppm.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* TABELA */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-rrom-gray-100 to-gray-50 border-b border-gray-200">
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Data
                    </div>
                  </th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Hora
                  </th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Ácido Peracético (ppm)
                  </th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Ação Corretiva
                  </th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Responsável
                  </th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {readings.map((log, index) => (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* DATA */}
                    <td className="py-3 px-4">
                      <div className="relative">
                        <input
                          type="date"
                          value={log.date}
                          onChange={(e) =>
                            updateField(index, "date", e.target.value)
                          }
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </td>

                    {/* HORA */}
                    <td className="py-3 px-4">
                      <div className="relative">
                        <input
                          type="time"
                          value={log.time}
                          onChange={(e) =>
                            updateField(index, "time", e.target.value)
                          }
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </td>

                    {/* PPM */}
                    <td className="py-3 px-4">
                      <div className="relative group">
                        <input
                          type="text"
                          value={log.ppm}
                          onChange={(e) =>
                            updateField(index, "ppm", e.target.value)
                          }
                          className={`w-full bg-white border rounded-lg py-2.5 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:border-transparent transition-all
                            ${
                              log.status === "normal"
                                ? "border-gray-200 text-gray-700 focus:ring-indigo-500"
                                : log.status === "warning"
                                  ? "border-amber-200 text-amber-700 focus:ring-amber-500"
                                  : "border-red-200 text-red-700 focus:ring-red-500"
                            }
                          `}
                          placeholder="Ex: 250"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {log.status === "normal" && log.ppm && (
                            <svg
                              className="w-4 h-4 text-green-500"
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
                          {log.status === "critical" && log.ppm && (
                            <svg
                              className="w-4 h-4 text-red-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* AÇÃO CORRETIVA */}
                    <td className="py-3 px-4">
                      <div className="relative">
                        <input
                          type="text"
                          value={log.action}
                          onChange={(e) =>
                            updateField(index, "action", e.target.value)
                          }
                          className={`w-full text-black bg-white border rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all
                            ${log.status === "critical" && log.ppm ? "border-red-200 focus:ring-red-500" : "border-gray-200 focus:ring-indigo-500"}
                          `}
                          placeholder={
                            log.status === "critical" && log.ppm
                              ? "Ação corretiva necessária..."
                              : "Descreva ação, se aplicável..."
                          }
                        />
                      </div>
                    </td>

                    {/* RESPONSÁVEL */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center">
                        {log.responsible ? (
                          <div className="relative group">
                            <img
                              src={log.responsible}
                              alt="Assinatura"
                              className="h-12 w-32 object-contain border border-gray-200 rounded-lg bg-white p-2 shadow-sm"
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
                          <div className="flex gap-2">
                            <button
                              onClick={() => signStandard(index)}
                              className="px-3 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs font-medium hover:shadow-md transition-all flex items-center gap-2"
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
                              Eu
                            </button>
                            <label className="px-3 py-2 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 rounded-lg text-xs font-medium hover:shadow-md transition-all flex items-center gap-2 border border-gray-200 cursor-pointer hover:bg-gray-100">
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
                              Upload
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

                    {/* STATUS */}
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                            log.status === "normal"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : log.status === "warning"
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {log.status === "normal"
                            ? "✓ Normal"
                            : log.status === "warning"
                              ? "⚠ Alerta"
                              : "✗ Crítico"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RODAPÉ DA TABELA */}
          <div className="p-4 bg-linear-to-r from-gray-50 to-gray-100 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">
                  {readings.length} leituras registradas
                </span>
                <span className="mx-2">•</span>
                <span>
                  Sistema:{" "}
                  {activeConfig.id === "chesy" ? "CHESY AP-501215" : "HORTOXY"}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Normal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Crítico</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === OBSERVAÇÕES E ASSINATURAS === */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-6">
          <div className="p-5">
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-indigo-600"
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
                Observações Importantes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeConfig.obsPoints.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <span className="text-blue-600 font-bold text-sm">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ASSINATURAS */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="flex-1">
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-700 mb-2">
                      Monitor de Verificação
                    </h4>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex flex-col items-center">
                        <div className="w-full h-20 mb-3 flex items-end justify-center">
                          {monitorSignature ? (
                            <div className="relative group w-full">
                              <img
                                src={monitorSignature}
                                alt="Assinatura Monitora"
                                className="h-16 object-contain mx-auto"
                              />
                              <button
                                onClick={removeMonitorSignature}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                title="Remover assinatura"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-3 opacity-50 hover:opacity-100 transition-opacity">
                              <button
                                onClick={signMonitor}
                                className="px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all flex items-center gap-2"
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
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                                Minha Assinatura
                              </button>
                              <label className="px-4 py-2 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:shadow-md transition-all flex items-center gap-2 border border-gray-200 cursor-pointer hover:bg-gray-100">
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
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                  />
                                </svg>
                                Upload Assinatura
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={uploadMonitor}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                        <div className="w-48 h-px bg-gray-300 mb-2"></div>
                        <p className="text-sm text-gray-600">
                          Monitora de Verificação
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Elaborado por:</span>
                        <span className="font-bold text-gray-800">
                          {activeConfig.elaboratedBy}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Revisado por:</span>
                        <span className="font-bold text-gray-800">
                          {activeConfig.revisedBy}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Código POP:</span>
                        <span className="font-bold text-white bg-indigo-600 px-3 py-1 rounded-lg">
                          {activeConfig.popCode}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">
                          Faixa Operacional:
                        </span>
                        <span className="font-bold text-indigo-700">
                          {activeConfig.minPPM}-{activeConfig.maxPPM} ppm
                        </span>
                      </div>
                    </div>
                  </div>
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
                <div className="w-12 h-12 rounded-xl bg-linear-to-rrom-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="font-bold text-lg">GV</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">GrandValle</h3>
                  <p className="text-gray-300 text-sm">
                    Sistema de Monitoramento de Ácido Peracético
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-300 text-sm">Última Revisão</p>
                <div className="mt-2 flex gap-2">
                  <div className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs">
                    Elaborado: {activeConfig.elaboratedBy}
                  </div>
                  <div className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs">
                    Revisado: {activeConfig.revisedBy}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <p>
                  © 2026 GrandValle. Sistema de Controle de Qualidade Química.
                </p>
                <p className="mt-2 md:mt-0">
                  Versão: 2.1 • Atualizado em:{" "}
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
