"use client";

import { useState } from "react";


const AREAS = {
  // --- GRUPO 1: PROCESSO / MÁQUINAS (DIÁRIOS) ---
  entradaFruta: {
    id: "entradaFruta",
    title: "CONTROLE DE HIGIENIZAÇÃO - ENTRADA DA FRUTA",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dac", label: "DAC", name: "Detergente Alcalino Clorado" },
    ],
    category: "Processo/Máquinas",
  },
  maquina: {
    id: "maquina",
    title: "CONTROLE DE HIGIENIZAÇÃO - MÁQUINA",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dga", label: "DGA", name: "Detergente Desengordurante" },
    ],
    category: "Processo/Máquinas",
  },
  esteiras: {
    id: "esteiras",
    title: "CONTROLE DE HIGIENIZAÇÃO - ESTEIRAS",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dga", label: "DGA", name: "Desengordurante Alcalino" },
    ],
    category: "Processo/Máquinas",
  },
  esteirasEUA: {
    id: "esteirasEUA",
    title: "CONTROLE DE HIGIENIZAÇÃO - ESTEIRAS (EUA)",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dga", label: "DGA", name: "Desengordurante Alcalino" },
    ],
    category: "Processo/Máquinas",
  },
  tunel: {
    id: "tunel",
    title: "CONTROLE DE HIGIENIZAÇÃO - TÚNEL (americano)",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dga", label: "DGA", name: "Desengordurante Alcalino" },
    ],
    category: "Processo/Máquinas",
  },
  tunelEuropeu: {
    id: "tunelEuropeu",
    title: "CONTROLE DE HIGIENIZAÇÃO - TÚNEL (EUROPEU)",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dga", label: "DGA", name: "Desengordurante Alcalino" },
    ],
    category: "Processo/Máquinas",
  },

  // --- GRUPO 2: ÁREAS ESTRUTURAIS (DIÁRIOS) ---
  piso: {
    id: "piso",
    title: "CONTROLE DE HIGIENIZAÇÃO - PISO",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dac", label: "DAC", name: "Detergente Alcalino Clorado" },
    ],
    category: "Áreas Estruturais",
  },
  dreno: {
    id: "dreno",
    title: "CONTROLE DE HIGIENIZAÇÃO - DRENO",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dac", label: "DGA", name: "Detergente Alcalino " },
    ],
    category: "Áreas Estruturais",
  },
  refugo: {
    id: "refugo",
    title: "CONTROLE DE HIGIENIZAÇÃO - ÁREA DE REFUGO",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dac", label: "DAC", name: "Detergente Alcalino Clorado" },
    ],
    category: "Áreas Estruturais",
  },
  depositoEmbalagem: {
    id: "depositoEmbalagem",
    title: "CONTROLE DE HIGIENIZAÇÃO - DEPÓSITO DE EMBALAGEM e almoxarifado",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dac", label: "DAC", name: "Detergente Alcalino Clorado" },
    ],
    category: "Áreas Estruturais",
  },
  descarregoCaminhoes: {
    id: "descarregoCaminhoes",
    title: "CONTROLE DE HIGIENIZAÇÃO - DESCARREGO CAMINHÕES",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "va", label: "VA", name: "Vassoura" },
      { key: "sa", label: "SA", name: "Saco de Lixo" },
    ],
    category: "Áreas Estruturais",
  },

  canecas: {
    id: "canecas",
    title: "CONTROLE DE HIGIENIZAÇÃO - CANECAS",
    frequency: "QUINZENAL",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dga", label: "DGA", name: "Desengordurante Alcalino" },
    ],
    category: "Quinzenais/Mensais",
  },
  janelas: {
    id: "janelas",
    title: "CONTROLE DE HIGIENIZAÇÃO - JANELAS",
    frequency: "A CADA 15 DIAS (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dac", label: "DAC", name: "Detergente Alcalino Clorado" },
    ],
    category: "Quinzenais/Mensais",
  },
  teto: {
    id: "teto",
    title: "CONTROLE DE HIGIENIZAÇÃO - TETO",
    frequency: "A CADA 15 DIAS (em dias de processamento)",
    popCode: "POP-04",
    products: [{ key: "v", label: "V", name: "Vassoura" }],
    category: "Quinzenais/Mensais",
  },
  lampadas: {
    id: "lampadas",
    title: "CONTROLE DE HIGIENIZAÇÃO - LÂMPADAS",
    frequency: "A CADA 15 DIAS (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "p", label: "P", name: "Pano Úmido" },
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "hs", label: "HS", name: "Hipoclorito de Sódio" },
    ],
    category: "Quinzenais/Mensais",
  },
  telas: {
    id: "telas",
    title: "CONTROLE DE HIGIENIZAÇÃO - TELAS",
    frequency: "A CADA 15 DIAS (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "v", label: "V", name: "Vassoura" },
      { key: "j", label: "J", name: "Jato de água" },
    ],
    category: "Quinzenais/Mensais",
  },
  lavagemContentor: {
    id: "lavagemContentor",
    title: "CONTROLE DE HIGIENIZAÇÃO - LAVAGEM DE CONTENTOR",
    frequency: "MENSAL",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dac", label: "DAC", name: "Detergente Alcalino Clorado" },
    ],
    category: "Quinzenais/Mensais",
  },

  paleteiras: {
    id: "paleteiras",
    title: "CONTROLE DE HIGIENIZAÇÃO - PALETEIRAS",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [{ key: "s", label: "AL", name: "Álcool" }],
    category: "Equipamentos",
  },
  empilhadeiras: {
    id: "empilhadeiras",
    title: "CONTROLE DE HIGIENIZAÇÃO - EMPILHADEIRAS",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [{ key: "al", label: "S", name: "Silicone Spray" }],
    category: "Equipamentos",
  },

  baldesLixeiras: {
    id: "baldesLixeiras",
    title: "CONTROLE DE HIGIENIZAÇÃO - BALDES DE LIXO E LIXEIRAS",
    frequency: "A CADA 15 DIAS",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dac", label: "DAC", name: "Detergente Alcalino Clorado" },
    ],
    category: "Limpeza Geral",
  },
  areaExterna: {
    id: "areaExterna",
    title: "CONTROLE DE HIGIENIZAÇÃO - ÁREA EXTERNA E CALÇADAS",
    frequency: "A CADA 15 DIAS",
    popCode: "POP-04",
    products: [
      { key: "v", label: "V", name: "Vassoura" },
      { key: "j", label: "J", name: "Jato com Água" },
      { key: "p", label: "P", name: "Pá" },
      { key: "s", label: "S", name: "Saco de Lixo" },
    ],
    category: "Limpeza Geral",
  },

  // --- NOVOS ADICIONADOS (INFRAESTRUTURA E OUTROS) ---
  refeitorio: {
    id: "refeitorio",
    title: "CONTROLE DE HIGIENIZAÇÃO - REFEITÓRIO",
    frequency: "DIÁRIA (duas vezes ao dia)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dac", label: "DAC", name: "Detergente Alcalino Clorado" },
    ],
    category: "Infraestrutura",
  },
  setoresAdministrativos: {
    id: "setoresAdministrativos",
    title: "CONTROLE DE HIGIENIZAÇÃO - SETORES ADMINISTRATIVOS",
    frequency: "DIÁRIA (uma vez ao dia)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "d", label: "D", name: "Detergente Alcalino Clorado" },
      { key: "a70", label: "A70", name: "Álcool 70%" },
      { key: "sd", label: "SD", name: "Sabonete Dermol Plus" },
    ],
    category: "Infraestrutura",
  },
  contentores: {
    id: "contentores",
    title: "CONTROLE DE HIGIENIZAÇÃO - CONTENTORES",
    frequency: "MENSALMENTE",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dac", label: "DAC", name: "Detergente Alcalino Clorado" },
    ],
    category: "Infraestrutura",
  },
  balancas: {
    id: "balancas",
    title: "CONTROLE DE HIGIENIZAÇÃO - BALANÇAS",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [{ key: "a70", label: "A70", name: "Álcool 70%" }],
    category: "Equipamentos",
  },
  ventiladores: {
    id: "ventiladores",
    title: "CONTROLE DE HIGIENIZAÇÃO - VENTILADORES",
    frequency: "MENSALMENTE",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "hs", label: "HS", name: "Hipoclorito de Sódio" },
    ],
    category: "Infraestrutura",
  },
   banheiros: {
    id: "banheirosPias",
    title: "CONTROLE DE HIGIENIZAÇÃO - Banheiros e Pias",
    frequency: "DIÁRIA (duas vezes ao dia)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dac", label: "DAC", name: "Detergente Alcalino Clorado" },
    ],
    category: "Infraestrutura",
  },
   salaMaquinas: {
    id: "salaMaquinas",
    title: "Controle de higienização da sala de máquina",
    frequency: "SEMANAL",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "dac", label: "DAC", name: "Detergente Alcalino Clorado" },
    ],
    category: "Infraestrutura",
  },
   batas: {
    id: "batas",
    title: "Controle de Higienização da Batas   Packing-House",
    frequency: "DIÁRIA (em dias de processamento)",
    popCode: "POP-04",
    products: [
      { key: "al", label: "AL", name: "Água Limpa" },
      { key: "hs", label: "HS", name: "Hipoclorito de Sódio" },
    ],
    category: "Infraestrutura",
  },
  
};

