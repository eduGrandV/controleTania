"use client";
import { SignatureSelector } from "@/src/components/SignatureSelector";
import { Sign } from "crypto";
import { Signature } from "lucide-react";
import { useState } from "react";

const SECTORS = {
  europa: {
    id: "europa",
    title: "TANQUE DE LAVAGEM DA FRUTA (MANGA) - EUROPA",
    subtitle: "Sistema de Controle de Troca de Água",
    hasTankColumn: false,
    frequency: "Diária durante processamento",
    icon: "🇪🇺",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    waterRequirement: "Água tratada e clorada",
    tankCount: "Múltiplos tanques em paralelo",
  },
  hidrotermico: {
    id: "hidrotermico",
    title: "TANQUE DE LAVAGEM (MANGA) - HIDROTÉRMICO",
    subtitle: "Sistema de Controle de Temperatura e Troca",
    hasTankColumn: true,
    frequency: "A cada 4 horas de operação",
    icon: "🔥",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    waterRequirement: "Água aquecida à 48°C ±2°C",
    tankCount: "6 tanques sequenciais",
  },
};

type SectorKey = keyof typeof SECTORS;

interface WaterExchangeLog {
  id: number;
  exchangeDate: string;
  tankId: string;
  waterQuantity: string;
  responsible: string | null;
  status: "pending" | "completed" | "incomplete";
}

