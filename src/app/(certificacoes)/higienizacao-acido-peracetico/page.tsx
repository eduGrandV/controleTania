"use client";

import { SignatureSelector } from "@/src/components/SignatureSelector";
import { Sign } from "crypto";
import { useState, useEffect } from "react";

const SECTORS = {
  coreia: {
    id: "coreia",
    title: "Higienização Setor Coreia",
    product: "Chesy 501215 (Ácido Peracético)",
    defaultDosage: "",
    instructions:
      "Procedimento áreas quarentenárias: Adicionar na bomba a solução na proporção de 30 a 60mls do produto para 20 litros de água. Pulverizar e deixar 10 min.",
    icon: "🇰🇷",
    category: "Quarentenário",
    frequency: "Diária",
  },
  eua: {
    id: "eua",
    title: "Higienização Setor Estados Unidos",
    product: "Chesy 501215 (Ácido Peracético)",
    defaultDosage: "",
    instructions:
      "Procedimento áreas quarentenárias: Adicionar na bomba a solução na proporção de 30 a 60mls do produto para 20 litros de água. Pulverizar e deixar 10 min.",
    icon: "🇺🇸",
    category: "Quarentenário",
    frequency: "Diária",
  },
  hidrotermico: {
    id: "hidrotermico",
    title: "Higienização do Hidrotérmico",
    product: "Chesy 501215 (Ácido Peracético)",
    defaultDosage: "",
    instructions:
      "Procedimento áreas quarentenárias: Adicionar na bomba a solução na proporção de 30 a 60mls do produto para 20 litros de água. Pulverizar e deixar 10 min.",
    icon: "🔥",
    category: "Equipamentos",
    frequency: "Após Uso",
  },
  conteiner: {
    id: "conteiner",
    title: "Higienização dos Contêineres",
    product: "Chesy 501215 (Ácido Peracético)",
    defaultDosage: "",
    instructions:
      "Procedimento: Adicionar na bomba a solução na proporção de 30 a 60mls do produto para 20 litros de água. Pulverizar e deixar 10 min.",
    icon: "📦",
    category: "Armazenamento",
    frequency: "Antes do Uso",
  },
};

type SectorKey = keyof typeof SECTORS;

interface DailyLog {
  day: number;
  produto: string;
  dosagem: string;
  acaoCorretiva: string;
  assinatura: string | null;
  status: "pending" | "completed" | "corrective";
}

const MONTHS = [
  { id: "JAN", name: "Janeiro", color: "bg-blue-50 border-blue-200" },
  { id: "FEV", name: "Fevereiro", color: "bg-purple-50 border-purple-200" },
  { id: "MAR", name: "Março", color: "bg-green-50 border-green-200" },
  { id: "ABR", name: "Abril", color: "bg-yellow-50 border-yellow-200" },
  { id: "MAI", name: "Maio", color: "bg-red-50 border-red-200" },
  { id: "JUN", name: "Junho", color: "bg-indigo-50 border-indigo-200" },
  { id: "JUL", name: "Julho", color: "bg-pink-50 border-pink-200" },
  { id: "AGO", name: "Agosto", color: "bg-teal-50 border-teal-200" },
  { id: "SET", name: "Setembro", color: "bg-orange-50 border-orange-200" },
  { id: "OUT", name: "Outubro", color: "bg-cyan-50 border-cyan-200" },
  { id: "NOV", name: "Novembro", color: "bg-emerald-50 border-emerald-200" },
  { id: "DEZ", name: "Dezembro", color: "bg-rose-50 border-rose-200" },
];

