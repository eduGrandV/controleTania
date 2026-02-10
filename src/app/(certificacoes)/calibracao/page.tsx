"use client";

import { SignatureSelector } from "@/src/components/SignatureSelector";
import { useState } from "react";
import {
  BiCheckCircle,
  BiError,
  BiWrench,
  BiWater,
  BiCalendar,
  BiUserCheck,
  BiPlus,
  BiUpload,
  BiX,
} from "react-icons/bi";

const CHECKLISTS = {
  contaminacao: {
    id: "contaminacao",
    title: "MONITORAMENTO DE CONTAMINAÇÃO (LUBRIFICANTES/QUÍMICOS)",
    frequency: "SEMANAL",
    icon: BiWater,
    items: [
      "Limpeza bem realizada",
      "Sanitização bem realizada",
      "Resíduos de poeira ou alguma sujeira",
      "Resíduos de agentes de limpeza ou sanitização",
      "Presença de graxas ou afins nas esteiras, teleférico",
      "Presença de graxas ou afins nas balanças",
      "Presença de graxas ou afins em correntes",
      "Presença de graxas ou afins em utensílios",
      "Presença de graxas em alguma área do hidrotérmico",
    ],
  },
  preventiva: {
    id: "preventiva",
    title: "MANUTENÇÃO PREVENTIVA DE EQUIPAMENTOS",
    frequency: "MENSAL",
    icon: BiWrench,
    items: [
      "Desprendimento de peças nas esteiras, teleférico",
      "Desprendimento de peças em alguma parte do hidrotérmico",
      "Esteiras em bom funcionamento",
      "Painel de controle das esteiras em bom funcionamento",
      "Balanças, patinhas e empilhadeiras em bom funcionamento",
    ],
  },
};

interface InspectionColumn {
  id: number;
  date: string;
  checks: { [rowIndex: number]: string };
  correctiveAction: string;
  signature: string | null;
}

interface RepairLog {
  id: number;
  date: string;
  equipment: string;
  reason: string;
  correctiveAction: string;
  requester: string;
  provider: string;
  cleanedAfter: boolean | null;
  signatureResponsible: string | null;
  signatureSupervisor: string | null;
}

const COMPLIANCE = {
  code: "POP-2.9.6",
  title: "PROCEDIMENTO DE MANUTENÇÃO E LIMPEZA PREVENTIVA",
  revisedBy: "Clebitânia Carvalho",
  revisionDate: "02/01/2026",
};

