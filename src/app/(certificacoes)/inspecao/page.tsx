"use client";

import { SignatureSelector } from "@/src/components/SignatureSelector";
import { useState } from "react";
import {
  BiPlus,
  BiTrash,
  BiCheckCircle,
  BiXCircle,
  BiUser,
  BiBuilding,
  BiCalendarWeek,
  BiError,
  BiInfoCircle,
  BiCalendar,
  BiClipboard,
  BiWater,
  BiPackage,
} from "react-icons/bi";

const CHLORINE_PRODUCTS = [
  {
    id: "vegan_san",
    name: "Vegan San",
    type: "Sanitizante Orgânico",
    dosage: "100 a 200 ppm",
    procedure:
      "1 ml de água do tanque; 4 ml de água desionizada; 1 medida de reagente (1); 2 gotas do reagente (2). Comparar.",
    icon: "🧪",
  },
];

const PRE_OP_ITEMS = [
  { id: 1, category: "Instalações", item: "A torneira está funcionando?" },
  {
    id: 2,
    category: "Instalações",
    item: " O Registro para acionar a torneira está funcionando?",
  },
  {
    id: 3,
    category: "Instalações",
    item: "Acionamento das lixeiras funciona?",
  },
  {
    id: 4,
    category: "Suprimentos",
    item: "As saboneteiras estão abastecidas e funcionando?",
  },
  {
    id: 5,
    category: "Suprimentos",
    item: "Tem álcool em gel nos recipientes?",
  },
  { id: 6, category: "Limpeza", item: "O piso está totalmente limpo?" },
  { id: 7, category: "Limpeza", item: "Os equipamentos estão limpos?" },
  {
    id: 8,
    category: "Controle de Pragas",
    item: "As armadilhas de controle de Pragas estão em bom estado?",
  },
  { id: 9, category: "Limpeza", item: "Os lixeiros estão vazios?" },
  {
    id: 10,
    category: "Instalações",
    item: "As portas estão fechadas e limpas?",
  },
  {
    id: 11,
    category: "Limpeza",
    item: "As partes inferiores dos equipamentos estão limpas?",
  },
  { id: 12, category: "Limpeza", item: "Os ralos estão limpos?" },
  { id: 13, category: "Equipamentos", item: "Bandejas e mesas limpas?" },
  {
    id: 14,
    category: "Instalações",
    item: "A iluminação está funcionando adequadamente?",
  },
  { id: 15, category: "Segurança", item: "Lâmpadas protegidas?" },
  {
    id: 16,
    category: "Instalações",
    item: "As paredes e o teto estão limpos e em bom estado?",
  },
  {
    id: 17,
    category: "Área Externa",
    item: "A área ao redor do packing está limpa e sem água parada?",
  },
  {
    id: 18,
    category: "Limpeza",
    item: "O lixo está sendo colocado no local apropriado?",
  },
  {
    id: 19,
    category: "Instalações",
    item: "As tubulações estão funcionando corretamente?",
  },
  { id: 20, category: "Limpeza", item: "As paredes estão limpas?" },
  {
    id: 21,
    category: "Segurança",
    item: "Os dispositivos de segurança dos portões de acesso, portas e janelas estão funcionando adequadamente e sem sinal de violação?",
  },
  {
    id: 22,
    category: "Instalações",
    item: "Reparações temporárias estão sendo observadas?",
  },
  {
    id: 23,
    category: "Segurança",
    item: "As colméias (frio) se encontra em bom estado e sem sinal de violação?",
  },
];