export default function HigienizacaoAcidoPeracetico() {
  const [currentSector, setCurrentSector] = useState<SectorKey>("coreia");
  const [selectedMonth, setSelectedMonth] = useState("JAN");
  const [year, setYear] = useState(2026);
  const [showInstructions, setShowInstructions] = useState(true);

  const [logs, setLogs] = useState<DailyLog[]>([]);

  useEffect(() => {
    const config = SECTORS[currentSector];
    const initialData = Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      produto: config.product,
      dosagem: config.defaultDosage,
      acaoCorretiva: "",
      assinatura: null,
      status: "pending",
    }));
    //@ts-ignore
    setLogs(initialData);
  }, [currentSector]);

  const updateField = (index: number, field: keyof DailyLog, value: string) => {
    const newLogs = [...logs];
    // @ts-ignore
    newLogs[index][field] = value;
    if (field === "acaoCorretiva" && value.trim()) {
      newLogs[index].status = "corrective";
    } else if (field === "assinatura" && newLogs[index].assinatura) {
      newLogs[index].status = "completed";
    }
    setLogs(newLogs);
  };

  // FUNÇÕES DE ASSINATURA
  const signStandard = (index: number) => {
    const newLogs = [...logs];
    newLogs[index].assinatura = "/raivans.png";
    newLogs[index].status = "completed";
    setLogs(newLogs);
  };

  const handleFileUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const newLogs = [...logs];
      newLogs[index].assinatura = URL.createObjectURL(file);
      newLogs[index].status = "completed";
      setLogs(newLogs);
    }
  };

  const removeSignature = (index: number) => {
    const newLogs = [...logs];
    newLogs[index].assinatura = null;
    newLogs[index].status = "pending";
    setLogs(newLogs);
  };

  const activeConfig = SECTORS[currentSector];
  const currentMonth = MONTHS.find((m) => m.id === selectedMonth);



  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* === HEADER PRINCIPAL === */}
        <header className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden border border-gray-200">
          <div className="p-6 bg-linear-to-r from-blue-600 to-blue-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl">{activeConfig.icon}</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Controle de Higienização
                  </h1>
                  <p className="text-blue-100">
                    Ácido Peracético - Sistema Integrado
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-blue-100 text-sm">Ano Fiscal</p>
                    <p className="text-white font-bold text-2xl">{year}</p>
                  </div>
                  <button
                    onClick={() => setYear(year - 1)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setYear(year + 1)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* === NAVEGAÇÃO DE SETORES === */}
          <div className="p-4 bg-linear-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(SECTORS) as SectorKey[]).map((key) => {
                const sector = SECTORS[key];
                return (
                  <button
                    key={key}
                    onClick={() => setCurrentSector(key)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${currentSector === key
                        ? "bg-white shadow-lg border-2 border-blue-500 transform scale-105"
                        : "bg-white/70 hover:bg-white hover:shadow-md border border-gray-200 hover:border-blue-300"
                      }`}
                  >
                    <span className="text-2xl">{sector.icon}</span>
                    <div className="text-left">
                      <p className="font-bold text-gray-800 text-sm">
                        {sector.title.replace("Higienização ", "")}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                          {sector.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {sector.frequency}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* === SELEÇÃO DE MÊS === */}
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="mb-3">
              <h3 className="font-bold text-gray-700 text-sm mb-2 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-500"
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
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-2">
              {MONTHS.map((month) => (
                <button
                  key={month.id}
                  onClick={() => setSelectedMonth(month.id)}
                  className={`p-3 rounded-lg text-center transition-all ${selectedMonth === month.id
                      ? `${month.color} border-2 border-blue-500 shadow-md transform scale-105`
                      : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  <div className="text-xs font-bold text-gray-800">
                    {month.id}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">
                    {month.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* === TABELA PRINCIPAL === */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-6">
          {/* CABEÇALHO DA TABELA */}
          <div className="p-5 bg-linear-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Registros do Mês - {currentMonth?.name} {year}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {activeConfig.title} • {activeConfig.product}
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

                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
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
                  Exportar
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
                  <div>
                    <p className="font-medium text-blue-800">
                      Instruções do Procedimento:
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      {activeConfig.instructions}
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
                <tr className="bg-linear-to-r from-gray-100 to-gray-50 border-b border-gray-200">
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Data
                    </div>
                  </th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Dosagem (ml/L)
                  </th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Responsável
                  </th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Ação Corretiva
                  </th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((log, index) => (
                  <tr
                    key={log.day}
                    className={`hover:bg-gray-50 transition-colors ${log.status === "completed" ? "bg-green-50/50" : log.status === "corrective" ? "bg-amber-50/50" : ""}`}
                  >
                    {/* DATA */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentMonth?.color.split(" ")[0] || "bg-blue-100"}`}
                        >
                          <span className="font-bold text-gray-800">
                            {String(log.day).padStart(2, "0")}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">
                            Dia {log.day}
                          </div>
                          <div className="text-xs text-gray-400">
                            {selectedMonth}/{year}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* PRODUTO */}
                    <td className="py-3 px-4">
                      <div className="relative group">
                        <input
                          type="text"
                          value={log.produto}
                          onChange={(e) =>
                            updateField(index, "produto", e.target.value)
                          }
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>

                    {/* DOSAGEM */}
                    <td className="py-3 px-4">
                      <div className="relative">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={log.dosagem}
                            onChange={(e) =>
                              updateField(index, "dosagem", e.target.value)
                            }
                            className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="30-60 ml/20L"
                          />
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            ppm
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* RESPONSÁVEL / ASSINATURA */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center">
                        <SignatureSelector
                          value={log.assinatura}
                          onChange={(n) =>
                            updateField(index, "assinatura", n || "")
                          }
                        />
                      </div>
                    </td>

                    {/* AÇÃO CORRETIVA */}
                    <td className="py-3 px-4">
                      <div className="relative">
                        <input
                          type="text"
                          value={log.acaoCorretiva}
                          onChange={(e) =>
                            updateField(index, "acaoCorretiva", e.target.value)
                          }
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          placeholder="Descreva ação corretiva, se houver..."
                        />
                        {log.acaoCorretiva && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="py-3 px-4 flex justify-center items-cente">
                      <div className="flex justify-center items-center">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium flex justify-center items-center${log.status === "completed"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : log.status === "corrective"
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : "bg-gray-100 text-gray-800 border border-gray-200"
                            }`}
                        >
                          {log.status === "completed"
                            ? "✓ Concluído"
                            : log.status === "corrective"
                              ? "Corretiva"
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
                <span className="font-medium">{logs.length} dias no mês</span>
                <span className="mx-2">•</span>
                <span>Ácido Peracético: Chesy 501215</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Concluído</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Corretiva</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-xs text-gray-600">Pendente</span>
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
                <div className="w-12 h-12 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="font-bold text-lg">GV</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">GrandValle</h3>
                  <p className="text-gray-300 text-sm">
                    Controle de Higienização com Ácido Peracético
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-center">
                  <p className="text-gray-300 text-sm">
                    Monitor de Verificação
                  </p>
                  <div className="mt-2 h-8 w-48 bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">
                      _______________________
                    </span>
                  </div>
                </div>

                <div className="h-8 w-px bg-gray-700 hidden md:block"></div>

                <div className="text-center">
                  <p className="text-gray-300 text-sm">Código Interno</p>
                  <div className="mt-2 px-4 py-2 bg-blue-600 rounded-lg">
                    <span className="font-bold">
                      CHESY AP-501215 / POP-RELACIONADO
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <p>© 2026 GrandValle. Todos os direitos reservados.</p>
                <p className="mt-2 md:mt-0">
                  Sistema atualizado em:{" "}
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
