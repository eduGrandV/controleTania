"use client";

import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Leaf, 
  Check,
  X
} from "lucide-react";


const POST_HARVEST_TREATMENTS = [
  {
    id: "europa",
    name: "Europa",
    icon: "🇪🇺",
    color: "blue",
    waxType: "VITA FRESH-BOTANICALS-LIFEULTRA",
    dosage: "5L/20L",
    application: "PULVERIZADO",
    compositionOptions: ["Emulsão de cera vegetal", "Cera de Carnaúba"]
  },
  {
    id: "usa",
    name: "Estados Unidos",
    icon: "🇺🇸",
    color: "red",
    waxType: "VITA FRESH - BOTANICALS - LIFEUTRA",
    dosage: "5L/20L",
    application: "PULVERIZADO",
    compositionOptions: ["Emulsão de cera vegetal", "Cera de Carnaúba"]
  },
  {
    id: "graduate",
    name: "GRADUATE A+",
    icon: "🎓",
    color: "purple",
    activeIngredient: "AZOXISTROBINA + FLUDIOXONIL",
    justification: "ANTRACNOSE",
    dosage: "0,25 a 0,5/100L",
    application: "PULVERIZADO",
    treatmentType: "PÓS-COLHEITA"
  },
  {
    id: "clean_fruit",
    name: "CLEAN FRUIT",
    icon: "🍎",
    color: "green",
    productName: "CLEAN FRUIT",
    dosage: "20Kg",
    application: "Imersão",
    requiresWaterTank: true
  }
];


type TreatmentType = "europa" | "usa" | "graduate" | "clean_fruit";

interface PostHarvestRecord {
  id: number;
  date: string;
  treatmentType: TreatmentType;
  product: string;
  variety: string;
  composition: string;
  dosage: string;
  waterQuantity: string;
  applicationMethod: string;
  epiUsed: boolean | null;
  operator: string;
  observation: string;
  recommendedBy: string;
  recommendedBySignature: string | null;
  applicator: string; 
  applicatorSignature: string | null;
  justification: string;
}

