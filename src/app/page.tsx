"use client";

import { useState } from "react";
import {
  FaThermometerHalf,
  FaFlask,
  FaChartLine,
  FaAppleAlt,
  FaUserCheck,
  FaBroom,
  FaSnowflake,
  FaPlus,
  FaSearch,
  FaFilter,
  FaDownload,
  FaRegCalendarAlt,
  FaChartBar,
  FaClipboardCheck,
  FaIndustry,
  FaClipboardList,
  FaRulerCombined,
  FaLeaf,
} from "react-icons/fa";
import { MdOutlineWaterDrop } from "react-icons/md";

const SYSTEMS = [
  {
    id: "limpeza-hidrotermico",
    title: "Controle de Limpeza do Hidrotérmico",
    description: "Monitoramento diário dos tanques e equipamentos",
    icon: <FaThermometerHalf />,
    color: "bg-gradient-to-r from-emerald-500 to-teal-600",
    category: "Processamento",
    lastUpdated: "Hoje, 14:30",
    status: "active",
    popCode: "POP-14",
    completion: 92,
  },
  {
    id: "higienizacao-acido-peracetico",
    title: "Higienização com Ácido Peracético",
    description: "Controle de dosagem e aplicação por setor",
    icon: <FaFlask />,
    color: "bg-gradient-to-r from-indigo-500 to-purple-600",
    category: "Química",
    lastUpdated: "Hoje, 09:15",
    status: "active",
    popCode: "POP-13",
    completion: 87,
  },
  {
    id: "monitoramento-acido-peracetico",
    title: "Monitoramento de Ácido Peracético",
    description: "Análise de concentração e ações corretivas",
    icon: <FaChartLine />,
    color: "bg-gradient-to-r from-blue-500 to-cyan-600",
    category: "Monitoramento",
    lastUpdated: "Hoje, 11:45",
    status: "active",
    popCode: "POP-13",
    completion: 95,
  },
  {
    id: "lavagem-fruta",
    title: "Controle de Lavagem de Frutas",
    description: "Registro de troca de água e temperatura",
    icon: <FaAppleAlt />,
    color: "bg-gradient-to-r from-green-500 to-emerald-600",
    category: "Processamento",
    lastUpdated: "Ontem, 16:20",
    status: "active",
    popCode: "POP-13",
    completion: 89,
  },
  {
    id: "monitorameto-conduta",
    title: "Monitoramento de Conduta e Saúde",
    description: "Checklist diário de boas práticas",
    icon: <FaUserCheck />,
    color: "bg-gradient-to-r from-red-500 to-orange-600",
    category: "Qualidade",
    lastUpdated: "Hoje, 08:00",
    status: "active",
    popCode: "POP-02",
    completion: 78,
  },
  {
    id: "higienizacao-geral",
    title: "Higienização Geral - Master",
    description: "Controle de 26 áreas diferentes",
    icon: <FaBroom />,
    color: "bg-gradient-to-r from-gray-700 to-gray-900",
    category: "Limpeza",
    lastUpdated: "Hoje, 13:00",
    status: "active",
    popCode: "POP-04",
    completion: 84,
  },
  {
    id: "limpeza-camaraFria",
    title: "Limpeza de Câmaras Frias",
    description: "Controle diário e quinzenal",
    icon: <FaSnowflake />,
    color: "bg-gradient-to-r from-blue-400 to-blue-700",
    category: "Armazenamento",
    lastUpdated: "Hoje, 10:30",
    status: "active",
    popCode: "POP-05-01",
    completion: 91,
  },
  //novo
  
  {
    id: "registro-acontecimentos",
    title: "Registro de Acontecimento",
    description: "Registro de ocorrências e eventos importantes",
    icon: <FaClipboardList />,
    color: "bg-gradient-to-r from-amber-500 to-orange-600",
    category: "Qualidade",
    lastUpdated: "Sistema novo",
    status: "new",
    popCode: "POP-06",
    completion: 0,
  },
  {
    id: "calibracao",
    title: "PROCEDIMENTO DE CALIBRAÇÃO",
    description: "Controle e registro de calibração de equipamentos",
    icon: <FaRulerCombined />,
    color: "bg-gradient-to-r from-violet-500 to-purple-600",
    category: "Manutenção",
    lastUpdated: "Sistema novo",
    status: "new",
    popCode: "POP-07",
    completion: 0,
  },
  {
    id: "ControleGeralQualidade",
    title: "Controle Geral Qualidade",
    description: "Sistema integrado de controle de qualidade",
    icon: <FaClipboardCheck />,
    color: "bg-gradient-to-r from-green-600 to-emerald-700",
    category: "Qualidade",
    lastUpdated: "Sistema novo",
    status: "new",
    popCode: "POP-08",
    completion: 0,
  },
  {
    id: "inspecao",
    title: "Controle De Inspeção",
    description: "Inspeções periódicas e verificações",
    icon: <FaSearch />,
    color: "bg-gradient-to-r from-blue-600 to-indigo-700",
    category: "Qualidade",
    lastUpdated: "Sistema novo",
    status: "new",
    popCode: "POP-09",
    completion: 0,
  },
  {
    id: "registros",
    title: "Controle De Pós-Colheita",
    description: "Registro de tratamentos pós-colheita de manga",
    icon: <FaLeaf />,
    color: "bg-gradient-to-r from-teal-500 to-green-600",
    category: "Processamento",
    lastUpdated: "Sistema novo",
    status: "new",
    popCode: "POP-10",
    completion: 0,
  },
];