export default function TanqueLavagemFruta() {
  const [currentSector, setCurrentSector] = useState<SectorKey>("europa");
  const [signatures, setSignatures] = useState({
    responsible: null as string | null,
    monitor: null as string | null,
  });
  const [showInstructions, setShowInstructions] = useState(true);

  const [logs, setLogs] = useState<WaterExchangeLog[]>([
    {
      id: 1,
      exchangeDate: "",
      tankId: "",
      waterQuantity: "",
      responsible: null,
      status: "pending",
    },
    {
      id: 2,
      exchangeDate: "",
      tankId: "",
      waterQuantity: "",
      responsible: null,
      status: "pending",
    },
    {
      id: 3,
      exchangeDate: "",
      tankId: "",
      waterQuantity: "",
      responsible: null,
      status: "pending",
    },
    {
      id: 4,
      exchangeDate: "",
      tankId: "",
      waterQuantity: "",
      responsible: null,
      status: "pending",
    },
  ]);

  const activeConfig = SECTORS[currentSector];

  const COMPLIANCE = {
    revisedBy: "Clebitânia Carvalho",
    popCode: "POP-13",
    lastRevision: "01/02/2026",
  };

  // Adicionar nova linha
  const addRow = () => {
    const newId = logs.length > 0 ? logs[logs.length - 1].id + 1 : 1;
    setLogs([
      ...logs,
      {
        id: newId,
        exchangeDate: "",
        tankId: "",
        waterQuantity: "",
        responsible: null,
        status: "pending",
      },
    ]);
  };

  const updateField = (
    index: number,
    field: keyof WaterExchangeLog,
    value: string,
  ) => {
    const newLogs = [...logs];
    // @ts-ignore
    newLogs[index][field] = value;

    // Atualizar status baseado no preenchimento
    if (field === "responsible" && value) {
      newLogs[index].status = "completed";
    } else if (field === "responsible" && !value) {
      newLogs[index].status = "pending";
    }

    setLogs(newLogs);
  };

  // Assinaturas
  const handleFileUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const newLogs = [...logs];
      newLogs[index].responsible = URL.createObjectURL(file);
      newLogs[index].status = "completed";
      setLogs(newLogs);
    }
  };

  const signStandard = (index: number) => {
    const newLogs = [...logs];
    newLogs[index].responsible = "/raivans.png";
    newLogs[index].status = "completed";
    setLogs(newLogs);
  };

  const removeSignature = (index: number) => {
    const newLogs = [...logs];
    newLogs[index].responsible = null;
    newLogs[index].status = "pending";
    setLogs(newLogs);
  };

  // Assinaturas de rodapé
  const handleFooterSignature = (
    type: "responsible" | "monitor",
    file: File | null,
  ) => {
    if (file) {
      setSignatures((prev) => ({
        ...prev,
        [type]: URL.createObjectURL(file),
      }));
    }
  };

  const signFooterStandard = (type: "responsible" | "monitor") => {
    setSignatures((prev) => ({ ...prev, [type]: "/raivans.png" }));
  };

  const removeFooterSignature = (type: "responsible" | "monitor") => {
    setSignatures((prev) => ({ ...prev, [type]: null }));
  };

  // Estatísticas
  const completedLogs = logs.filter((log) => log.status === "completed").length;
  const pendingLogs = logs.filter((log) => log.status === "pending").length;
  const totalWater = logs.reduce((acc, log) => {
    const quantity = parseFloat(log.waterQuantity) || 0;
    return acc + quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-6 font-sans text-black">
      <div className="max-w-6xl mx-auto">
        {/* === HEADER PRINCIPAL === */}
        <header className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden border border-gray-200">
          <div className="p-6 bg-linear-to-r from-teal-600 to-emerald-600">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl">{activeConfig.icon}</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Controle de Tanques de Lavagem
                  </h1>
                  <p className="text-teal-100">
                    Sistema de Monitoramento de Troca de Água
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-teal-100 text-sm">Frequência</p>
                  <p className="text-white font-bold">
                    {activeConfig.frequency}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* === SELEÇÃO DE SETOR === */}
          <div className="p-4 bg-linear-to-r from-teal-50 to-emerald-50 border-b border-teal-100">
            <div className="mb-3">
              <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-teal-600"
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
              {(Object.keys(SECTORS) as SectorKey[]).map((key) => {
                const sector = SECTORS[key];
                return (
                  <button
                    key={key}
                    onClick={() => setCurrentSector(key)}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${currentSector === key
                      ? "bg-white shadow-lg border-2 border-teal-500 transform scale-[1.02]"
                      : "bg-white/70 hover:bg-white hover:shadow-md border border-gray-200 hover:border-teal-300"
                      }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-linear-to-r from-teal-100 to-emerald-100 flex items-center justify-center">
                      <span className="text-xl">{sector.icon}</span>
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold text-gray-800 text-sm">
                        {key === "europa" ? "EUROPA" : "HIDROTÉRMICO"}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${sector.color.split(" ")[0]}`}
                        >
                          {sector.tankCount}
                        </span>
                        <span className="text-xs text-gray-500">
                          {sector.waterRequirement}
                        </span>
                      </div>
                    </div>
                    {currentSector === key && (
                      <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* === CARDS DE ESTATÍSTICAS === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Registros Concluídos</p>
                <p className="text-3xl font-bold text-green-600">
                  {completedLogs}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  de {logs.length} registros
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
                <p className="text-gray-500 text-sm">Água Utilizada</p>
                <p className="text-3xl font-bold text-blue-600">
                  {totalWater.toLocaleString("pt-BR")}
                </p>
                <p className="text-xs text-gray-400 mt-1">Litros totais</p>
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
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Registros Pendentes</p>
                <p className="text-3xl font-bold text-amber-600">
                  {pendingLogs}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  aguardando preenchimento
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
                <p className="text-sm text-gray-500 mt-1">
                  {activeConfig.subtitle} • {activeConfig.waterRequirement}
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
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
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
                  Nova Troca
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
                      Instruções de Preenchimento:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-semibold">Data/Hora: </span>
                        <span className="text-blue-700">
                          Registrar momento exato da troca
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">Quantidade: </span>
                        <span className="text-blue-700">
                          Volume em litros (L)
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">Responsável: </span>
                        <span className="text-blue-700">
                          Assinatura digital obrigatória
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">Frequência: </span>
                        <span className="text-blue-700">
                          {activeConfig.frequency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* TABELA */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-gray-100 to-gray-50 border-b border-gray-200">
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
                      Data da Troca
                    </div>
                  </th>
                  {activeConfig.hasTankColumn && (
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
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        Nº do Tanque
                      </div>
                    </th>
                  )}
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
                          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"
                        />
                      </svg>
                      Quantidade de Água (L)
                    </div>
                  </th>
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
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      Responsável
                    </div>
                  </th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((log, index) => (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* DATA DA TROCA */}
                    <td className="py-3 px-4">
                      <div className="relative">
                        <input
                          type="datetime-local"
                          value={log.exchangeDate}
                          onChange={(e) =>
                            updateField(index, "exchangeDate", e.target.value)
                          }
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </td>

                    {/* NÚMERO DO TANQUE (condicional) */}
                    {activeConfig.hasTankColumn && (
                      <td className="py-3 px-4">
                        <div className="relative">
                          <input
                            type="text"
                            value={log.tankId}
                            placeholder="Ex: T01"
                            onChange={(e) =>
                              updateField(index, "tankId", e.target.value)
                            }
                            className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </td>
                    )}

                    {/* QUANTIDADE DE ÁGUA */}
                    <td className="py-3 px-4">
                      <div className="relative group">
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={log.waterQuantity}
                            placeholder="Ex: 1000"
                            onChange={(e) =>
                              updateField(
                                index,
                                "waterQuantity",
                                e.target.value,
                              )
                            }
                            className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            L
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* RESPONSÁVEL */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center">
                        <SignatureSelector
                          value={log.responsible}
                          onChange={newValue => updateField(index, "responsible", newValue || "")}
                        />
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${log.status === "completed"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-gray-100 text-gray-800 border border-gray-200"
                            }`}
                        >
                          {log.status === "completed"
                            ? "Concluído"
                            : "Pendente"}
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
                  {logs.length} trocas registradas
                </span>
                <span className="mx-2">•</span>
                <span>
                  Total de água: {totalWater.toLocaleString("pt-BR")} litros
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Concluído</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-xs text-gray-600">Pendente</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === ÁREA DE ASSINATURAS === */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-6">
          <div className="p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-6 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-teal-600"
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
              Assinaturas de Validação
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* RESPONSÁVEL / EXECUTOR */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="mb-4 w-full">
                    <h4 className="font-bold text-gray-700 mb-2 text-center">
                      Responsável / Executor
                    </h4>
                    <p className="text-sm text-gray-500 text-center">
                      Assinatura do responsável pela execução da troca
                    </p>
                  </div>

                  <div className="w-full h-12 mb-4 flex items-end justify-center border border-gray-300 rounded-lg bg-white">
                    <SignatureSelector
                      value={signatures.responsible}
                      onChange={v => setSignatures(prev => ({ ...prev, responsible: v }))}
                    />
                  </div>

                  <div className="w-56 h-px bg-gray-400 mb-2"></div>
                  <p className="text-sm text-gray-600">
                    Assinatura do Executor
                  </p>
                </div>
              </div>

              {/* MONITORA RESPONSÁVEL */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="mb-4 w-full">
                    <h4 className="font-bold text-gray-700 mb-2 text-center">
                      Monitora Responsável
                    </h4>
                    <p className="text-sm text-gray-500 text-center">
                      Validação e conferência dos registros
                    </p>
                  </div>

                  <div className="w-full h-12 mb-4 flex items-end justify-center border border-gray-300 rounded-lg bg-white">
                    <SignatureSelector
                      value={signatures.monitor}
                      onChange={v => setSignatures(prev => ({ ...prev, monitor: v }))}
                    />
                  </div>

                  <div className="w-56 h-px bg-gray-400 mb-2"></div>
                  <p className="text-sm text-gray-600">
                    Assinatura da Monitora
                  </p>
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
                <div className="w-12 h-12 rounded-xl bg-linear-to-r from-teal-500 to-emerald-600 flex items-center justify-center">
                  <span className="font-bold text-lg">GV</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">GrandValle</h3>
                  <p className="text-gray-300 text-sm">
                    Controle de Tanques de Lavagem - Sistema{" "}
                    {currentSector === "europa" ? "Europa" : "Hidrotérmico"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-center">
                  <p className="text-gray-300 text-sm">Revisado por</p>
                  <p className="font-bold text-teal-300">
                    {COMPLIANCE.revisedBy}
                  </p>
                </div>

                <div className="h-8 w-px bg-gray-700"></div>

                <div className="text-center">
                  <p className="text-gray-300 text-sm">Código POP</p>
                  <div className="mt-2 px-4 py-2 bg-teal-600 rounded-lg">
                    <span className="font-bold">{COMPLIANCE.popCode}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <p>
                  © 2026 GrandValle. Sistema de Controle de Processamento de
                  Frutas.
                </p>
                <p className="mt-2 md:mt-0">
                  Última revisão: {COMPLIANCE.lastRevision}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