type AreaKey = keyof typeof AREAS;

interface CleaningLog {
  id: number;
  date: string;
  time: string;
  checks: { [key: string]: boolean };
  signature: string | null;
}

const COMPLIANCE = {
  revisedBy: "Clebitânia Carvalho",
  revisionDate: "02/01/2026",
};


const CATEGORIES = [
  { id: "all", name: "Todas as Áreas", color: "bg-gray-100 text-gray-800" },
  {
    id: "Processo/Máquinas",
    name: "Processo/Máquinas",
    color: "bg-blue-50 text-blue-700",
  },
  {
    id: "Áreas Estruturais",
    name: "Áreas Estruturais",
    color: "bg-green-50 text-green-700",
  },
  {
    id: "Quinzenais/Mensais",
    name: "Quinzenais/Mensais",
    color: "bg-purple-50 text-purple-700",
  },
  {
    id: "Equipamentos",
    name: "Equipamentos",
    color: "bg-amber-50 text-amber-700",
  },
  {
    id: "Limpeza Geral",
    name: "Limpeza Geral",
    color: "bg-cyan-50 text-cyan-700",
  },
  {
    id: "Infraestrutura",
    name: "Infraestrutura",
    color: "bg-pink-50 text-pink-700",
  },
];

// Frequências disponíveis para filtro
const FREQUENCIES = [
  {
    id: "all",
    name: "Todas as Frequências",
    color: "bg-gray-100 text-gray-800",
  },
  { id: "DIÁRIA", name: "Diária", color: "bg-green-50 text-green-700" },
  { id: "SEMANAL", name: "Semanal", color: "bg-yellow-50 text-yellow-700" },
  { id: "QUINZENAL", name: "Quinzenal", color: "bg-blue-50 text-blue-700" },
  { id: "MENSAL", name: "Mensal", color: "bg-purple-50 text-purple-700" },
];