const CATEGORIES = [
  { id: "all", name: "Todos", color: "bg-gray-100 text-gray-800" },
  {
    id: "Processamento",
    name: "Processamento",
    color: "bg-green-100 text-green-800",
  },
  { id: "Limpeza", name: "Limpeza", color: "bg-blue-100 text-blue-800" },
  {
    id: "Monitoramento",
    name: "Monitoramento",
    color: "bg-purple-100 text-purple-800",
  },
  { id: "Qualidade", name: "Qualidade", color: "bg-red-100 text-red-800" },
  {
    id: "Armazenamento",
    name: "Armazenamento",
    color: "bg-cyan-100 text-cyan-800",
  },
  { id: "Química", name: "Química", color: "bg-indigo-100 text-indigo-800" },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSystem, setNewSystem] = useState({
    title: "",
    description: "",
    category: "Processamento",
    popCode: "", 
  });

  const filteredSystems = SYSTEMS.filter((system) => {
    const matchesSearch =
      system.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      system.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      system.popCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || system.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalSystems = SYSTEMS.length;
  const activeSystems = SYSTEMS.filter((s) => s.status === "active").length;
 
  const avgCompletion = Math.round(
    SYSTEMS.reduce((acc, system) => acc + system.completion, 0) /
      SYSTEMS.length,
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden border border-gray-200">
          <div className="p-8 bg-linear-to-r from-gray-900 to-black">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-blue-500 to-cyan-600 flex items-center justify-center">
                  <FaIndustry className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    GrandValle Certifications
                  </h1>
                  <p className="text-gray-300 mt-2">
                    Sistema Integrado de Controle e Monitoramento Industrial
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl">
                  <p className="text-gray-300 text-sm">Sistemas Ativos</p>
                  <p className="text-white font-bold text-3xl">
                    {activeSystems}/{totalSystems}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total de Sistemas</p>
                <p className="text-3xl font-bold text-gray-800">
                  {totalSystems}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Sistemas integrados
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <FaClipboardCheck className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar sistemas, códigos POP ou descrições..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>


              
            </div>
          </div>
          {/* CATEGORIAS */}
          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.slice(1).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedCategory === cat.id ? "ring-2 ring-blue-500 ring-offset-2" : ""} ${cat.color}`}
              >
                {cat.name} (
                {SYSTEMS.filter((s) => s.category === cat.id).length})
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            Sistemas de Controle
            <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredSystems.length} sistemas encontrados
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSystems.map((system) => (
              <a
                key={system.id}
                href={`/${system.id}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group transform hover:-translate-y-1"
              >
                <div className={`h-3 ${system.color}`}></div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl text-white ${system.color}`}
                    >
                      {system.icon}
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        {system.popCode}
                      </span>
                      <div
                        className={`mt-2 text-xs px-2 py-1 rounded-full ${system.status === "active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {system.status === "active" ? "● Ativo" : "● Novo"}
                      </div>
                    </div>
                  </div>

                  {/* TÍTULO E DESCRIÇÃO */}
                  <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {system.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {system.description}
                  </p>

                  {/* INFORMAÇÕES DO SISTEMA */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Categoria:</span>
                      <span>{system.category}</span>
                    </div>
                    
                  </div>

                  {/* RODAPÉ DO CARD */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-gray-500">
                        <FaRegCalendarAlt className="text-gray-400" />
                        <span>{system.lastUpdated}</span>
                      </div>
                      <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                        Acessar →
                      </button>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* === RODAPÉ === */}
        <footer className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-r from-gray-900 to-black flex items-center justify-center">
                <span className="font-bold text-white text-lg">GV</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">
                  GrandValle Industries
                </h3>
                <p className="text-gray-600 text-sm">
                  Sistema de Certificações e Controle de Qualidade
                </p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm">Versão do Sistema</p>
              <p className="font-bold text-gray-800">
                v3.2.1 • Atualizado em {new Date().toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* === MODAL PARA ADICIONAR NOVO SISTEMA === */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Adicionar Novo Sistema
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Configure um novo sistema de controle para sua operação.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Sistema *
                  </label>
                  <input
                    type="text"
                    value={newSystem.title}
                    onChange={(e) =>
                      setNewSystem({ ...newSystem, title: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Controle de Temperatura"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    value={newSystem.description}
                    onChange={(e) =>
                      setNewSystem({
                        ...newSystem,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Breve descrição do propósito do sistema"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoria
                    </label>
                    <select
                      value={newSystem.category}
                      onChange={(e) =>
                        setNewSystem({ ...newSystem, category: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {CATEGORIES.slice(1).map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Código POP *
                    </label>
                    <input
                      type="text"
                      value={newSystem.popCode}
                      onChange={(e) =>
                        setNewSystem({ ...newSystem, popCode: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: POP-01"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
