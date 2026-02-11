import { useRef } from "react";
import { BiUser, BiX, BiUpload } from "react-icons/bi";

// Lista de nomes (Mantive a mesma)
const USERS = [
  "ADRIEL DOS S.SILVA",
  "Cesar frank",
  "ANTONIO JHEYSON SILVA ALVES",
  "CARLIENE F DA SILVA",
  "CLEISON NUNES DE SOUZA",
  "CRISTIANE MARIA",
  "EDUARDO S. SILVA",
  "ELIANE CRUZ SOUZA",
  "ELLEN VITORIA",
  "ERIC MARTINS ARAUJO",
  "EXPEDITO CARLOS",
  "FABIOLA DOS S BARROS",
  "FABRICIA",
  "FABRICIO CASTRO",
  "FABRICIO SILVA RODRIGUES",
  "FRANCINALDO F COELHO",
  "HIGO JULLYS",
  "JOSAPHA NUNES",
  "JOSE NEUTON",
  "LAECIO DE SOUZA SOARES",
  "LEANDRO CASTRO",
  "LEIDIANE PASSOS",
  "LIDIA AMORIM BRITO",
  "MARCIA MARIA DE MOURA SANTOS",
  "MARCIANA BRITO",
  "MATEUS CASTOR",
  "MATEUS SILVA PEREIRA",
  "PEDRO GOMES",
  "PERLA NAIANE",
  "RAFAEL S OLIVEIRA",
  "RONIER GUIMARAES SANTOS",
  "RONIERISON FERREIRA",
  "WAGNER DIAS ARAÚJO"
];

interface Props {
  value: string | null;
  onChange: (val: string | null) => void;
}

export const SignatureSelector = ({ value, onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Função que trata o upload de arquivo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Cria uma URL temporária para a imagem carregada
      const objectUrl = URL.createObjectURL(file);
      onChange(objectUrl);
    }
  };

  // ESTADO 1: JÁ ASSINADO (Mostra a imagem)
  if (value) {
    // Verifica se é um upload manual (começa com blob:) ou nome da lista
    const isUpload = value.startsWith("blob:");
    const imgSrc = isUpload ? value : `/assinaturas/${value}.png`;

    return (
      <div className="relative group w-full h-12 flex items-center justify-center border border-green-300 bg-green-50 rounded-lg">
        <img
          src={imgSrc}
          alt="Assinatura"
          className="h-10 object-contain"
          onError={(e) => {
            if (!isUpload) {

              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerText = value;
            }
          }}
        />

        <button
          onClick={() => onChange(null)}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <BiX />
        </button>
      </div>
    );
  }


  return (
    <div className="relative w-full flex gap-2">
      {/* Input de arquivo oculto */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="relative w-full">
        <BiUser className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
        <select
          className="text-black w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
          onChange={(e) => onChange(e.target.value)}
          value=""
        >
          <option value={""} disabled >Assinar...</option>
          {USERS.map((user) => (
            <option className="text-black" key={user} value={user}>{user.toUpperCase()}</option>
          ))}
        </select>
      </div>


      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="px-2 bg-white border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 transition-colors"
        title="Fazer upload de assinatura"
      >
        <BiUpload size={16} />
      </button>
    </div>
  );
};