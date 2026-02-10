"use client";

import { SignatureSelector } from "@/src/components/SignatureSelector";
import { useState } from "react";
import {
  BiPlus,
  BiTrash,
  BiCheck,
  BiX,
  BiUpload,
  BiUserCheck,
} from "react-icons/bi";

const CHEMICAL_PRODUCTS = [
  "Cloro (Veg San)",
  "Detergente Neutro (Clean Fruit)",
  "Ácido Peracético",
  "Graduete A+",
  "Cera de Carnaúba",
];

const CLEANING_PRODUCTS = [
  "Detergente Alcalino Clorado",
  "Primmax DGA",
  "Sabonete Dermol Plus",
  "MULTIFLEX - CHESIQUIMICA",
  "ALCOOL GEL 70%",
];

const GLASS_ITEMS = [
  "Vidros Trincados",
  "Vidros Quebrados",
  "Vidros Ausentes",
  "Vidros Sujos",
  "Lâmpadas c/ Proteção",
  "Presença de plástico rígido",
];

const PEST_SECTORS = [
  "Embalagem Europeu",
  "Embalagem Americana",
  "Embalagem Coreia",
  "Almoxarifado",
  "Caixaria",
  "Entrada de fruta",
  "Refeitório",
  "Câmara Fria",
  "Refugo",
  "Hidrotérmico",
  "Área Externa",
];

const PEST_TYPES = [
  "Baratas",
  "Cupins",
  "Moscas",
  "Formigas",
  "Aranhas",
  "Traças",
  "Roedores",
  "Pássaros",
];

type TabType = "quimicos" | "limpeza" | "vidros" | "pragas" | "residuos";

interface StockLog {
  id: number;
  date: string;
  product: string;
  entry: string;
  exit: string;
  balance: string;
  validity?: string;
  whoTook?: string;
  sector: string;
  responsible: string | null;
}

interface GlassItem {
  item: string;
  sim: boolean;
  nao: boolean;
  observation: string;
  correctiveAction: string;
  correctionTime: string;
}

interface PestSector {
  sector: string;
  checks: { [key: string]: string };
  trap: string;
  action: string;
  qtd: string;
}

interface WasteLog {
  id: number;
  period: string;
  tuesday: boolean;
  friday: boolean;
  collectorSignature: string | null;
  monitorSignature: string | null;
}

