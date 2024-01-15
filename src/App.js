import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import './estilo.css';

import api from './services/api.js';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("Informe o cep (ex: 72420400)")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("CEP não encontrado");
      setInput("");
    }
  }

  return (
    <div className="container">

      <div className="containerInput">
        <input type="text" placeholder="Digite o CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FcSearch size={25} color='#FFF' />
        </button>


      </div>

      {Object.keys(cep).length > 5 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;
