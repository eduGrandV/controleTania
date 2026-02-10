import { BiUser, BiX } from "react-icons/bi";

export const AUTHORIZED_USERS = [
  "Clebitânia Carvalho",
  "Wagner Dia Araújo",
  "Lara Secchi",
  "Daiane Souza",
  "Operador 01",
  "Operador 02",
  "Coordenador",
];

interface SignatureSelectorProps {
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
}

export const SignatureSelector = ({
  value,
  onChange,
  placeholder = "ASsinar...",
}: SignatureSelectorProps) => {
  if (value) {
    return(
        <div className="relative group w-full h-10 flex items-center justify-center bg-white border border-gray-300 rounded-lg p-1 hover:border-blue-400 transition-all">
        {/* Imagem da Assinatura */}
        <img
          src={`/assinaturas/${value}.png`}
          alt={`Assinatura de ${value}`}
          className="h-full object-contain max-w-full"
          onError={(e) => {
            // Fallback visual caso a imagem não exista na pasta public
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement?.classList.add('bg-red-50');
            const span = document.createElement('span');
            span.className = "text-[9px] text-red-500 font-bold text-center leading-tight";
            span.innerText = `${value}\n(Img não encontrada)`;
            e.currentTarget.parentElement?.appendChild(span);
          }}
        />

        {/* Tooltip com o nome ao passar o mouse */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
          {value}
        </div>

        {/* Botão de Remover */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); 
            onChange(null);
          }}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
          title="Remover assinatura"
        >
          <BiX size={14} />
        </button>
      </div>
    )
  }

  //não assinado
  return(
    <div className="relative w-full h-10 group">
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-blue-500 transition-colors">
        <BiUser size={16} />
      </div>
      <select
        className="w-full h-full text-xs font-medium border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none pl-8 pr-2 cursor-pointer hover:bg-white hover:border-gray-400 transition-all"
        onChange={(e) => {
          if (e.target.value) onChange(e.target.value);
        }}
        value=""
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {AUTHORIZED_USERS.map((user) => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </select>
    </div>
  )
};