export default function ControleGeralQualidade() {
  const [activeTab, setActiveTab] = useState<TabType>("quimicos");

  const [chemicalLogs, setChemicalLogs] = useState<StockLog[]>([
    {
      id: 1,
      date: new Date().toISOString().split("T")[0],
      product: CHEMICAL_PRODUCTS[0],
      entry: "",
      exit: "",
      balance: "",
      validity: "",
      sector: "",
      responsible: null,
    },
  ]);

  const [cleaningLogs, setCleaningLogs] = useState<StockLog[]>([
    {
      id: 1,
      date: new Date().toISOString().split("T")[0],
      product: CLEANING_PRODUCTS[0],
      entry: "",
      exit: "",
      balance: "",
      whoTook: "",
      sector: "",
      responsible: null,
    },
  ]);

  const [glassChecklist, setGlassChecklist] = useState<GlassItem[]>(
    GLASS_ITEMS.map((item) => ({
      item,
      sim: false,
      nao: false,
      observation: "",
      correctiveAction: "",
      correctionTime: "",
    })),
  );

  const [glassSignatures, setGlassSignatures] = useState({
    monitor: null as string | null,
    resp: null as string | null,
  });

  const [pestMatrix, setPestMatrix] = useState<PestSector[]>(
    PEST_SECTORS.map((sector) => ({
      sector,
      checks: PEST_TYPES.reduce(
        (acc, pest) => ({ ...acc, [pest]: "C" }),
        {} as { [key: string]: string },
      ),
      trap: "",
      action: "",
      qtd: "",
    })),
  );

  const [pestMonitorSignature, setPestMonitorSignature] = useState<
    string | null
  >(null);

  const [wasteLogs, setWasteLogs] = useState<WasteLog[]>([
    {
      id: 1,
      period: "",
      tuesday: false,
      friday: false,
      collectorSignature: null,
      monitorSignature: null,
    },
  ]);

  const SignatureCell = ({
    signature,
    onSign,
    onUpload,
    onRemove,
    label,
  }: {
    signature: string | null;
    onSign: () => void;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
    label?: string;
  }) => {
    return (
      <div className="space-y-1">
        {label && (
          <div className="text-xs font-medium text-gray-700 text-center">
            {label}
          </div>
        )}
        <div className="h-16 border-2 border-dashed border-gray-300 rounded-lg bg-white hover:border-gray-400 transition-colors relative group">
          {signature ? (
            <>
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <img
                  src={signature}
                  alt="Assinado"
                  className="h-full max-w-full object-contain"
                />
              </div>
              <button
                onClick={onRemove}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <BiX size={12} />
              </button>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-1 p-2">
              <BiUserCheck className="text-gray-400 text-xl" />
              <div className="flex gap-2">
                <button
                  onClick={onSign}
                  className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
                >
                  <BiCheck size={12} />
                  Assinar
                </button>
                <label className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1 cursor-pointer">
                  <BiUpload size={12} />
                  Upload
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={onUpload}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const addStockRow = (type: "chem" | "clean") => {
    const setter = type === "chem" ? setChemicalLogs : setCleaningLogs;
    const current = type === "chem" ? chemicalLogs : cleaningLogs;
    const defaultProd =
      type === "chem" ? CHEMICAL_PRODUCTS[0] : CLEANING_PRODUCTS[0];

    setter([
      ...current,
      {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        product: defaultProd,
        entry: "",
        exit: "",
        balance: "",
        sector: "",
        responsible: null,
        ...(type === "chem" ? { validity: "" } : { whoTook: "" }),
      },
    ]);
  };

  const removeStockRow = (type: "chem" | "clean", id: number) => {
    const setter = type === "chem" ? setChemicalLogs : setCleaningLogs;
    const current = type === "chem" ? chemicalLogs : cleaningLogs;
    if (current.length > 1) {
      setter(current.filter((log) => log.id !== id));
    }
  };

  const updateStock = (
    type: "chem" | "clean",
    index: number,
    field: keyof StockLog,
    value: string,
  ) => {
    const setter = type === "chem" ? setChemicalLogs : setCleaningLogs;
    const current = type === "chem" ? chemicalLogs : cleaningLogs;
    const newLogs = [...current];
    //@ts-ignore
    newLogs[index][field] = value;
    setter(newLogs);
  };

  const toggleGlass = (index: number, type: "sim" | "nao") => {
    const newGlass = [...glassChecklist];
    newGlass[index][type] = !newGlass[index][type];
    if (type === "sim") newGlass[index].nao = false;
    else newGlass[index].sim = false;
    setGlassChecklist(newGlass);
  };

  const updateGlassText = (
    index: number,
    field: "observation" | "correctiveAction" | "correctionTime",
    value: string,
  ) => {
    const newGlass = [...glassChecklist];
    newGlass[index][field] = value;
    setGlassChecklist(newGlass);
  };

  const togglePest = (sectorIdx: number, pest: string) => {
    const newMatrix = [...pestMatrix];
    const current = newMatrix[sectorIdx].checks[pest];
    newMatrix[sectorIdx].checks[pest] = current === "C" ? "NC" : "C";
    setPestMatrix(newMatrix);
  };

  const updatePestField = (
    sectorIdx: number,
    field: "trap" | "action" | "qtd",
    value: string,
  ) => {
    const newMatrix = [...pestMatrix];
    //@ts-ignore
    newMatrix[sectorIdx][field] = value;
    setPestMatrix(newMatrix);
  };

  const addWasteRow = () => {
    setWasteLogs([
      ...wasteLogs,
      {
        id: Date.now(),
        period: "",
        tuesday: false,
        friday: false,
        collectorSignature: null,
        monitorSignature: null,
      },
    ]);
  };

  const removeWasteRow = (id: number) => {
    if (wasteLogs.length > 1)
      setWasteLogs(wasteLogs.filter((log) => log.id !== id));
  };

  const updateWasteField = (
    index: number,
    field: keyof WasteLog,
    value: any,
  ) => {
    const newLogs = [...wasteLogs];
    //@ts-ignore
    newLogs[index][field] = value;
    setWasteLogs(newLogs);
  };

  const getFooterInfo = () => {
    switch (activeTab) {
      case "quimicos":
        return {
          code: "PHM-013",
          title: "Controle de Estoque Pós-Colheita",
          pop: "POP-14",
        };
      case "limpeza":
        return {
          code: "POP-2.12.7",
          title: "Controle de Estoque Limpeza",
          pop: "",
        };
      case "vidros":
        return {
          code: "POP-VIDROS",
          title: "Monitoramento de Vidros e Plásticos",
          pop: "",
        };
      case "pragas":
        return {
          code: "POP-2.10.1",
          title: "Controle Integrado de Pragas",
          pop: "POP-09",
        };
      case "residuos":
        return { code: "POP-13", title: "Manejo de Resíduos", pop: "POP-13" };
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* === HEADER === */}
        <div className="mb-6">
          <div className="bg-linear-to-r from-gray-800 to-gray-900 rounded-xl p-5 sm:p-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                  {getFooterInfo().title}
                </h1>
                <p className="text-gray-300 text-sm sm:text-base">
                  Sistema integrado de controle de qualidade
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/30">
                <div className="text-white font-bold text-sm sm:text-base">
                  {getFooterInfo().pop}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ABAS DE NAVEGAÇÃO */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 bg-white rounded-xl shadow-sm border border-gray-300 p-2">
            {[
              { id: "quimicos", label: "📦 Estoque Químicos", color: "blue" },
              { id: "limpeza", label: "🧹 Estoque Limpeza", color: "green" },
              { id: "vidros", label: "🔍 Vidros e Plásticos", color: "yellow" },
              { id: "pragas", label: "🐀 Controle de Pragas", color: "red" },
              {
                id: "residuos",
                label: "♻️ Manejo de Resíduos",
                color: "emerald",
              },
            ].map((tab) => {
              const colorMap: { [key: string]: string } = {
                blue: "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-500",
                green:
                  "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-500",
                yellow:
                  "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border-yellow-500",
                red: "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-500",
                emerald:
                  "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-500",
              };

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? `${colorMap[tab.color]} border-b-4`
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* === CONTEÚDO DAS ABAS === */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          {/* 1. QUÍMICOS */}
          {activeTab === "quimicos" && (
            <div className="space-y-6">
              <div className="bg-linear-to-r from-blue-50 to-blue-100/20 border-l-4 border-blue-500 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 text-xl mb-1">
                  Controle de Estoque - Produtos Pós-Colheita
                </h3>
                <p className="text-gray-600 text-sm">
                  Registro de entrada, saída e validade dos produtos químicos
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Data
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Produto
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Entrada
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Validade
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Saída
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Setor
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Estoque
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Responsável
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 w-16">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {chemicalLogs.map((log, idx) => (
                        <tr
                          key={log.id}
                          className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <input
                              type="date"
                              value={log.date}
                              onChange={(e) =>
                                updateStock("chem", idx, "date", e.target.value)
                              }
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={log.product}
                              onChange={(e) =>
                                updateStock(
                                  "chem",
                                  idx,
                                  "product",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              {CHEMICAL_PRODUCTS.map((p) => (
                                <option key={p} value={p}>
                                  {p}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <input
                              value={log.entry}
                              onChange={(e) =>
                                updateStock(
                                  "chem",
                                  idx,
                                  "entry",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Qtd"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="date"
                              value={log.validity}
                              onChange={(e) =>
                                updateStock(
                                  "chem",
                                  idx,
                                  "validity",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <input
                              value={log.exit}
                              onChange={(e) =>
                                updateStock("chem", idx, "exit", e.target.value)
                              }
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Qtd"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <input
                              value={log.sector}
                              onChange={(e) =>
                                updateStock(
                                  "chem",
                                  idx,
                                  "sector",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Setor"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="bg-gray-50 border border-gray-300 rounded-lg">
                              <input
                                value={log.balance}
                                onChange={(e) =>
                                  updateStock(
                                    "chem",
                                    idx,
                                    "balance",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 text-center focus:outline-none"
                                placeholder="Saldo"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <SignatureSelector
                              value={log.responsible}
                              onChange={(val) =>
                                updateStock(
                                  activeTab === "quimicos" ? "chem" : "clean",
                                  idx,
                                  "responsible",
                                  val || "",
                                )
                              }
                            />
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => removeStockRow("chem", log.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remover linha"
                            >
                              <BiTrash size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => addStockRow("chem")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow"
                >
                  <BiPlus size={20} /> Adicionar Linha
                </button>
              </div>
            </div>
          )}

          {/* 2. LIMPEZA */}
          {activeTab === "limpeza" && (
            <div className="space-y-6">
              <div className="bg-linear-to-r from-green-50 to-green-100/20 border-l-4 border-green-500 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 text-xl mb-1">
                  Controle de Estoque - Materiais de Limpeza
                </h3>
                <p className="text-gray-600 text-sm">
                  Registro de materiais de limpeza utilizados nas operações
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Data
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Produto
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Entrada
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Saída
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Quem Pegou?
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Área
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Estoque
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Responsável
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 w-16">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cleaningLogs.map((log, idx) => (
                        <tr
                          key={log.id}
                          className="border-b border-gray-100 hover:bg-green-50/30 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <input
                              type="date"
                              value={log.date}
                              onChange={(e) =>
                                updateStock(
                                  "clean",
                                  idx,
                                  "date",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={log.product}
                              onChange={(e) =>
                                updateStock(
                                  "clean",
                                  idx,
                                  "product",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                              {CLEANING_PRODUCTS.map((p) => (
                                <option key={p} value={p}>
                                  {p}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <input
                              value={log.entry}
                              onChange={(e) =>
                                updateStock(
                                  "clean",
                                  idx,
                                  "entry",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 text-center focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="Qtd"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <input
                              value={log.exit}
                              onChange={(e) =>
                                updateStock(
                                  "clean",
                                  idx,
                                  "exit",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 text-center focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="Qtd"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <input
                              value={log.whoTook}
                              onChange={(e) =>
                                updateStock(
                                  "clean",
                                  idx,
                                  "whoTook",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="Nome"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <input
                              value={log.sector}
                              onChange={(e) =>
                                updateStock(
                                  "clean",
                                  idx,
                                  "sector",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="Área"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="bg-gray-50 border border-gray-300 rounded-lg">
                              <input
                                value={log.balance}
                                onChange={(e) =>
                                  updateStock(
                                    "clean",
                                    idx,
                                    "balance",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 text-center focus:outline-none"
                                placeholder="Saldo"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <SignatureSelector
                              value={log.responsible}
                              onChange={(val) =>
                                updateStock(
                                  activeTab === "limpeza" ? "clean" : "chem",
                                  idx,
                                  "responsible",
                                  val || "",
                                )
                              }
                            />
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => removeStockRow("clean", log.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remover linha"
                            >
                              <BiTrash size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => addStockRow("clean")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-sm hover:shadow"
                >
                  <BiPlus size={20} /> Adicionar Linha
                </button>
              </div>
            </div>
          )}

          {/* 3. VIDROS */}
          {activeTab === "vidros" && (
            <div className="space-y-8">
              <div className="bg-linear-to-r from-amber-50 to-amber-100/20 border-l-4 border-amber-500 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 text-xl mb-1">
                  Monitoramento de Vidros e Plásticos
                </h3>
                <p className="text-gray-600 text-sm">
                  Verificação de conformidade e ações corretivas para vidros e
                  plásticos rígidos
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 min-w-50">
                          Item a Verificar
                        </th>
                        <th className="py-3 px-4 text-center font-semibold text-gray-700 w-24">
                          SIM
                        </th>
                        <th className="py-3 px-4 text-center font-semibold text-gray-700 w-24">
                          NÃO
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 min-w-50">
                          Observação
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 min-w-50">
                          Ação Corretiva
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 min-w-37.5">
                          Tempo de Correção
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {glassChecklist.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-100 hover:bg-amber-50/30 transition-colors"
                        >
                          <td className="py-4 px-4 font-medium text-gray-900">
                            {row.item}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => toggleGlass(idx, "sim")}
                              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${row.sim ? "bg-green-100 text-green-600 border-2 border-green-500 shadow-sm" : "bg-gray-100 text-gray-400 border border-gray-300 hover:bg-gray-200"}`}
                            >
                              {row.sim && <BiCheck size={22} />}
                            </button>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => toggleGlass(idx, "nao")}
                              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${row.nao ? "bg-red-100 text-red-600 border-2 border-red-500 shadow-sm" : "bg-gray-100 text-gray-400 border border-gray-300 hover:bg-gray-200"}`}
                            >
                              {row.nao && <BiX size={22} />}
                            </button>
                          </td>
                          <td className="py-4 px-4">
                            <textarea
                              value={row.observation}
                              onChange={(e) =>
                                updateGlassText(
                                  idx,
                                  "observation",
                                  e.target.value,
                                )
                              }
                              className=" bg-white border border-gray-300 rounded-lg p-3 text-sm text-gray-800 h-28 resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              placeholder="Descreva observações..."
                            />
                          </td>
                          <td className=" ">
                            <textarea
                              value={row.correctiveAction}
                              onChange={(e) =>
                                updateGlassText(
                                  idx,
                                  "correctiveAction",
                                  e.target.value,
                                )
                              }
                              className="w-3xs bg-white border border-gray-300 rounded-lg p-3 text-sm text-gray-800 h-28 resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              placeholder="Descreva ação corretiva..."
                            />
                          </td>
                          <td className="py-4 px-4">
                            <input
                              value={row.correctionTime}
                              onChange={(e) =>
                                updateGlassText(
                                  idx,
                                  "correctionTime",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              placeholder="Ex: 24h, 48h, 1 semana..."
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <div className="text-center mb-5">
                    <div className="font-semibold text-gray-900 text-base mb-1">
                      Monitor Responsável
                    </div>
                    <div className="text-xs text-gray-500">
                      Quem realizou a verificação
                    </div>
                  </div>
                  <SignatureSelector
                    value={glassSignatures.monitor}
                    onChange={(val) =>
                      setGlassSignatures((prev) => ({ ...prev, monitor: val }))
                    }
                  />
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <div className="text-center mb-5">
                    <div className="font-semibold text-gray-900 text-base mb-1">
                      Responsável pelo Packing
                    </div>
                    <div className="text-xs text-gray-500">
                      Supervisor da área
                    </div>
                  </div>
                  <SignatureSelector
                    value={glassSignatures.resp}
                    onChange={(val) =>
                      setGlassSignatures((prev) => ({ ...prev, resp: val }))
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4. PRAGAS */}
          {activeTab === "pragas" && (
            <div className="space-y-6">
              <div className="bg-linear-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Controle Integrado de Pragas
                    </h2>
                    <p className="text-rose-100 opacity-90">
                      Monitoramento e gestão semanal por setor
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-linear-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                          Setor
                        </th>
                        {PEST_TYPES.map((pest, pestIndex) => (
                          <th
                            key={pest}
                            className="py-4 px-4 text-center font-bold text-gray-700 text-sm uppercase tracking-wider min-w-30 group relative"
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-xs text-gray-500 mb-1">
                                Tipo
                              </span>
                              <span className="font-semibold text-gray-900">
                                {pest}
                              </span>
                            </div>
                          </th>
                        ))}
                        <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                          <div className="flex flex-col">
                            <span>Armadilha</span>
                            <span className="text-xs font-normal text-gray-500">
                              Número
                            </span>
                          </div>
                        </th>
                        <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                          <div className="flex flex-col">
                            <span>Ação Corretiva</span>
                            <span className="text-xs font-normal text-gray-500">
                              Descrição
                            </span>
                          </div>
                        </th>
                        <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                          <div className="flex flex-col">
                            <span>Quantidade</span>
                            <span className="text-xs font-normal text-gray-500">
                              Encontrada
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {pestMatrix.map((row, sectorIdx) => (
                        <tr
                          key={sectorIdx}
                          className="hover:bg-rose-50/30 transition-colors duration-150"
                        >
                          <td className="py-4 px-6 sticky left-0 bg-white hover:bg-rose-50/30 z-10">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                              <span className="font-semibold text-gray-900">
                                {row.sector}
                              </span>
                            </div>
                          </td>

                          {PEST_TYPES.map((pest) => {
                            const isConforme = row.checks[pest] === "C";
                            return (
                              <td key={pest} className="py-4 px-4">
                                <button
                                  onClick={() => togglePest(sectorIdx, pest)}
                                  className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl transition-all duration-200 ${
                                    isConforme
                                      ? "bg-green-50 hover:bg-green-100 border border-green-200"
                                      : "bg-red-50 hover:bg-red-100 border border-red-200"
                                  }`}
                                >
                                  <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                      isConforme ? "bg-green-500" : "bg-red-500"
                                    }`}
                                  >
                                    <span className="text-1xs font-bold text-white">
                                      {isConforme ? "C" : "NC"}
                                    </span>
                                  </div>
                                  <span
                                    className={`text-sm font-semibold ${
                                      isConforme
                                        ? "text-green-700"
                                        : "text-red-700"
                                    }`}
                                  >
                                    {isConforme ? "Conforme" : "Não Conforme"}
                                  </span>
                                </button>
                              </td>
                            );
                          })}

                          <td className="py-4 px-6">
                            <input
                              value={row.trap}
                              onChange={(e) =>
                                updatePestField(
                                  sectorIdx,
                                  "trap",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                              placeholder="Ex: A001"
                            />
                          </td>

                          <td className="py-4 px-6">
                            <div className="relative">
                              <textarea
                                value={row.action}
                                onChange={(e) =>
                                  updatePestField(
                                    sectorIdx,
                                    "action",
                                    e.target.value,
                                  )
                                }
                                className="w-1xl bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none transition-all"
                                placeholder="Descreva a ação corretiva..."
                                rows={2}
                              />
                              {row.action && (
                                <div className="absolute -top-2 right-2 bg-rose-500 text-white text-xs px-2 py-1 rounded-full">
                                  {row.action.length}/200
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={row.qtd}
                                onChange={(e) =>
                                  updatePestField(
                                    sectorIdx,
                                    "qtd",
                                    e.target.value,
                                  )
                                }
                                min="0"
                                className="w-24 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                                placeholder="0"
                              />
                              <span className="text-sm text-gray-500">
                                unidades
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Rodapé da tabela */}
                <div className="bg-gray-50 border-t border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Clique nos botões de status para alternar entre Conforme e
                      Não Conforme • Passe o mouse sobre uma praga para
                      removê-la
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                      Total:{" "}
                      <span className="text-rose-600">{pestMatrix.length}</span>{" "}
                      setores •{" "}
                      <span className="text-rose-600">{PEST_TYPES.length}</span>{" "}
                      pragas
                    </div>
                  </div>
                </div>
              </div>

              {/* Controles de adição */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-linear-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-5">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BiPlus className="text-rose-600" />
                    Gerenciar Pragas
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        const newPest = prompt("Digite o nome da nova praga:");
                        if (newPest && newPest.trim() !== "") {
                          PEST_TYPES.push(newPest.trim());
                          setPestMatrix((prev) =>
                            prev.map((sector) => ({
                              ...sector,
                              checks: {
                                ...sector.checks,
                                [newPest.trim()]: "C",
                              },
                            })),
                          );
                          setPestMatrix([...pestMatrix]);
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-3 rounded-lg transition-all shadow-sm"
                    >
                      <BiPlus size={18} />
                      Adicionar Nova Praga
                    </button>
                    <button
                      onClick={() => {
                        const newSector = prompt(
                          "Digite o nome do novo setor:",
                        );
                        if (newSector && newSector.trim() !== "") {
                          const newChecks = PEST_TYPES.reduce(
                            (acc, pest) => ({ ...acc, [pest]: "C" }),
                            {} as { [key: string]: string },
                          );

                          setPestMatrix((prev) => [
                            ...prev,
                            {
                              sector: newSector.trim(),
                              checks: newChecks,
                              trap: "",
                              action: "",
                              qtd: "",
                            },
                          ]);
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-3 rounded-lg transition-all shadow-sm"
                    >
                      <BiPlus size={18} />
                      Adicionar Novo Setor
                    </button>
                  </div>
                </div>

                <div className="bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5">
                  <h4 className="font-bold text-gray-900 mb-3">
                    Dicas Rápidas
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Clique em uma praga para alternar status</li>
                    <li>• Passe o mouse sobre o nome da praga para remover</li>
                    <li>• Todas as pragas novas começam como "Conforme"</li>
                    <li>• Dados são salvos automaticamente</li>
                  </ul>
                </div>
              </div>

              {/* Assinatura responsável */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2">
                  <div className="bg-linear-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="font-bold text-gray-900 text-lg mb-4">
                      Instruções
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs mt-0.5">
                          1
                        </div>
                        <span>
                          Clique nos círculos de status para alternar entre
                          Conforme (C) e Não Conforme (NC)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs mt-0.5">
                          2
                        </div>
                        <span>
                          Use o botão "Adicionar Nova Praga" para incluir novos
                          tipos de pragas
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs mt-0.5">
                          3
                        </div>
                        <span>
                          Para remover uma praga, passe o mouse sobre seu nome e
                          clique no X
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs mt-0.5">
                          4
                        </div>
                        <span>
                          Preencha número da armadilha, ação corretiva e
                          quantidade
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="text-center mb-6">
                    <div className="font-bold text-gray-900 text-lg mb-1">
                      Responsável
                    </div>
                    <div className="text-sm text-gray-500">
                      Assinatura digital do monitor
                    </div>
                  </div>

                  <div className="space-y-4">
                    <SignatureSelector
                      value={pestMonitorSignature}
                      onChange={(val) => setPestMonitorSignature(val)}
                    />

                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500 mb-2">
                        Registro automático
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">Data:</span>
                        <span className="font-medium text-gray-900">
                          {new Date().toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. RESÍDUOS */}
          {activeTab === "residuos" && (
            <div className="space-y-8">
              <div className="bg-linear-to-r from-emerald-50 to-emerald-100/20 border-l-4 border-emerald-500 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 text-xl mb-1">
                  Manejo de Resíduos
                </h3>
                <p className="text-gray-600 text-sm">
                  Controle de recolhimento de resíduos: Plástico, Papelão,
                  Vidro, Madeira e Outros
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Data Período
                        </th>
                        <th className="py-3 px-4 text-center font-semibold text-gray-700">
                          Terça
                        </th>
                        <th className="py-3 px-4 text-center font-semibold text-gray-700">
                          Sexta
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Responsável / Recolhimento
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">
                          Monitor Responsável
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 w-16">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {wasteLogs.map((log, idx) => (
                        <tr
                          key={log.id}
                          className="border-b border-gray-100 hover:bg-emerald-50/30 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <input
                              value={log.period}
                              onChange={(e) =>
                                updateWasteField(idx, "period", e.target.value)
                              }
                              placeholder="Ex: 01 a 07/Jan"
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() =>
                                updateWasteField(idx, "tuesday", !log.tuesday)
                              }
                              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${log.tuesday ? "bg-green-100 text-green-600 border-2 border-green-500 shadow-sm" : "bg-gray-100 text-gray-400 border border-gray-300 hover:bg-gray-200"}`}
                            >
                              {log.tuesday && <BiCheck size={22} />}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() =>
                                updateWasteField(idx, "friday", !log.friday)
                              }
                              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${log.friday ? "bg-green-100 text-green-600 border-2 border-green-500 shadow-sm" : "bg-gray-100 text-gray-400 border border-gray-300 hover:bg-gray-200"}`}
                            >
                              {log.friday && <BiCheck size={22} />}
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <SignatureSelector
                              value={log.collectorSignature}
                              onChange={(val) =>
                                updateWasteField(
                                  idx,
                                  "collectorSignature",
                                  val || "",
                                )
                              }
                            />
                          </td>
                          <td className="py-3 px-4">
                            <SignatureSelector
                              value={log.monitorSignature}
                              onChange={(val) =>
                                updateWasteField(
                                  idx,
                                  "monitorSignature",
                                  val || "",
                                )
                              }
                            />

                            <></>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => removeWasteRow(log.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remover linha"
                            >
                              <BiTrash size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={addWasteRow}
                  className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-sm hover:shadow"
                >
                  <BiPlus size={20} /> Nova Semana
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RODAPÉ */}
        <div className="bg-black rounded-xl shadow-lg p-5 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-300 mb-1">Revisado por</div>
              <div className="text-lg font-semibold text-yellow-400">
                Clebitânia Carvalho
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-300 mb-1">Última Revisão</div>
              <div className="text-lg font-bold">02/01/2026</div>
            </div>
            <div>
              <div className="text-sm text-gray-300 mb-1">
                Código do Documento
              </div>
              <div className="text-lg font-bold">{getFooterInfo().pop}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-300">
          <div className="text-center text-gray-600 text-sm">
            <p className="text-black">
              GrandValle © {new Date().getFullYear()} • Sistema de Controle de
              Qualidade e Manutenção
            </p>
            <p className="mt-1 text-black">
              Documento: {getFooterInfo().pop} • Última revisão: 02/01/2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