export default function ControleHigienizacaoMaster() {
  const [currentTab, setCurrentTab] = useState<AreaKey>("entradaFruta");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFrequency, setSelectedFrequency] = useState<string>("all");
  const [showMobileMenu, setShowMobileMenu] = useState(false);


  const [logs, setLogs] = useState<CleaningLog[]>([
    { id: 1, date: "", time: "", checks: {}, signature: null },
    { id: 2, date: "", time: "", checks: {}, signature: null },
    { id: 3, date: "", time: "", checks: {}, signature: null },
    { id: 4, date: "", time: "", checks: {}, signature: null },
  ]);

  const activeConfig = AREAS[currentTab];

  const extractFrequencyType = (frequencyText: string) => {
    const upperText = frequencyText.toUpperCase();
    if (upperText.includes("DIÁRIA") || upperText.includes("DIARIA"))
      return "DIÁRIA";
    if (upperText.includes("SEMANAL")) return "SEMANAL";
    if (upperText.includes("QUINZENAL") || upperText.includes("15 DIAS"))
      return "QUINZENAL";
    if (upperText.includes("MENSAL") || upperText.includes("MENSALMENTE"))
      return "MENSAL";
    return "OUTRA";
  };

  // Filtrar áreas por categoria E frequência
  const filteredAreas = Object.entries(AREAS).filter(([key, area]) => {
    // Filtro de categoria
    const categoryMatch =
      selectedCategory === "all" || area.category === selectedCategory;

    const frequencyType = extractFrequencyType(area.frequency);
    const frequencyMatch =
      selectedFrequency === "all" || frequencyType === selectedFrequency;

    return categoryMatch && frequencyMatch;
  });

  // Contar áreas por frequência para exibir no filtro
  const getFrequencyCount = (frequencyId: string) => {
    if (frequencyId === "all") return Object.keys(AREAS).length;

    return Object.values(AREAS).filter(
      (area) => extractFrequencyType(area.frequency) === frequencyId,
    ).length;
  };

  // Troca de aba e reset visual
  const handleTabChange = (tab: AreaKey) => {
    setCurrentTab(tab);
    setLogs([
      { id: 1, date: "", time: "", checks: {}, signature: null },
      { id: 2, date: "", time: "", checks: {}, signature: null },
      { id: 3, date: "", time: "", checks: {}, signature: null },
      { id: 4, date: "", time: "", checks: {}, signature: null },
    ]);
    setShowMobileMenu(false);
  };

  const addRow = () => {
    const newId = logs.length > 0 ? logs[logs.length - 1].id + 1 : 1;
    setLogs([
      ...logs,
      { id: newId, date: "", time: "", checks: {}, signature: null },
    ]);
  };

  const updateField = (
    index: number,
    field: keyof CleaningLog,
    value: string,
  ) => {
    const newLogs = [...logs];
    // @ts-ignore
    newLogs[index][field] = value;
    setLogs(newLogs);
  };

  const toggleCheck = (index: number, key: string) => {
    const newLogs = [...logs];
    if (!newLogs[index].checks) newLogs[index].checks = {};
    newLogs[index].checks[key] = !newLogs[index].checks[key];
    setLogs(newLogs);
  };

  // === LÓGICA DE ASSINATURA ===
  const handleRowSignature = (index: number, file: File | null) => {
    if (file) {
      const newLogs = [...logs];
      newLogs[index].signature = URL.createObjectURL(file);
      setLogs(newLogs);
    }
  };

  const signRowStandard = (index: number) => {
    const newLogs = [...logs];
    newLogs[index].signature = "/raivans.png";
    setLogs(newLogs);
  };

  const removeRowSignature = (index: number) => {
    const newLogs = [...logs];
    newLogs[index].signature = null;
    setLogs(newLogs);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-3 md:p-6 font-sans text-sm">
      <div className="max-w-7xl mx-auto">
        {/* === HEADER PRINCIPAL === */}
        <header className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-200">
          <div className="flex items-center justify-between p-4 md:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-linear-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">GV</span>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-800">
                  Controle de Higienização
                </h1>
                <p className="text-xs text-gray-500">
                  Sistema Integrado - 17 Áreas
                </p>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
                <p className="text-xs text-gray-600">Revisado por:</p>
                <p className="font-semibold text-gray-800">
                  {COMPLIANCE.revisedBy}
                </p>
              </div>
            </div>
          </div>

          {/* FILTROS DUPLOS - CATEGORIA E FREQUÊNCIA */}
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-4 md:px-6 py-4 border-t border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* FILTRO DE CATEGORIA */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 items-center gap-1">
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
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  Filtrar por Categoria
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none bg-white border-2 border-blue-200 rounded-xl py-2.5 pl-4 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm transition-all cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                    <svg
                      className="h-4 w-4 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* FILTRO DE FREQUÊNCIA */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 items-center gap-1">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Filtrar por Frequência
                </label>
                <div className="relative">
                  <select
                    value={selectedFrequency}
                    onChange={(e) => setSelectedFrequency(e.target.value)}
                    className="w-full appearance-none bg-white border-2 border-blue-200 rounded-xl py-2.5 pl-4 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm transition-all cursor-pointer"
                  >
                    {FREQUENCIES.map((freq) => (
                      <option key={freq.id} value={freq.id}>
                        {freq.name} ({getFrequencyCount(freq.id)})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                    <svg
                      className="h-4 w-4 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* INFO DOS FILTROS ATIVOS */}
            <div className="mt-4 flex flex-wrap items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600">Filtros ativos:</span>
                {selectedCategory !== "all" && (
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${CATEGORIES.find((c) => c.id === selectedCategory)?.color}`}
                  >
                    {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedFrequency !== "all" && (
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${FREQUENCIES.find((f) => f.id === selectedFrequency)?.color}`}
                  >
                    {FREQUENCIES.find((f) => f.id === selectedFrequency)?.name}
                    <button
                      onClick={() => setSelectedFrequency("all")}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  {showMobileMenu ? "Fechar Menu" : "Áreas"}
                </button>

                <div className="hidden md:flex items-center gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500">POP:</span>
                    <span className="bg-blue-600 text-white font-bold px-3 py-1 rounded-lg">
                      {activeConfig.popCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* === SIDEBAR COM ÁREAS (Menu Lateral) === */}
          <aside
            className={`lg:w-64 ${showMobileMenu ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {/* CABEÇALHO DA SIDEBAR */}
              <div className="bg-linear-to-r from-gray-800 to-gray-900 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-white font-bold text-sm uppercase tracking-wider">
                      Áreas de Controle
                    </h2>
                    <p className="text-gray-300 text-xs mt-1">
                      {filteredAreas.length} de {Object.keys(AREAS).length}{" "}
                      áreas
                    </p>
                  </div>
                  <div className="text-white text-xs bg-blue-600 px-2 py-1 rounded">
                    Filtrado
                  </div>
                </div>

                {/* CONTADORES RÁPIDOS */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="text-center bg-green-900/30 p-1 rounded">
                    <div className="text-green-300 font-bold">
                      {getFrequencyCount("DIÁRIA")}
                    </div>
                    <div className="text-green-200 text-xs">Diárias</div>
                  </div>
                  <div className="text-center bg-blue-900/30 p-1 rounded">
                    <div className="text-blue-300 font-bold">
                      {getFrequencyCount("QUINZENAL")}
                    </div>
                    <div className="text-blue-200 text-xs">Quinzenais</div>
                  </div>
                </div>
              </div>

              {/* LISTA DE ÁREAS FILTRADAS */}
              <div className="max-h-125 overflow-y-auto p-2">
                {filteredAreas.length === 0 ? (
                  <div className="text-center p-6">
                    <svg
                      className="w-12 h-12 mx-auto text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm mt-2">
                      Nenhuma área encontrada
                    </p>
                    <p className="text-gray-400 text-xs">
                      Tente alterar os filtros
                    </p>
                  </div>
                ) : (
                  filteredAreas.map(([key, area]) => {
                    const categoryColor =
                      CATEGORIES.find((c) => c.id === area.category)?.color ||
                      "bg-gray-100";
                    const frequencyType = extractFrequencyType(area.frequency);
                    const frequencyColor =
                      FREQUENCIES.find((f) => f.id === frequencyType)?.color ||
                      "bg-gray-100";

                    return (
                      <button
                        key={key}
                        onClick={() => handleTabChange(key as AreaKey)}
                        className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 ${
                          currentTab === key
                            ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-[1.02] border border-blue-300"
                            : "hover:bg-gray-50 border border-transparent hover:border-gray-200 text-gray-700"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-sm">
                            {area.title.replace(
                              "CONTROLE DE HIGIENIZAÇÃO - ",
                              "",
                            ).toUpperCase()}
                          </span>
                          {currentTab === key && (
                            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                              Ativo
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${currentTab === key ? "bg-white/20" : categoryColor}`}
                          >
                            {area.category}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${currentTab === key ? "bg-white/20" : frequencyColor}`}
                          >
                            {frequencyType.charAt(0)}
                          </span>
                        </div>

                        <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {area.frequency}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* LEGENDA */}
            <div className="mt-4 bg-white rounded-xl shadow p-4 border border-gray-200">
              <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Legenda de Produtos
              </h3>
              <div className="space-y-2">
                {activeConfig.products.map((prod) => (
                  <div
                    key={prod.key}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <span className="font-bold text-blue-700">
                          {prod.label}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700">
                          {prod.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* === CONTEÚDO PRINCIPAL === */}
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {/* CABEÇALHO DA ÁREA ATIVA */}
              <div className="bg-linear-to-r from-gray-50 to-white p-5 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${CATEGORIES.find((c) => c.id === activeConfig.category)?.color.split(" ")[0] || "bg-blue-500"}`}
                      ></div>
                      <h1 className="text-xl font-bold text-gray-800">
                        {activeConfig.title.toUpperCase()}
                      </h1>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 ${FREQUENCIES.find((f) => f.id === extractFrequencyType(activeConfig.frequency))?.color || "bg-blue-50"} rounded-full text-xs font-medium border border-gray-200`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {activeConfig.frequency}
                      </span>
                      <span className="text-xs text-gray-500">
                        Código: {activeConfig.popCode}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={addRow}
                      className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all hover:scale-105 active:scale-95"
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
                      Nova Linha
                    </button>
                  </div>
                </div>
              </div>

              {/* TABELA */}
             <div className="overflow-auto max-h-[70vh] rounded-xl border border-gray-200 shadow-sm bg-white">
  {/* Container interno com largura mínima para forçar o layout correto */}
  <div className="min-w-max">
    <table className="w-full text-left border-collapse">
      <thead className="bg-gray-50 sticky top-0 z-20 shadow-sm">
        <tr>
          {/* COLUNA FIXA: DATA */}
          <th className="py-3 px-4 font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider sticky left-0 z-30 bg-gray-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Data
            </div>
          </th>

          {/* HORÁRIO */}
          <th className="py-3 px-4 font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider bg-gray-50">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Horário
            </div>
          </th>

          {/* PRODUTOS (Largura mínima para não quebrar checkboxes) */}
          <th className="py-3 px-4 font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider min-w-75 bg-gray-50">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              Produtos Utilizados
            </div>
          </th>

          {/* ASSINATURA */}
          <th className="py-3 px-4 font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider min-w-55 bg-gray-50">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Assinatura
            </div>
          </th>
        </tr>
      </thead>
      
      <tbody className="divide-y divide-gray-100 bg-white">
        {logs.map((log, index) => (
          <tr key={log.id} className="hover:bg-gray-50 transition-colors group">
            
            {/* COLUNA DATA FIXA */}
            <td className="py-3 px-4 sticky left-0 z-10 bg-white group-hover:bg-gray-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-gray-100">
              <input
                type="date"
                value={log.date}
                onChange={(e) => updateField(index, "date", e.target.value)}
                className="w-32.5 bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </td>

            {/* HORÁRIO */}
            <td className="py-3 px-4">
              <input
                type="time"
                value={log.time}
                onChange={(e) => updateField(index, "time", e.target.value)}
                className="w-25 bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </td>

            {/* PRODUTOS */}
            <td className="py-3 px-4">
              <div className="flex flex-wrap gap-3">
                {activeConfig.products.map((prod) => (
                  <label key={prod.key} className="flex items-center gap-2 cursor-pointer group/checkbox bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded-md border border-transparent hover:border-gray-200 transition-all">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={log.checks?.[prod.key] || false}
                        onChange={() => toggleCheck(index, prod.key)}
                        className="sr-only peer"
                      />
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all
                        ${log.checks?.[prod.key]
                          ? "bg-blue-500 border-blue-500"
                          : "bg-white border-gray-300 group-hover/checkbox:border-blue-400"
                        }`}
                      >
                        {log.checks?.[prod.key] && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className={`font-medium text-xs sm:text-sm transition-colors ${log.checks?.[prod.key] ? "text-blue-700" : "text-gray-700"}`}>
                        {prod.label}
                      </span>
                      {prod.name && <span className="text-[10px] text-gray-500 hidden sm:block">{prod.name}</span>}
                    </div>
                  </label>
                ))}
              </div>
            </td>

            {/* ASSINATURA */}
            <td className="py-3 px-4">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                {log.signature ? (
                  <div className="relative group/sig">
                    <img
                      src={log.signature}
                      alt="Assinatura"
                      className="h-10 w-24 sm:w-32 object-contain border border-gray-200 rounded-lg bg-white p-1"
                    />
                    <button
                      onClick={() => removeRowSignature(index)}
                      className="
                        absolute -top-2 -right-2 
                        w-6 h-6 
                        bg-red-500 text-white rounded-full 
                        flex items-center justify-center text-xs 
                        shadow-md hover:bg-red-600 cursor-pointer z-20
                        transition-opacity duration-200
                        opacity-100 lg:opacity-0 lg:group-hover/sig:opacity-100
                      "
                      title="Remover"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => signRowStandard(index)}
                      className="px-3 py-1.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs font-medium hover:shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Eu
                    </button>
                    <label className="px-3 py-1.5 bg-linear-to-r from-gray-100 to-gray-50 text-gray-700 rounded-lg text-xs font-medium hover:shadow-md transition-all flex items-center gap-1.5 border border-gray-200 cursor-pointer hover:bg-gray-100 whitespace-nowrap">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Up
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleRowSignature(index, e.target.files?.[0] || null)}
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
              <div className="bg-linear-to-r from-gray-50 to-gray-100 p-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Total de registros:{" "}
                    <span className="font-bold text-gray-700">
                      {logs.length}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Última revisão:{" "}
                    <span className="font-semibold">
                      {COMPLIANCE.revisionDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* === RODAPÉ GLOBAL === */}
        <footer className="mt-6 bg-linear-to-r from-gray-900 to-black text-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 md:p-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="font-bold">GV</span>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    GrandValle - Sistema de Controle de Higienização
                  </p>
                  <p className="text-xs text-gray-300">
                    © 2026 - Todos os direitos reservados
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-gray-300">Revisado por</p>
                  <p className="font-bold text-yellow-300">
                    {COMPLIANCE.revisedBy}
                  </p>
                </div>
                <div className="h-8 w-px bg-gray-700"></div>
                <div className="text-center">
                  <p className="text-xs text-gray-300">Código POP</p>
                  <p className="font-bold text-white bg-blue-600 px-3 py-1 rounded-lg">
                    {activeConfig.popCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
