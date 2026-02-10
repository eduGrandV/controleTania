"use client";

import { SignatureSelector } from "@/src/components/SignatureSelector";
import { Signature } from "lucide-react";
import { useState } from "react";
import {
  BiCalendar,
  BiCheckCircle,
  BiPlus,
  BiUpload,
  BiUser,
  BiUserCheck,
  BiX,
} from "react-icons/bi";
import { FiAlertTriangle, FiFileText, FiX } from "react-icons/fi";


const COMMON_ISSUES = [
  "Objetos estranhos no processo",
  "Derramamento de produtos químicos",
  "Material de embalagem rejeitado",
  "Vidro quebrado ou trincado",
  "Falta de energia",
  "Esteira quebrada",
  "Portas quebradas ou fechadura com problema",
  "Falta de água",
  "Vazamento de amônia na câmara fria",
];

interface EventLog {
  id: number;
  date: string;
  description: string;
  correctiveAction: string;
  signatureCorrection: string | null;
  signaturePacking: string | null;
  status: "pendente" | "em-andamento" | "concluido";
}

const COMPLIANCE = {
  title: "REGISTRO DE ACONTECIMENTOS INUSUAIS",
  subtitle: "E AÇÕES CORRETIVAS",
  code: "2.8.8",
  revisedBy: "Clebitânia Carvalho",
};