export default function ControlePosColheitaMaster() {
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentType>("europa");

  
  const [postHarvestRecords, setPostHarvestRecords] = useState<PostHarvestRecord[]>([
    {
      id: 1,
      date: "",
      treatmentType: "europa",
      product: "MANGA",
      variety: "",
      composition: "",
      dosage: "5L/20L",
      waterQuantity: "",
      applicationMethod: "PULVERIZADO",
      epiUsed: null,
      operator: "",
      observation: "",
      recommendedBy: "Wagner Dia Araújo",
      recommendedBySignature: null,
      applicator: "",
      applicatorSignature: null,
      justification: "A cera é usada com a finalidade de reduzir a perda de umidade peso por transpiração e respiração retardando a assim o seu envelhecimento e aumentando o tempo de armazenamento."
    }
  ]);

  
  const getTreatmentInfo = (type: TreatmentType) => {
    return POST_HARVEST_TREATMENTS.find(t => t.id === type) || POST_HARVEST_TREATMENTS[0];
  };

  const getFilteredPostHarvestRecords = () => {
    return postHarvestRecords.filter(record => record.treatmentType === selectedTreatment);
  };

  
  const handleSignature = (setter: any, list: any[], index: number, field: string, value: string | null) => {
    const newList = [...list];
    newList[index][field] = value;
    setter(newList);
  };

  
  const SignatureCell = ({ sig, onSign, onUpload, onRemove }: any) => (
    <div className="h-10 w-full flex items-center justify-center relative group border border-gray-300 rounded-lg bg-white hover:border-blue-400 transition-colors">
      {sig ? (
        <>
          <img src={sig} alt="Assinado" className="h-8 object-contain" />
          <button 
            onClick={onRemove} 
            className="hidden group-hover:block absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full shadow-sm z-10"
            title="Remover assinatura"
          >
            ×
          </button>
        </>
      ) : (
        <div className="flex gap-2 items-center opacity-70 hover:opacity-100">
          <button 
            onClick={onSign} 
            className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded hover:bg-blue-200 transition-colors"
          >
            Eu
          </button>
          <label className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded hover:bg-orange-200 cursor-pointer transition-colors">
            Up
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={onUpload} 
            />
          </label>
        </div>
      )}
    </div>
  );

  
  const addPostHarvestRecord = () => {
    const treatment = getTreatmentInfo(selectedTreatment);
    setPostHarvestRecords([...postHarvestRecords, {
      id: Date.now(),
      date: "",
      treatmentType: selectedTreatment,
      product: "MANGA",
      variety: "",
      composition: treatment.compositionOptions ? treatment.compositionOptions[0] : "",
      dosage: treatment.dosage,
      waterQuantity: "",
      applicationMethod: treatment.application,
      epiUsed: null,
      operator: "",
      observation: "",
      recommendedBy: "Wagner Dia Araújo",
      recommendedBySignature: null,
      applicator: "",
      applicatorSignature: null,
      justification: treatment.id === "graduate" ? "ANTRACNOSE" : "A cera é usada com a finalidade de reduzir a perda de umidade peso por transpiração e respiração retardando a assim o seu envelhecimento e aumentando o tempo de armazenamento."
    }]);
  };

  const updatePostHarvestRecord = (idx: number, field: keyof PostHarvestRecord, val: any) => {
    const newRecords = [...postHarvestRecords];
    (newRecords[idx] as any)[field] = val;
    setPostHarvestRecords(newRecords);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-3 sm:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-300 flex flex-col min-h-[85vh] overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-linear-to-r from-gray-900 to-gray-800 text-white p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="w-36 h-12 bg-linear-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold rounded-lg shadow-lg">
              GrandValle
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold uppercase tracking-tight">Registros Pós-Colheita</h1>
              <span className="text-sm font-medium text-gray-300 mt-1">POP - 13</span>
            </div>
            <div className="text-sm font-medium text-gray-300 text-center sm:text-right">
              <div>Rev: <span className="font-bold text-yellow-300">Clebitânia Carvalho</span></div>
              <div>02/01/2026</div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-4 sm:p-6 flex-1 overflow-auto">
          <div className="space-y-6">
            
            {/* Seletor de Tratamento */}
            <div className="bg-linear-to-r from-emerald-50 to-green-50 p-5 rounded-xl border border-emerald-200 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1 w-full">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Selecione o Tipo de Tratamento:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {POST_HARVEST_TREATMENTS.map(treatment => (
                      <button
                        key={treatment.id}
                        onClick={() => setSelectedTreatment(treatment.id as TreatmentType)}
                        className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
                          selectedTreatment === treatment.id
                            ? `bg-linear-to-r from-${treatment.color}-500 to-${treatment.color}-600 text-white border-${treatment.color}-600 shadow-md`
                            : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'
                        }`}
                      >
                        <span className="text-2xl mb-1">{treatment.icon}</span>
                        <span className="text-xs font-semibold text-center line-clamp-2">{treatment.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Informações do Tratamento Selecionado */}
            <div className="bg-white rounded-xl border border-gray-300 p-5 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-${getTreatmentInfo(selectedTreatment).color}-100`}>
                      <span className="text-2xl">{getTreatmentInfo(selectedTreatment).icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-xl">
                        {getTreatmentInfo(selectedTreatment).name}
                      </h3>
                      <p className="text-sm text-gray-600">Tratamento Pós-Colheita de Manga</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {selectedTreatment === "graduate" ? (
                      <>
                        <div className="p-3 bg-gray-50 rounded border border-gray-100">
                          <span className="font-bold text-gray-700 block">Produto</span>
                          {getTreatmentInfo(selectedTreatment).productName}
                        </div>
                        <div className="p-3 bg-gray-50 rounded border border-gray-100">
                          <span className="font-bold text-gray-700 block">Ingrediente Ativo</span>
                          {getTreatmentInfo(selectedTreatment).activeIngredient}
                        </div>
                        <div className="p-3 bg-gray-50 rounded border border-gray-100">
                          <span className="font-bold text-gray-700 block">Justificativa</span>
                          {getTreatmentInfo(selectedTreatment).justification}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-3 bg-gray-50 rounded border border-gray-100">
                          <span className="font-bold text-gray-700 block">Tipo Cera</span>
                          {getTreatmentInfo(selectedTreatment).waxType}
                        </div>
                        <div className="p-3 bg-gray-50 rounded border border-gray-100">
                          <span className="font-bold text-gray-700 block">Dosagem</span>
                          {getTreatmentInfo(selectedTreatment).dosage}
                        </div>
                      </>
                    )}
                    <div className="p-3 bg-gray-50 rounded border border-gray-100">
                      <span className="font-bold text-gray-700 block">Aplicação</span>
                      {getTreatmentInfo(selectedTreatment).application}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={addPostHarvestRecord}
                    className="flex items-center gap-3 px-5 py-3 bg-linear-to-r from-emerald-600 to-green-700 text-white rounded-lg hover:from-emerald-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg w-full md:w-auto justify-center"
                  >
                    <Plus size={20} />
                    <span className="font-semibold">Novo Registro</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tabela de Registros Pós-Colheita */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Leaf className="text-2xl text-emerald-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Registros de Aplicação</h3>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr className="bg-linear-to-r from-emerald-50 to-green-50">
                        <th className="p-3 text-left font-semibold text-gray-700 w-24">Data</th>
                        <th className="p-3 text-left font-semibold text-gray-700 min-w-25">Produto</th>
                        <th className="p-3 text-left font-semibold text-gray-700 min-w-25">Variedade</th>
                        <th className="p-3 text-left font-semibold text-gray-700 w-20">Dosagem</th>
                        <th className="p-3 text-center font-semibold text-gray-700 w-20">EPI?</th>
                        <th className="p-3 text-left font-semibold text-gray-700 min-w-25">Operador</th>
                        <th className="p-3 text-left font-semibold text-gray-700 w-32">Assinatura Aplicador</th>
                        <th className="p-3 text-center font-semibold text-gray-700 w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredPostHarvestRecords().map((record, idx) => {
                        const originalIdx = postHarvestRecords.findIndex(r => r.id === record.id);
                        return (
                          <tr key={record.id} className="border-t border-gray-200 hover:bg-emerald-50/30 transition-colors group">
                            <td className="p-2">
                              <input 
                                type="date" 
                                value={record.date}
                                onChange={e => updatePostHarvestRecord(originalIdx, 'date', e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1 bg-transparent"
                              />
                            </td>
                            <td className="p-2">
                              <input 
                                type="text" 
                                value={record.product}
                                onChange={e => updatePostHarvestRecord(originalIdx, 'product', e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1 bg-transparent"
                                placeholder="Prod"
                              />
                            </td>
                            <td className="p-2">
                              <input 
                                type="text" 
                                value={record.variety}
                                onChange={e => updatePostHarvestRecord(originalIdx, 'variety', e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1 bg-transparent"
                                placeholder="Var"
                              />
                            </td>
                            <td className="p-2">
                              <input 
                                type="text" 
                                value={record.dosage}
                                onChange={e => updatePostHarvestRecord(originalIdx, 'dosage', e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1 bg-transparent text-center"
                              />
                            </td>
                            <td className="p-2 text-center">
                              <div className="flex justify-center gap-2">
                                <button 
                                  onClick={() => updatePostHarvestRecord(originalIdx, 'epiUsed', true)}
                                  className={`p-1 rounded ${record.epiUsed === true ? 'bg-green-100 text-green-700' : 'text-gray-300 hover:bg-gray-100'}`}
                                >
                                  <Check size={16} />
                                </button>
                                <button 
                                  onClick={() => updatePostHarvestRecord(originalIdx, 'epiUsed', false)}
                                  className={`p-1 rounded ${record.epiUsed === false ? 'bg-red-100 text-red-700' : 'text-gray-300 hover:bg-gray-100'}`}
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </td>
                            <td className="p-2">
                              <input 
                                type="text" 
                                value={record.operator}
                                onChange={e => updatePostHarvestRecord(originalIdx, 'operator', e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1 bg-transparent"
                                placeholder="Nome"
                              />
                            </td>
                            <td className="p-2">
                              <SignatureCell 
                                sig={record.applicatorSignature}
                                onSign={() => handleSignature(setPostHarvestRecords, postHarvestRecords, originalIdx, 'applicatorSignature', '/raivans.png')}
                                onUpload={(e: any) => e.target.files && handleSignature(setPostHarvestRecords, postHarvestRecords, originalIdx, 'applicatorSignature', URL.createObjectURL(e.target.files[0]))}
                                onRemove={() => handleSignature(setPostHarvestRecords, postHarvestRecords, originalIdx, 'applicatorSignature', null)}
                              />
                            </td>
                            <td className="p-2 text-center">
                              <button 
                                onClick={() => {
                                  const newRecords = postHarvestRecords.filter((_, i) => i !== originalIdx);
                                  setPostHarvestRecords(newRecords);
                                }}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                {getFilteredPostHarvestRecords().length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <Leaf className="text-4xl mx-auto mb-3 text-gray-300" />
                    <p className="font-medium">Nenhum registro.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Detalhes do Registro Ativo */}
            {getFilteredPostHarvestRecords().length > 0 && (
              <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-5 shadow-sm">
                <h4 className="font-bold text-blue-800 text-lg mb-3">Detalhes e Responsáveis</h4>
                <div className="space-y-4">
                  {getFilteredPostHarvestRecords().map((record, idx) => {
                    const originalIdx = postHarvestRecords.findIndex(r => r.id === record.id);
                    return (
                      <div key={record.id} className="bg-white rounded-lg p-4 border border-blue-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Observações:</label>
                            <textarea 
                              value={record.observation}
                              onChange={e => updatePostHarvestRecord(originalIdx, 'observation', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm h-20"
                              placeholder="Observações..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Justificativa:</label>
                            <textarea 
                              value={record.justification}
                              onChange={e => updatePostHarvestRecord(originalIdx, 'justification', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm h-20 bg-gray-50"
                              readOnly={selectedTreatment !== "graduate"}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Responsável pela Recomendação:</label>
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <input 
                                  type="text" 
                                  value={record.recommendedBy}
                                  readOnly
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                                />
                                <p className="text-[10px] text-gray-500 mt-1">Eng. Agrônomo - CREA/BA 1809102413</p>
                              </div>
                              <div className="w-32">
                                <SignatureCell 
                                  sig={record.recommendedBySignature}
                                  onSign={() => handleSignature(setPostHarvestRecords, postHarvestRecords, originalIdx, 'recommendedBySignature', '/raivans.png')}
                                  onUpload={(e: any) => e.target.files && handleSignature(setPostHarvestRecords, postHarvestRecords, originalIdx, 'recommendedBySignature', URL.createObjectURL(e.target.files[0]))}
                                  onRemove={() => handleSignature(setPostHarvestRecords, postHarvestRecords, originalIdx, 'recommendedBySignature', null)}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Composição:</label>
                            {getTreatmentInfo(selectedTreatment).compositionOptions ? (
                              <div className="flex gap-4 mt-2">
                                {getTreatmentInfo(selectedTreatment).compositionOptions?.map((option, optionIdx) => (
                                  <label key={optionIdx} className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                      type="radio" 
                                      name={`composition-${record.id}`}
                                      checked={record.composition === option}
                                      onChange={() => updatePostHarvestRecord(originalIdx, 'composition', option)}
                                      className="accent-blue-600"
                                    />
                                    <span className="text-sm">{option}</span>
                                  </label>
                                ))}
                              </div>
                            ) : (
                              <input 
                                type="text" 
                                value={record.composition}
                                onChange={e => updatePostHarvestRecord(originalIdx, 'composition', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RODAPÉ GERAL */}
        <div className="bg-linear-to-r from-gray-900 to-gray-800 text-white p-4 sm:p-5 mt-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <div>
              Revisado por: <span className="font-bold text-yellow-300 ml-2">Clebitânia Carvalho</span>
            </div>
            <div>
              Data Revisão: <span className="font-bold ml-2">02/01/2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}