export default function ManutencaoEquipamentos() {
  const [activeTab, setActiveTab] = useState<
    "contaminacao" | "preventiva" | "reparos"
  >("contaminacao");
  const [inspectionsContaminacao, setInspectionsContaminacao] = useState<
    InspectionColumn[]
  >([
    {
      id: 1,
      date: new Date().toISOString().split("T")[0],
      checks: {},
      correctiveAction: "",
      signature: null,
    },
    { id: 2, date: "", checks: {}, correctiveAction: "", signature: null },
  ]);

  const [inspectionsPreventiva, setInspectionsPreventiva] = useState<
    InspectionColumn[]
  >([
    {
      id: 1,
      date: new Date().toISOString().split("T")[0],
      checks: {},
      correctiveAction: "",
      signature: null,
    },
    { id: 2, date: "", checks: {}, correctiveAction: "", signature: null },
  ]);

  const [repairLogs, setRepairLogs] = useState<RepairLog[]>([
    {
      id: 1,
      date: new Date().toISOString().split("T")[0],
      equipment: "",
      reason: "",
      correctiveAction: "",
      requester: "",
      provider: "",
      cleanedAfter: null,
      signatureResponsible: null,
      signatureSupervisor: null,
    },
  ]);

  const handleCheck = (
    type: "contaminacao" | "preventiva",
    colIndex: number,
    rowIndex: number,
  ) => {
    const stateSetter =
      type === "contaminacao"
        ? setInspectionsContaminacao
        : setInspectionsPreventiva;
    const currentState =
      type === "contaminacao" ? inspectionsContaminacao : inspectionsPreventiva;

    const newInspections = [...currentState];
    const currentVal = newInspections[colIndex].checks[rowIndex];

    let nextVal = "S";
    if (currentVal === "S") nextVal = "N";
    if (currentVal === "N") nextVal = "";

    newInspections[colIndex].checks[rowIndex] = nextVal;
    stateSetter(newInspections);
  };

  const updateColumnField = (
    type: "contaminacao" | "preventiva",
    colIndex: number,
    field: keyof InspectionColumn,
    value: string,
  ) => {
    const stateSetter =
      type === "contaminacao"
        ? setInspectionsContaminacao
        : setInspectionsPreventiva;
    const currentState =
      type === "contaminacao" ? inspectionsContaminacao : inspectionsPreventiva;
    const newInspections = [...currentState];
    // @ts-ignore
    newInspections[colIndex][field] = value;
    stateSetter(newInspections);
  };

  const addColumn = (type: "contaminacao" | "preventiva") => {
    const stateSetter =
      type === "contaminacao"
        ? setInspectionsContaminacao
        : setInspectionsPreventiva;
    const currentState =
      type === "contaminacao" ? inspectionsContaminacao : inspectionsPreventiva;
    const newId = currentState.length + 1;
    stateSetter([
      ...currentState,
      {
        id: newId,
        date: new Date().toISOString().split("T")[0],
        checks: {},
        correctiveAction: "",
        signature: null,
      },
    ]);
  };

  const removeColumn = (
    type: "contaminacao" | "preventiva",
    columnId: number,
  ) => {
    const stateSetter =
      type === "contaminacao"
        ? setInspectionsContaminacao
        : setInspectionsPreventiva;
    const currentState =
      type === "contaminacao" ? inspectionsContaminacao : inspectionsPreventiva;
    if (currentState.length > 2) {
      stateSetter(currentState.filter((col) => col.id !== columnId));
    }
  };

  const handleColumnSignature = (
    type: "contaminacao" | "preventiva",
    colIndex: number,
    file: File | null,
  ) => {
    if (file) {
      const stateSetter =
        type === "contaminacao"
          ? setInspectionsContaminacao
          : setInspectionsPreventiva;
      const currentState =
        type === "contaminacao"
          ? inspectionsContaminacao
          : inspectionsPreventiva;
      const newInspections = [...currentState];
      newInspections[colIndex].signature = URL.createObjectURL(file);
      stateSetter(newInspections);
    }
  };

  1;

  const addRepairLog = () => {
    const newId = repairLogs.length + 1;
    setRepairLogs([
      ...repairLogs,
      {
        id: newId,
        date: new Date().toISOString().split("T")[0],
        equipment: "",
        reason: "",
        correctiveAction: "",
        requester: "",
        provider: "",
        cleanedAfter: null,
        signatureResponsible: null,
        signatureSupervisor: null,
      },
    ]);
  };

  const removeRepairLog = (id: number) => {
    if (repairLogs.length > 1) {
      setRepairLogs(repairLogs.filter((log) => log.id !== id));
    }
  };

  const updateRepairField = (
    index: number,
    field: keyof RepairLog,
    value: any,
  ) => {
    const newLogs = [...repairLogs];
    // @ts-ignore
    newLogs[index][field] = value;
    setRepairLogs(newLogs);
  };

  const handleRepairSignature = (
    index: number,
    field: "signatureResponsible" | "signatureSupervisor",
    file: File | null,
  ) => {
    if (file) {
      const newLogs = [...repairLogs];
      newLogs[index][field] = URL.createObjectURL(file);
      setRepairLogs(newLogs);
    }
  };

  const signRepairStandard = (
    index: number,
    field: "signatureResponsible" | "signatureSupervisor",
  ) => {
    const newLogs = [...repairLogs];
    newLogs[index][field] = "/raivans.png";
    setRepairLogs(newLogs);
  };

  const renderChecklistTable = (type: "contaminacao" | "preventiva") => {
    const config = CHECKLISTS[type];
    const data =
      type === "contaminacao" ? inspectionsContaminacao : inspectionsPreventiva;
    const Icon = config.icon;

    return (
      <div className="space-y-4">
        <div className="bg-linear-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Icon className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="font-bold text-black text-lg">{config.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                  {config.frequency}
                </div>
                <span className="text-sm text-gray-600">
                  • {data.length} inspeções registradas
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="p-4 text-left font-bold text-black min-w-75">
                    <span className="flex items-center gap-2">
                      <BiCheckCircle size={16} className="text-gray-700" />
                      Descrição / Itens
                    </span>
                  </th>
                  {data.map((col) => (
                    <th
                      key={col.id}
                      className="p-3 text-center min-w-40 border-l border-gray-200"
                    >
                      <div className="space-y-2">
                        <div className="text-xs text-gray-600 font-medium">
                          Data da Inspeção
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="date"
                            value={col.date}
                            onChange={(e) =>
                              updateColumnField(
                                type,
                                data.findIndex((c) => c.id === col.id),
                                "date",
                                e.target.value,
                              )
                            }
                            className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                          />
                          {data.length > 2 && (
                            <button
                              onClick={() => removeColumn(type, col.id)}
                              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                            >
                              <BiX size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                  <th className="p-4">
                    <button
                      onClick={() => addColumn(type)}
                      className="w-full p-3 bg-linear-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:border-blue-400 transition-colors flex items-center justify-center gap-2"
                    >
                      <BiPlus size={18} className="text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">
                        Nova
                      </span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {config.items.map((item, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 font-medium text-black">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 shrink-0"></div>
                        <span className="text-sm">{item}</span>
                      </div>
                    </td>
                    {data.map((col, colIndex) => {
                      const val = col.checks[rowIndex];
                      const getCellStyles = () => {
                        if (val === "S")
                          return "bg-gradient-to-b from-green-50 to-green-100 text-green-800 border-green-200";
                        if (val === "N")
                          return "bg-gradient-to-b from-red-50 to-red-100 text-red-800 border-red-200";
                        return "bg-gray-50 text-gray-600 border-gray-200";
                      };

                      return (
                        <td
                          key={col.id}
                          onClick={() => handleCheck(type, colIndex, rowIndex)}
                          className={`p-4 text-center border-l border-gray-100 cursor-pointer transition-all hover:scale-[1.02] ${getCellStyles()}`}
                        >
                          <div className="font-bold text-lg">
                            {val === "S" ? "✓" : val === "N" ? "✗" : ""}
                          </div>
                          <div className="text-xs font-medium mt-1">
                            {val === "S"
                              ? "SIM"
                              : val === "N"
                                ? "NÃO"
                                : "PENDENTE"}
                          </div>
                        </td>
                      );
                    })}
                    <td className="bg-gray-50"></td>
                  </tr>
                ))}

                <tr className="bg-linear-to-r from-gray-50 to-gray-100/30">
                  <td className="p-4 font-bold text-black">
                    <span className="flex items-center gap-2">
                      <BiError size={16} className="text-orange-600" />
                      Ação Corretiva
                    </span>
                  </td>
                  {data.map((col, index) => (
                    <td key={col.id} className="p-3 border-l border-gray-100">
                      <textarea
                        className="w-full h-32 bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-black"
                        placeholder="Descreva a ação corretiva se houver não conformidade..."
                        value={col.correctiveAction}
                        onChange={(e) =>
                          updateColumnField(
                            type,
                            index,
                            "correctiveAction",
                            e.target.value,
                          )
                        }
                      />
                    </td>
                  ))}
                  <td className="bg-gray-50"></td>
                </tr>

                <tr>
                  <td className="p-4 font-bold text-black">
                    <span className="flex items-center gap-2">
                      <BiUserCheck size={16} className="text-blue-600" />
                      Assinatura do Responsável
                    </span>
                  </td>
                  {data.map((col, index) => (
                    <td key={col.id} className="p-3 border-l border-gray-100">
                      <div className="h-20 border-2 border-dashed border-gray-300 rounded-lg bg-white flex items-center justify-center relative group">
                       <SignatureSelector
                              value={col.signature}
                              onChange={(val) =>
                                updateColumnField(
                                  type,
                                  index,
                                  "signature",
                                  val || "",
                                )
                              }
                            />
                      </div>
                    </td>
                  ))}
                  <td className="bg-gray-50"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderRepairsTab = () => {
    return (
      <div className="space-y-6">
        <div className="bg-linear-to-r from-orange-50 to-orange-100/50 border border-orange-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <BiWrench className="text-orange-600" size={24} />
            </div>
            <div>
              <h2 className="font-bold text-black text-lg">
                REGISTRO DE REPAROS E MANUTENÇÕES
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Registre manutenções corretivas, reparos ou limpezas específicas
                não programadas
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {repairLogs.map((log, index) => (
            <div
              key={log.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-linear-to-r from-gray-100 to-gray-200 p-2 rounded-lg">
                    <span className="font-bold text-black">
                      #{String(log.id).padStart(3, "0")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BiCalendar size={16} className="text-gray-500" />
                    <input
                      type="date"
                      value={log.date}
                      onChange={(e) =>
                        updateRepairField(index, "date", e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
                    />
                  </div>
                </div>
                {repairLogs.length > 1 && (
                  <button
                    onClick={() => removeRepairLog(log.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <BiX size={18} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Equipamento
                  </label>
                  <input
                    type="text"
                    value={log.equipment}
                    onChange={(e) =>
                      updateRepairField(index, "equipment", e.target.value)
                    }
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Ex: Esteira de transporte, Balança..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Razão do Serviço
                  </label>
                  <input
                    type="text"
                    value={log.reason}
                    onChange={(e) =>
                      updateRepairField(index, "reason", e.target.value)
                    }
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Ex: Falha mecânica, Substituição..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Solicitante
                  </label>
                  <input
                    type="text"
                    value={log.requester}
                    onChange={(e) =>
                      updateRepairField(index, "requester", e.target.value)
                    }
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Nome do solicitante"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Responsável pelo Serviço
                  </label>
                  <input
                    type="text"
                    value={log.provider}
                    onChange={(e) =>
                      updateRepairField(index, "provider", e.target.value)
                    }
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Empresa ou técnico responsável"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-3">
                  <span className="flex items-center gap-2">
                    <BiCheckCircle size={16} className="text-green-600" />
                    Ação Corretiva
                  </span>
                </label>
                <textarea
                  value={log.correctiveAction}
                  onChange={(e) =>
                    updateRepairField(index, "correctiveAction", e.target.value)
                  }
                  className="w-full h-32 bg-white border border-gray-300 rounded-lg p-4 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-black"
                  placeholder="Descreva as ações corretivas realizadas para solucionar o problema..."
                />
                <div className="text-xs text-gray-500 mt-2">
                  Descreva detalhadamente as medidas tomadas para corrigir a
                  situação
                </div>
              </div>

              <div className="bg-linear-to-r from-gray-50 to-gray-100/30 rounded-lg p-4 mb-6">
                <label className="block text-sm font-medium text-black mb-3">
                  Limpeza do Equipamento Pós-Reparo
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${log.cleanedAfter === true ? "border-green-600 bg-green-100" : "border-gray-300"}`}
                    >
                      {log.cleanedAfter === true && (
                        <div className="w-3 h-3 rounded-full bg-green-600"></div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-black">Sim</span>
                    <input
                      type="radio"
                      name={`cleaned_${log.id}`}
                      checked={log.cleanedAfter === true}
                      onChange={() =>
                        updateRepairField(index, "cleanedAfter", true)
                      }
                      className="hidden"
                    />
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${log.cleanedAfter === false ? "border-red-600 bg-red-100" : "border-gray-300"}`}
                    >
                      {log.cleanedAfter === false && (
                        <div className="w-3 h-3 rounded-full bg-red-600"></div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-black">Não</span>
                    <input
                      type="radio"
                      name={`cleaned_${log.id}`}
                      checked={log.cleanedAfter === false}
                      onChange={() =>
                        updateRepairField(index, "cleanedAfter", false)
                      }
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div className="bg-linear-to-b from-gray-50 to-white rounded-xl border border-gray-200 p-5">
                  <div className="text-center mb-4">
                    <div className="font-bold text-black text-sm mb-1">
                      Responsável pela Manutenção
                    </div>
                    <div className="text-xs text-gray-500">
                      Técnico ou prestador do serviço
                    </div>
                  </div>
                  <div className="h-24 border-2 border-dashed border-gray-300 rounded-lg bg-white flex items-center justify-center relative group">
                    <SignatureSelector
                      value={log.signatureResponsible}
                      onChange={(v) => updateRepairField(index, "signatureResponsible", v)}
                    />
                  </div>
                </div>

                <div className="bg-linear-to-b from-gray-50 to-white rounded-xl border border-gray-200 p-5">
                  <div className="text-center mb-4">
                    <div className="font-bold text-black text-sm mb-1">
                      Supervisor da Área
                    </div>
                    <div className="text-xs text-gray-500">
                      Responsável pela aprovação
                    </div>
                  </div>
                  <div className="h-24 border-2 border-dashed border-gray-300 rounded-lg bg-white flex items-center justify-center relative group">
                      <SignatureSelector
                      value={log.signatureSupervisor}
                      onChange={(v) => updateRepairField(index, "signatureSupervisor", v)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addRepairLog}
            className="w-full bg-linear-to-r from-gray-50 to-white border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 hover:bg-blue-50 transition-all"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BiPlus className="text-blue-600" size={24} />
              </div>
              <div>
                <div className="font-bold text-black text-lg">
                  Adicionar Novo Registro
                </div>
                <div className="text-gray-600 text-sm">
                  Clique para registrar nova manutenção ou reparo
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-3 sm:p-4 md:p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="bg-linear-to-r from-blue-600 to-blue-700 rounded-xl p-5 sm:p-6 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <BiWrench className="text-white" size={24} />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      {COMPLIANCE.title}
                    </h1>
                    <p className="text-blue-100 text-sm sm:text-base">
                      {COMPLIANCE.code} • Controle de manutenção preventiva e
                      corretiva
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/30">
                <div className="text-white font-bold text-sm sm:text-base">
                  POP-08
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex rounded-xl overflow-hidden border border-gray-300 bg-white shadow-sm">
            {(["contaminacao", "preventiva", "reparos"] as const).map((tab) => {
              //@ts-ignore
              const config = CHECKLISTS[tab] || {
                icon: BiWrench,
                frequency: "REPAROS",
              };
              const Icon = config.icon;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-4 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-3 ${
                    activeTab === tab
                      ? tab === "contaminacao"
                        ? "bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 border-b-2 border-blue-600"
                        : tab === "preventiva"
                          ? "bg-linear-to-r from-green-50 to-green-100 text-green-700 border-b-2 border-green-600"
                          : "bg-linear-to-r from-orange-50 to-orange-100 text-orange-700 border-b-2 border-orange-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">
                    {tab === "contaminacao" && "Contaminação"}
                    {tab === "preventiva" && "Preventiva"}
                    {tab === "reparos" && "Reparos"}
                  </span>
                  <span className="text-xs font-bold bg-white/50 px-2 py-0.5 rounded-full">
                    {config.frequency}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6">
          {activeTab === "contaminacao" && renderChecklistTable("contaminacao")}
          {activeTab === "preventiva" && renderChecklistTable("preventiva")}
          {activeTab === "reparos" && renderRepairsTab()}
        </div>

        <div className="mt-6 sm:mt-8 bg-linear-to-r from-gray-900 to-gray-800 rounded-xl shadow-lg p-4 sm:p-5 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-300 mb-1">Revisado por</div>
              <div className="text-lg font-semibold text-yellow-400">
                {COMPLIANCE.revisedBy}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-300 mb-1">Última Revisão</div>
              <div className="text-lg font-bold">{COMPLIANCE.revisionDate}</div>
            </div>
            <div>
              <div className="text-sm text-gray-300 mb-1">
                Código do Documento
              </div>
              <div className="text-lg font-bold">POP-08</div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-300">
          <div className="text-center text-gray-500 text-sm">
            <p className="text-black">
              GrandValle © {new Date().getFullYear()} • Documento: POP-08 -
              Procedimento de Manutenção e Limpeza Preventiva
            </p>
            <p className="mt-1 text-black">
              Versão: {COMPLIANCE.code} • Última revisão:{" "}
              {COMPLIANCE.revisionDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