export default function RegistroAcontecimentos() {
  const [logs, setLogs] = useState<EventLog[]>([
    {
      id: 1,
      date: "",
      description: "",
      correctiveAction: "",
      signatureCorrection: null,
      signaturePacking: null,
      status: "pendente",
    },
  ]);

  const addLog = () => {
    const newId = logs.length > 0 ? Math.max(...logs.map((l) => l.id)) + 1 : 1;
    setLogs([
      ...logs,
      {
        id: newId,
        date: new Date().toISOString().split("T")[0],
        description: "",
        correctiveAction: "",
        signatureCorrection: null,
        signaturePacking: null,
        status: "pendente",
      },
    ]);
  };

  const removeLog = (id: number) => {
    if (logs.length > 1) {
      setLogs(logs.filter((log) => log.id !== id));
    }
  };

  const updateField = (
    index: number,
    field: keyof EventLog,
    value: string | "pendente" | "em-andamento" | "concluido",
  ) => {
    const newLogs = [...logs];
    // @ts-ignore
    newLogs[index][field] = value;

    // Atualizar status automaticamente baseado em assinaturas
    if (field === "signatureCorrection" || field === "signaturePacking") {
      const log = newLogs[index];
      if (log.signatureCorrection && log.signaturePacking) {
        log.status = "concluido";
      } else if (log.signatureCorrection || log.signaturePacking) {
        log.status = "em-andamento";
      }
    }

    setLogs(newLogs);
  };

  const handleSignature = (
    index: number,
    field: "signatureCorrection" | "signaturePacking",
    file: File | null,
  ) => {
    if (file) {
      const newLogs = [...logs];
      newLogs[index][field] = URL.createObjectURL(file);

      // Atualizar status
      const log = newLogs[index];
      if (log.signatureCorrection && log.signaturePacking) {
        log.status = "concluido";
      } else if (log.signatureCorrection || log.signaturePacking) {
        log.status = "em-andamento";
      }

      setLogs(newLogs);
    }
  };

  const signStandard = (
    index: number,
    field: "signatureCorrection" | "signaturePacking",
  ) => {
    const newLogs = [...logs];
    newLogs[index][field] = "/raivans.png";

    // Atualizar status
    const log = newLogs[index];
    if (log.signatureCorrection && log.signaturePacking) {
      log.status = "concluido";
    } else if (log.signatureCorrection || log.signaturePacking) {
      log.status = "em-andamento";
    }

    setLogs(newLogs);
  };


  const getStatusColor = (status: EventLog["status"]) => {
    switch (status) {
      case "pendente":
        return "bg-red-100 text-red-800 border-red-200";
      case "em-andamento":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "concluido":
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const getStatusIcon = (status: EventLog["status"]) => {
    switch (status) {
      case "pendente":
        return <FiAlertTriangle size={14} />;
      case "em-andamento":
        return <FiFileText size={14} />;
      case "concluido":
        return <BiCheckCircle size={14} />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-3 sm:p-4 md:p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* === HEADER PRINCIPAL === */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl p-5 sm:p-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <FiAlertTriangle className="text-white" size={24} />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      {COMPLIANCE.title}
                    </h1>
                    <p className="text-red-100 text-sm sm:text-base">
                      {COMPLIANCE.subtitle} • {COMPLIANCE.code}
                    </p>
                  </div>
                </div>
                <p className="text-white/90 text-sm mt-3">
                  Registro de ocorrências fora do padrão operacional e suas
                  respectivas correções
                </p>
              </div>

            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* === COLUNA PRINCIPAL === */}
          <div className="flex-1 space-y-6">
            {/* RESUMO DE STATUS */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                    Resumo de Ocorrências
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {logs.length} {logs.length === 1 ? "registro" : "registros"}{" "}
                    no sistema
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-gray-700">
                      {logs.filter((l) => l.status === "pendente").length}{" "}
                      Pendente
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-gray-700">
                      {logs.filter((l) => l.status === "em-andamento").length}{" "}
                      Em Andamento
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-700">
                      {logs.filter((l) => l.status === "concluido").length}{" "}
                      Concluído
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FORMULÁRIOS DE REGISTRO */}
            {logs.map((log, index) => (
              <div
                key={log.id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* HEADER DO CARD */}
                <div className="bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${getStatusColor(log.status)}`}
                      >
                        {getStatusIcon(log.status)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">
                          Ocorrência #{String(log.id).padStart(3, "0")}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                          <BiCalendar size={12} />
                          {log.date || "Data não definida"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(log.status)}`}
                      >
                        {log.status === "pendente"
                          ? "Pendente"
                          : log.status === "em-andamento"
                            ? "Em Andamento"
                            : "Concluído"}
                      </div>
                      {logs.length > 1 && (
                        <button
                          onClick={() => removeLog(log.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiX size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* CORPO DO FORMULÁRIO */}
                <div className="p-4 sm:p-6 space-y-5">
                  {/* Data da Ocorrência */}
                  <div>
                    <label className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-2">
                      <BiCalendar size={16} />
                      Data da Ocorrência
                    </label>
                    <input
                      type="date"
                      value={log.date}
                      onChange={(e) =>
                        updateField(index, "date", e.target.value)
                      }
                      className="w-full text-black md:w-64 bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Descrição do Problema */}
                  <div className="bg-linear-to-r from-red-50 to-red-100/30 border-l-4 border-red-500 rounded-r-lg p-4">
                    <label className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                      <FiAlertTriangle size={16} className="text-red-600" />
                      Descrição do Problema ou Situação
                    </label>
                    <textarea
                      className="w-full h-32 text-black bg-white border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                      placeholder="Descreva detalhadamente o que aconteceu, incluindo local, horário, pessoas envolvidas e circunstâncias..."
                      value={log.description}
                      onChange={(e) =>
                        updateField(index, "description", e.target.value)
                      }
                    />
                    <div className="text-xs text-gray-500 mt-2">
                      Seja específico e detalhado para facilitar a análise
                    </div>
                  </div>

                  {/* Ação Corretiva */}
                  <div className="bg-linear-to-r from-green-50 to-green-100/30 border-l-4 border-green-500 rounded-r-lg p-4">
                    <label className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                      <BiCheckCircle size={16} className="text-green-600" />
                      Ação Corretiva Tomada
                    </label>
                    <textarea
                      className="w-full h-32 text-black bg-white border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                      placeholder="Descreva as medidas tomadas para corrigir a situação, incluindo prazos, responsáveis e recursos utilizados..."
                      value={log.correctiveAction}
                      onChange={(e) =>
                        updateField(index, "correctiveAction", e.target.value)
                      }
                    />
                    <div className="text-xs text-gray-500 mt-2">
                      Descreva ações imediatas e preventivas
                    </div>
                  </div>

                  {/* ÁREA DE ASSINATURAS */}
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
                      <BiUserCheck size={16} />
                      Validação e Assinaturas
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Responsável pela Correção */}
                      <div className="bg-linear-to-b from-gray-50 to-white rounded-xl border border-gray-200 p-5">
                        <div className="text-center mb-4">
                          <div className="font-bold text-gray-900 text-sm mb-1">
                            Responsável pela Correção
                          </div>
                          <div className="text-xs text-gray-500">
                            Quem executou a ação corretiva
                          </div>
                        </div>

                        <div className="h-24 border-2 border-dashed border-gray-300 rounded-lg bg-white flex items-center justify-center relative group">
                          <SignatureSelector
                            value={log.signatureCorrection}
                            onChange={(n) => updateField(index, "signatureCorrection", n || '')}
                          />
                        </div>
                      </div>

                      {/* Responsável pelo Packing */}
                      <div className="bg-linear-to-b from-gray-50 to-white rounded-xl border border-gray-200 p-5">
                        <div className="text-center mb-4">
                          <div className="font-bold text-gray-900 text-sm mb-1">
                            Responsável pelo Packing
                          </div>
                          <div className="text-xs text-gray-500">
                            Supervisor da área afetada
                          </div>
                        </div>

                        <div className="h-24 border-2 border-dashed border-gray-300 rounded-lg bg-white flex items-center justify-center relative group">
                          <SignatureSelector
                            value={log.signaturePacking}
                            onChange={(n) => updateField(index, "signaturePacking", n || '')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* BOTÃO PARA ADICIONAR NOVO REGISTRO */}
            <button
              onClick={addLog}
              className="w-full bg-linear-to-r from-gray-50 to-white border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-red-400 hover:bg-red-50 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <BiPlus className="text-red-600" size={24} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">
                    Registrar Nova Ocorrência
                  </div>
                  <div className="text-gray-600 text-sm">
                    Clique para adicionar um novo registro de acontecimento
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* === SIDEBAR DE AJUDA === */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-5 sticky  text-white">
              <h3 className="font-bold text-white text-lg mb-4">
                Informações do Documento
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-300 mb-1">Revisado por</div>
                  <div className="text-lg font-semibold text-yellow-400">
                    {COMPLIANCE.revisedBy}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-700">
                  <div className="text-sm text-gray-300 mb-1">
                    Código do POP
                  </div>
                  <div className="text-lg font-bold">POP-11</div>
                </div>

                <div className="pt-3 border-t border-gray-700">
                  <div className="text-sm text-gray-300 mb-1">
                    Última Atualização
                  </div>
                  <div className="text-sm font-medium">
                    {new Date().toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>
            </div>
            {/* EXEMPLOS DE SITUAÇÕES */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 sticky top-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <FiAlertTriangle className="text-red-600" size={20} />
                Exemplos Comuns
              </h3>
              <div className="space-y-3">
                {COMMON_ISSUES.map((issue, i) => (
                  <div
                    key={i}
                    className="p-3 bg-linear-to-r from-gray-50 to-gray-100/50 rounded-lg border border-gray-200 hover:border-red-300 transition-colors group"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                      <div className="text-sm text-gray-900 font-medium">
                        {issue}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-linear-to-r from-blue-50 to-blue-100/30 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-blue-900 mb-1">
                  📝 Importante
                </div>
                <div className="text-xs text-blue-800">
                  Este formulário deve ser preenchido sempre que ocorrer algo
                  fora do padrão operacional, garantindo rastreabilidade e
                  aprendizado contínuo.
                </div>
              </div>
            </div>

            {/* INFORMAÇÕES DE COMPLIANCE */}
          </div>
        </div>

        {/* === RODAPÉ === */}
        <div className="mt-8 pt-6 border-t border-gray-300">
          <div className="text-center text-gray-500 text-sm">
            <p>
              GrandValle © {new Date().getFullYear()} - Documento: POP-11 -
              Registro de Acontecimentos Inusuais
            </p>
            <p className="mt-1">
              Última revisão:{" "}
              {new Date().toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
