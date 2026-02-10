import { BiUser, BiX } from "react-icons/bi";

// Lista de nomes (devem ser IGUAIS aos nomes dos arquivos na pasta public/assinaturas)
// Ex: Se o arquivo é "Joao Silva.png", o nome aqui deve ser "Joao Silva"
const USERS = [

"ANTONIO JHEYSON SILVA ALVES",
"ADRIELDOSSSILVA",
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
  value: string | null;              // O nome da pessoa selecionada
  onChange: (val: string | null) => void; 
}

export const SignatureSelector = ({ value, onChange }: Props) => {
  
  // ESTADO 1: JÁ ASSINADO (Mostra a imagem)
  if (value) {
    return (
      <div className="relative group w-full h-12 flex items-center justify-center border border-green-300 bg-green-50 rounded-lg">
        
        <img
          src={`/assinaturas/${value}.png`} 
          alt="assinatura" 
          className="h-10 object-contain"
          
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
    <div className="relative w-full">
      <BiUser className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
      <select
        className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
        onChange={(e) => onChange(e.target.value)}
        value=""
      >
        <option value=" " disabled selected>Assinar...</option>
        {USERS.map((user) => (
          <option key={user} value={user}>{user}</option>
        ))}
      </select>
    </div>
  );
};