const WEEK_DAYS = [
  { short: "Seg", full: "Segunda", color: "blue" },
  { short: "Ter", full: "Terça", color: "green" },
  { short: "Qua", full: "Quarta", color: "yellow" },
  { short: "Qui", full: "Quinta", color: "orange" },
  { short: "Sex", full: "Sexta", color: "red" },
  { short: "Sab", full: "Sábado", color: "purple" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Instalações: "bg-blue-50 text-blue-700 border-blue-200",
  Limpeza: "bg-green-50 text-green-700 border-green-200",
  Suprimentos: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Segurança: "bg-red-50 text-red-700 border-red-200",
  Equipamentos: "bg-purple-50 text-purple-700 border-purple-200",
  "Controle de Pragas": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Área Externa": "bg-cyan-50 text-cyan-700 border-cyan-200",
};

const CLEANING_PRODUCTS = [
  {
    id: "sanclor",
    name: "Primmax Sanclor",
    composition: "Hipoclorito de Sódio",
    packaging: "Embalagem de 60kg",
    icon: "🧴",
  },
  {
    id: "sol_plus",
    name: "Primmax Sol Plus",
    composition: "Detergente desengordurante",
    packaging: "Embalagem de 5 litros",
    icon: "🧽",
  },
  {
    id: "dermol_plus",
    name: "Sabonete Dermol Plus",
    composition:
      "Triclosan, tensoativo aniônico, emoliente, espessante, agente perolizante",
    packaging: "Embalagem de 5 litros",
    icon: "🧼",
  },
  {
    id: "alcool_gel",
    name: "Álcool gel a 70%",
    composition: "Álcool gel a 70%",
    packaging: "Embalagem de 5 Litros",
    icon: "🧴",
  },
  {
    id: "dga",
    name: "Primmax DGA",
    composition: "Desincrustante caustico",
    packaging: "Embalagem de 50 Litros",
    icon: "🧪",
  },
  {
    id: "detergente_clorado",
    name: "Detergente Alcalino Clorado",
    composition: "Desincrustante Alcalino",
    packaging: "Embalagem de 20 Litros",
    icon: "🧴",
  },
];

type TabType = "pre_inspecao" | "cloro_agua" | "recebimento";
type ProductType =
  | "sanclor"
  | "sol_plus"
  | "dermol_plus"
  | "alcool_gel"
  | "dga"
  | "detergente_clorado";

interface ChlorineLog {
  id: number;
  date: string;
  time: string;
  ppm: string;
  ph: string;
  observation: string;
  correctiveAction: string;
  product: string;
}

interface ReceiptLog {
  id: number;
  date: string;
  productType: ProductType;
  isCorrectProduct: boolean | null;
  isCompositionOk: boolean | null;
  isPackagingOk: boolean | null;
  isStandardOk: boolean | null;
  requirementsMet: boolean | null;
  responsible: string | null;
}

interface ActionPlan {
  id: number;
  date: string;
  item: string;
  nonConformity: string;
  action: string;
  responsible: string | null;
  status: "pendente" | "em_andamento" | "concluido";
}

interface WaterLog {
  id: number;
  type: "Europa" | "Hidrotérmico";
  date: string;
  tankNumber: string;
  quantity: string;
  responsible: string | null;
  monitor: string | null;
}

export default function ControleOperacionalMaster() {
  const [activeTab, setActiveTab] = useState<TabType>("pre_inspecao");
  const [selectedProduct, setSelectedProduct] =
    useState<ProductType>("sanclor");

  const [preOpInfo, setPreOpInfo] = useState({
    week: "",
    isEmbaladora: true,
    coordinator: null as string | null,
    date: "",
    area: "Embaladora",
  });

  const [preOpData, setPreOpData] = useState(
    PRE_OP_ITEMS.map((item) => ({
      id: item.id,
      category: item.category,
      item: item.item,
      checks: WEEK_DAYS.reduce(
        (acc, day) => ({ ...acc, [day.short]: null as "S" | "N" | null }),
        {},
      ),
    })),
  );

  const [preOpActions, setPreOpActions] = useState<ActionPlan[]>([
    {
      id: 1,
      date: "",
      item: "",
      nonConformity: "",
      action: "",
      responsible: null,
      status: "pendente",
    },
  ]);

  const [chlorineLogs, setChlorineLogs] = useState<ChlorineLog[]>([
    {
      id: 1,
      date: "",
      time: "",
      ppm: "",
      ph: "",
      observation: "",
      correctiveAction: "",
      product: "Vegan San",
    },
  ]);

  const [waterLogs, setWaterLogs] = useState<WaterLog[]>([
    {
      id: 1,
      type: "Europa",
      date: "",
      tankNumber: "-",
      quantity: "",
      responsible: null,
      monitor: null,
    },
  ]);

  const [receiptLogs, setReceiptLogs] = useState<ReceiptLog[]>([
    {
      id: 1,
      date: "",
      productType: "sanclor",
      isCorrectProduct: null,
      isCompositionOk: null,
      isPackagingOk: null,
      isStandardOk: null,
      requirementsMet: null,
      responsible: null,
    },
  ]);

  const handleSignatureList = (
    setter: any,
    list: any[],
    index: number,
    field: string,
    value: string | null,
  ) => {
    const newList = [...list];
    newList[index][field] = value;
    setter(newList);
  };

  const handleSignatureCoordinator = (value: string | null) => {
    setPreOpInfo({ ...preOpInfo, coordinator: value });
  };

  const calculatePreOpStats = () => {
    let totalChecks = 0;
    let yesCount = 0;
    let noCount = 0;

    preOpData.forEach((item) => {
      Object.values(item.checks).forEach((check) => {
        if (check !== null) {
          totalChecks++;
          if (check === "S") yesCount++;
          if (check === "N") noCount++;
        }
      });
    });

    return {
      totalChecks,
      yesCount,
      noCount,
      pending: totalChecks - yesCount - noCount,
    };
  };

  const getCategoryStats = () => {
    const stats: Record<string, { total: number; yes: number; no: number }> =
      {};

    PRE_OP_ITEMS.forEach((item) => {
      if (!stats[item.category]) {
        stats[item.category] = { total: 0, yes: 0, no: 0 };
      }
    });

    preOpData.forEach((item) => {
      Object.values(item.checks).forEach((check) => {
        if (check !== null) {
          stats[item.category].total++;
          if (check === "S") stats[item.category].yes++;
          if (check === "N") stats[item.category].no++;
        }
      });
    });

    return stats;
  };

  const getDayStats = (day: string) => {
    let yes = 0;
    let no = 0;

    preOpData.forEach((item) => {
      //@ts-ignore
      const check = item.checks[day];
      if (check === "S") yes++;
      if (check === "N") no++;
    });

    return { yes, no, total: PRE_OP_ITEMS.length };
  };

  const togglePreOp = (idx: number, day: string) => {
    const newData = [...preOpData];
    //@ts-ignore
    const current = newData[idx].checks[day];
    //@ts-ignore
    newData[idx].checks[day] =
      current === null ? "S" : current === "S" ? "N" : null;
    setPreOpData(newData);
  };

  const addActionRow = () =>
    setPreOpActions([
      ...preOpActions,
      {
        id: Date.now(),
        date: "",
        item: "",
        nonConformity: "",
        action: "",
        responsible: null,
        status: "pendente",
      },
    ]);

  const updateAction = (idx: number, field: keyof ActionPlan, val: string) => {
    const newActions = [...preOpActions];
    (newActions[idx] as any)[field] = val;
    setPreOpActions(newActions);
  };

  const updateActionStatus = (idx: number, status: ActionPlan["status"]) => {
    const newActions = [...preOpActions];
    newActions[idx].status = status;
    setPreOpActions(newActions);
  };

  const addChlorineRow = () =>
    setChlorineLogs([
      ...chlorineLogs,
      {
        id: Date.now(),
        date: "",
        time: "",
        ppm: "",
        ph: "",
        observation: "",
        correctiveAction: "",
        product: "Vegan San",
      },
    ]);

  const updateChlorine = (
    idx: number,
    field: keyof ChlorineLog,
    val: string,
  ) => {
    const newLogs = [...chlorineLogs];
    (newLogs[idx] as any)[field] = val;
    setChlorineLogs(newLogs);
  };

  const addWaterRow = () =>
    setWaterLogs([
      ...waterLogs,
      {
        id: Date.now(),
        type: "Europa",
        date: "",
        tankNumber: "-",
        quantity: "",
        responsible: null,
        monitor: null,
      },
    ]);

  const updateWater = (idx: number, field: keyof WaterLog, val: any) => {
    const newLogs = [...waterLogs];
    (newLogs[idx] as any)[field] = val;
    if (field === "type") {
      newLogs[idx].tankNumber = val === "Europa" ? "-" : "";
    }
    setWaterLogs(newLogs);
  };

  const toggleReceipt = (
    idx: number,
    field: keyof ReceiptLog,
    val: boolean,
  ) => {
    const newLogs = [...receiptLogs];
    (newLogs[idx] as any)[field] = val;
    setReceiptLogs(newLogs);
  };

  const addReceiptRow = () => {
    setReceiptLogs([
      ...receiptLogs,
      {
        id: Date.now(),
        date: "",
        productType: selectedProduct,
        isCorrectProduct: null,
        isCompositionOk: null,
        isPackagingOk: null,
        isStandardOk: null,
        requirementsMet: null,
        responsible: null,
      },
    ]);
  };

  const getCurrentProduct = (productType: ProductType) => {
    return (
      CLEANING_PRODUCTS.find((p) => p.id === productType) ||
      CLEANING_PRODUCTS[0]
    );
  };

  const getFilteredLogs = () => {
    return receiptLogs.filter((log) => log.productType === selectedProduct);
  };

  const getFooterInfo = () => {
    switch (activeTab) {
      case "pre_inspecao":
        return {
          title: "Pré-Inspeção Operacional",
          code: "2.11.7",
          pop: "Cód.:2.11.7",
        };
      case "cloro_agua":
        return {
          title: "Monitoramento de Cloro e Água",
          code: "2.12.7",
          pop: "POP - 13",
        };
      case "recebimento":
        return {
          title: "Inspeção de Entrada de Materiais de Limpeza",
          code: "2.9.6",
          pop: "INSP-MAT-LIMPEZA",
        };
      default:
        return { title: "", code: "", pop: "" };
    }
  };

  const getChlorineStatus = (ppm: string) => {
    const ppmValue = parseFloat(ppm);
    if (isNaN(ppmValue)) return "neutral";
    if (ppmValue < 100) return "low";
    if (ppmValue > 200) return "high";
    return "normal";
  };

  const preOpStats = calculatePreOpStats();
  const categoryStats = getCategoryStats();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-3 sm:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-300 flex flex-col min-h-[85vh] overflow-hidden">
        {/* HEADER */}
        <div className="bg-linear-to-r from-gray-900 to-gray-800 text-white p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="w-36 h-12 bg-linear-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold rounded-lg shadow-lg">
              GrandValle
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold uppercase tracking-tight">
                {getFooterInfo().title}
              </h1>
              <span className="text-sm font-medium text-gray-300 mt-1">
                {getFooterInfo().pop}
              </span>
            </div>
            <div className="text-sm font-medium text-gray-300 text-center sm:text-right">
              <div>
                Rev:{" "}
                <span className="font-bold text-yellow-300">
                  Clebitânia Carvalho
                </span>
              </div>
              <div>02/01/2026</div>
            </div>
          </div>

          {/* TABS */}
          <div className="flex gap-1 bg-gray-800/50 p-1 rounded-xl">
            {[
              {
                id: "pre_inspecao",
                label: "📋 Pré-Inspeção & Ação",
                color: "indigo",
              },
              {
                id: "cloro_agua",
                label: "💧 Cloro & Hidrotérmico",
                color: "cyan",
              },
              {
                id: "recebimento",
                label: "📦 Recebimento Material",
                color: "orange",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex-1 py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold uppercase rounded-lg transition-all duration-300 ${activeTab === tab.id
                    ? `bg-linear-to-r from-${tab.color}-600 to-${tab.color}-700 text-white shadow-lg`
                    : "bg-transparent text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* BODY */}
        <div className="p-4 sm:p-6 flex-1 overflow-auto">
          {/* === ABA 1: PRÉ-INSPEÇÃO === */}
          {activeTab === "pre_inspecao" && (
            <div className="space-y-6">
              {/* CABEÇALHO */}
              <div className="bg-linear-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200 shadow-lg">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-indigo-100 rounded-xl">
                        <BiCalendarWeek className="text-2xl text-indigo-700" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Pré-Inspeção Operacional
                        </h2>
                        <p className="text-sm text-gray-600">
                          Controle diário das condições operacionais
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Semana */}
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <BiCalendar /> Semana de Inspeção
                        </label>
                        <input
                          type="text"
                          value={preOpInfo.week}
                          onChange={(e) =>
                            setPreOpInfo({ ...preOpInfo, week: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                          placeholder="Ex: 01 a 07 Jan"
                        />
                      </div>

                      {/* Área */}
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <BiBuilding /> Área de Inspeção
                        </label>
                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              setPreOpInfo({
                                ...preOpInfo,
                                isEmbaladora: true,
                                area: "Embaladora",
                              })
                            }
                            className={`flex-1 py-3 rounded-xl border font-medium transition-all ${preOpInfo.isEmbaladora
                                ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-md"
                                : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
                              }`}
                          >
                            Embaladora
                          </button>
                          <button
                            onClick={() =>
                              setPreOpInfo({
                                ...preOpInfo,
                                isEmbaladora: false,
                                area: "Produção",
                              })
                            }
                            className={`flex-1 py-3 rounded-xl border font-medium transition-all ${!preOpInfo.isEmbaladora
                                ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-md"
                                : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
                              }`}
                          >
                            Produção
                          </button>
                        </div>
                      </div>

                      {/* Responsável Coordenador (ASSINATURA) */}
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <BiUser /> Responsável Coordenador
                        </label>
                        <SignatureSelector
                          value={preOpInfo.coordinator}
                          onChange={handleSignatureCoordinator}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Estatísticas Gerais (Resumo) */}
                  <div className="lg:w-64">
                    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm h-full">
                      <h3 className="font-bold text-gray-900 mb-3 text-center">
                        Resumo
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Verificações:</span>{" "}
                          <span className="font-bold">
                            {preOpStats.totalChecks}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-green-700">
                          <span>Conformes:</span>{" "}
                          <span className="font-bold">
                            {preOpStats.yesCount}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-red-700">
                          <span>Não Conformes:</span>{" "}
                          <span className="font-bold">
                            {preOpStats.noCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHECKLIST VISUAL */}
              <div className="bg-white rounded-2xl border border-gray-300 shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-linear-to-r from-gray-50 to-gray-100">
                        <th className="p-4 text-left font-semibold text-gray-700 min-w-75 sticky left-0 bg-gray-50 z-20">
                          <div className="flex items-center gap-2">
                            <BiCheckCircle className="text-green-600" />
                            Itens de Verificação
                          </div>
                        </th>
                        {WEEK_DAYS.map((day) => (
                          <th
                            key={day.short}
                            className="p-3 text-center font-semibold text-gray-700 w-24"
                          >
                            {day.short}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {preOpData.map((row, idx) => (
                        <tr
                          key={row.id}
                          className="border-t border-gray-200 hover:bg-indigo-50/50 transition-colors"
                        >
                          <td className="p-4 font-medium text-gray-900 sticky left-0 bg-white z-10">
                            <div className="flex items-center gap-3">
                              <div
                                className={`px-3 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[row.category]}`}
                              >
                                {row.category}
                              </div>
                              <span>{row.item}</span>
                            </div>
                          </td>
                          {WEEK_DAYS.map((day) => (
                            <td
                              key={day.short}
                              onClick={() => togglePreOp(idx, day.short)}
                              className={`p-3 text-center cursor-pointer transition-all ${
                                //@ts-ignore
                                row.checks[day.short] === "S"
                                  ? "bg-green-50 text-green-800"
                                  : //@ts-ignore
                                  row.checks[day.short] === "N"
                                    ? "bg-red-50 text-red-800"
                                    : "hover:bg-gray-50"
                                }`}
                            >
                              {
                                //@ts-ignore
                                row.checks[day.short] === "S" ? (
                                  <BiCheckCircle className="text-green-600 text-xl mx-auto" />
                                ) : //@ts-ignore
                                  row.checks[day.short] === "N" ? (
                                    <BiXCircle className="text-red-600 text-xl mx-auto" />
                                  ) : (
                                    <span className="text-gray-300">-</span>
                                  )
                              }
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PLANO DE AÇÃO CORRETIVA */}
              <div className="bg-linear-to-r from-red-50 via-orange-50 to-amber-50 rounded-2xl border border-red-200 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-xl">
                      <BiError className="text-2xl text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-red-900 text-xl">
                        Plano de Ação Corretiva
                      </h3>
                      <p className="text-sm text-red-700">
                        Preencher quando houver "Não Conformidade" identificada
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={addActionRow}
                    className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-red-600 to-orange-600 text-white rounded-xl hover:from-red-700 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
                  >
                    <BiPlus size={20} />
                    <span className="font-semibold">Nova Ação</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {preOpActions.map((action, idx) => (
                    <div
                      key={action.id}
                      className="bg-white rounded-xl border border-red-100 p-5 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Data
                          </label>
                          <input
                            type="date"
                            value={action.date}
                            onChange={(e) =>
                              updateAction(idx, "date", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                        <div className="lg:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Item
                          </label>
                          <input
                            type="text"
                            value={action.item}
                            onChange={(e) =>
                              updateAction(idx, "item", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                            placeholder="Item não conforme"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Status
                          </label>
                          <select
                            value={action.status}
                            onChange={(e) =>
                              updateActionStatus(
                                idx,
                                e.target.value as ActionPlan["status"],
                              )
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                          >
                            <option value="pendente">Pendente</option>
                            <option value="em_andamento">Em Andamento</option>
                            <option value="concluido">Concluído</option>
                          </select>
                        </div>
                        <div className="lg:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Responsável (Assinatura)
                          </label>
                          <SignatureSelector
                            value={preOpInfo.coordinator}
                            onChange={(v) => {
                              console.log("Selecionado", v);
                              handleSignatureCoordinator(v);

                            }}
                          />

                        </div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Não Conformidade Identificada
                          </label>
                          <textarea
                            value={action.nonConformity}
                            onChange={(e) =>
                              updateAction(idx, "nonConformity", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                            placeholder="Descrição..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Ação Corretiva Proposta
                          </label>
                          <textarea
                            value={action.action}
                            onChange={(e) =>
                              updateAction(idx, "action", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                            placeholder="Ação..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* === ABA 2: CLORO E ÁGUA === */}
          {activeTab === "cloro_agua" && (
            <div className="space-y-6">
              {/* Info Produto */}
              <div className="bg-linear-to-r from-cyan-50 to-blue-50 p-5 rounded-xl border border-cyan-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <BiInfoCircle className="text-2xl text-cyan-700" />
                  <div>
                    <h3 className="font-bold text-cyan-900 text-lg">
                      Produto: {CHLORINE_PRODUCTS[0].name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {CHLORINE_PRODUCTS[0].dosage} |{" "}
                      {CHLORINE_PRODUCTS[0].type}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tabela Cloro */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <BiClipboard className="text-cyan-700" /> Monitoramento
                    Diário do Cloro
                  </h3>
                  <button
                    onClick={addChlorineRow}
                    className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-600 to-cyan-700 text-white rounded-lg hover:from-cyan-700 hover:to-cyan-800 shadow-sm"
                  >
                    <BiPlus /> Adicionar
                  </button>
                </div>
                <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-cyan-50">
                      <tr>
                        <th className="p-3 text-left">Data</th>
                        <th className="p-3 text-left">Hora</th>
                        <th className="p-3 text-left">ppm</th>
                        <th className="p-3 text-left">pH</th>
                        <th className="p-3 text-left">Observação</th>
                        <th className="p-3 text-left">Ação Corretiva</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chlorineLogs.map((log, idx) => (
                        <tr
                          key={log.id}
                          className="border-t border-gray-200 hover:bg-cyan-50/30"
                        >
                          <td className="p-3">
                            <input
                              type="date"
                              value={log.date}
                              onChange={(e) =>
                                updateChlorine(idx, "date", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded px-2 py-1"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="time"
                              value={log.time}
                              onChange={(e) =>
                                updateChlorine(idx, "time", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded px-2 py-1"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              value={log.ppm}
                              onChange={(e) =>
                                updateChlorine(idx, "ppm", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded px-2 py-1"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              value={log.ph}
                              onChange={(e) =>
                                updateChlorine(idx, "ph", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded px-2 py-1"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={log.observation}
                              onChange={(e) =>
                                updateChlorine(
                                  idx,
                                  "observation",
                                  e.target.value,
                                )
                              }
                              className="w-full border border-gray-300 rounded px-2 py-1"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={log.correctiveAction}
                              onChange={(e) =>
                                updateChlorine(
                                  idx,
                                  "correctiveAction",
                                  e.target.value,
                                )
                              }
                              className="w-full border border-gray-300 rounded px-2 py-1"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tabela Água */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <BiWater className="text-blue-700" /> Registro de Troca de
                    Água
                  </h3>
                  <button
                    onClick={addWaterRow}
                    className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-sm"
                  >
                    <BiPlus /> Adicionar
                  </button>
                </div>
                <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="p-3 text-left">Tipo</th>
                        <th className="p-3 text-left">Numero do tanque</th>
                        <th className="p-3 text-left">Data</th>
                        <th className="p-3 text-left">Qtd (L)</th>
                        <th className="p-3 text-left">Responsável</th>
                        <th className="p-3 text-left">Monitor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {waterLogs.map((log, idx) => (
                        <tr
                          key={log.id}
                          className="border-t border-gray-200 hover:bg-blue-50/30"
                        >
                          <td className="p-3">
                            <select
                              value={log.type}
                              onChange={(e) =>
                                updateWater(idx, "type", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="Europa">Europa</option>
                              <option value="Hidrotérmico">Hidrotérmico</option>
                            </select>
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={log.tankNumber}
                              disabled={log.type === "Europa"}
                              onChange={(e) =>
                                updateWater(idx, "tankNumber", e.target.value)
                              }
                              className={`w-full border border-gray-300 rounded px-2 py-1 ${log.type === "Europa" ? "bg-gray-100" : ""}`}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="date"
                              value={log.date}
                              onChange={(e) =>
                                updateWater(idx, "date", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded px-2 py-1"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={log.quantity}
                              onChange={(e) =>
                                updateWater(idx, "quantity", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded px-2 py-1"
                            />
                          </td>
                          <td className="p-3 w-32">
                            <SignatureSelector
                              value={preOpInfo.coordinator}
                              onChange={(v) => {
                                console.log("Selecionado", v);
                                handleSignatureCoordinator(v);

                              }}
                            />

                          </td>
                          <td className="p-3 w-32">
                            <SignatureSelector
                              value={preOpInfo.coordinator}
                              onChange={(v) => {
                                console.log("Selecionado", v);
                                handleSignatureCoordinator(v);

                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* === ABA 3: RECEBIMENTO === */}
          {activeTab === "recebimento" && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-sm mb-4">
                <h3 className="font-bold mb-2">Selecione o Produto:</h3>
                <div className="flex flex-wrap gap-2">
                  {CLEANING_PRODUCTS.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedProduct(prod.id as ProductType)}
                      className={`px-3 py-2 rounded-lg border text-sm ${selectedProduct === prod.id ? "bg-orange-500 text-white border-orange-600" : "bg-white text-gray-700 hover:bg-orange-50"}`}
                    >
                      {prod.icon} {prod.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden overflow-x-auto">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <BiPackage className="text-orange-600" /> Inspeção:{" "}
                    {getCurrentProduct(selectedProduct).name}
                  </h3>
                  <button
                    onClick={addReceiptRow}
                    className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 shadow-sm text-sm"
                  >
                    <BiPlus /> Adicionar
                  </button>
                </div>
                <table className="min-w-full text-sm">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="p-3 text-left">Data</th>
                      <th className="p-3 text-center">
                        Produto Correto{" "}
                        {getCurrentProduct(selectedProduct).name}?
                      </th>
                      <th className="p-3 text-center">
                        Composição{" "}
                        {getCurrentProduct(selectedProduct).composition}?
                      </th>
                      <th className="p-3 text-center">
                        {getCurrentProduct(selectedProduct).packaging} ?
                      </th>
                      <th className="p-3 text-center">
                        Padrão exigido de acordo com a exigência?
                      </th>
                      <th className="p-3 text-center">
                        O material que veio cumpre com as exigências do pedido?
                      </th>
                      <th className="p-3 text-left w-48">Responsável</th>
                      <th className="p-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredLogs().map((log, idx) => {
                      const originalIdx = receiptLogs.findIndex(
                        (l) => l.id === log.id,
                      );
                      return (
                        <tr
                          key={log.id}
                          className="border-t border-gray-200 hover:bg-orange-50/30"
                        >
                          <td className="p-3">
                            <input
                              type="date"
                              value={log.date}
                              onChange={(e) => {
                                const n = [...receiptLogs];
                                n[originalIdx].date = e.target.value;
                                setReceiptLogs(n);
                              }}
                              className="w-full border border-gray-300 rounded px-2 py-1"
                            />
                          </td>

                          {[
                            "isCorrectProduct",
                            "isCompositionOk",
                            "isPackagingOk",
                            "isStandardOk",
                            "requirementsMet",
                          ].map((field) => (
                            <td key={field} className="p-3 text-center">
                              <div className="flex justify-center gap-2">
                                <label className="flex items-center gap-1 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`${field}-${log.id}`}
                                    checked={
                                      log[field as keyof ReceiptLog] === true
                                    }
                                    onChange={() =>
                                      toggleReceipt(
                                        originalIdx,
                                        field as keyof ReceiptLog,
                                        true,
                                      )
                                    }
                                    className="accent-green-600"
                                  />
                                  <span className="text-xs">Sim</span>
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`${field}-${log.id}`}
                                    checked={
                                      log[field as keyof ReceiptLog] === false
                                    }
                                    onChange={() =>
                                      toggleReceipt(
                                        originalIdx,
                                        field as keyof ReceiptLog,
                                        false,
                                      )
                                    }
                                    className="accent-red-600"
                                  />
                                  <span className="text-xs">Não</span>
                                </label>
                              </div>
                            </td>
                          ))}

                          <td className="p-3">
                            <SignatureSelector
                              value={preOpInfo.coordinator}
                              onChange={(v) => {
                                console.log("Selecionado", v);
                                handleSignatureCoordinator(v);
                              }}
                            />
                          </td>
                          <td
                            className="p-3 text-center cursor-pointer text-red-500"
                            onClick={() =>
                              setReceiptLogs(
                                receiptLogs.filter((_, i) => i !== originalIdx),
                              )
                            }
                          >
                            <BiTrash />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
