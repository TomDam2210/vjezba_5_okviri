import React, {useEffect, useState} from 'react'
import Poruka from './components/Poruka'
import axios from 'axios'

const App = (props) => {
  const [ poruke, postaviPoruke] = useState([])
  const [ unosPoruke, postaviUnos] = useState('unesi poruku...')
  const [ ispisSve, postaviIspis] = useState(true)

  const promjenaVaznostiPoruke = (id) => {
    const url = `http://localhost:3001/api/poruke/${id}`
    const poruka = poruke.find(p => p.id === id)
    const modPoruka = {
      ...poruka,
      vazno: !poruka.vazno
    }

    axios.put(url, modPoruka)
      .then(response => {
        postaviPoruke(poruke.map(p => p.id !== id ? p: response.data))
    })
  }
   

  const porukeZaIspis = ispisSve
  ? poruke
  : poruke.filter(poruka => poruka.vazno === true)

  useEffect( () => {
    //pošalji GET zahtjev na server
    axios.get("http://localhost:3001/api/poruke/")
    .then( (res) => postaviPoruke(res.data))  // obradi odgovor i spremi poruke u state varijablu 
  }, [])



  const novaPoruka = (e) => {
    e.preventDefault()
    console.log('Klik', e.target)
    const noviObjekt = {
      sadrzaj: unosPoruke,
      vazno: Math.random() > 0.5      
    }
    //postaviPoruke(poruke.concat(noviObjekt))
    //Pošalji AXIOS POST ZAHTJEV za spremanje
    //Prikaži novu poruku na sučelju
    axios.post("http://localhost:3001/api/poruke/", noviObjekt)
    .then( res => { 
      postaviPoruke(poruke.concat(res.data))
    })
    
    postaviUnos('')
  }

  const promjenaUnosa = (e) => {
    console.log(e.target.value);
    postaviUnos(e.target.value)
  }
  return (
    <div>
      <h1>Poruke</h1>
      <div>
        <button onClick={() => postaviIspis(!ispisSve)}>
          Prikaži { ispisSve ? "važne" : "sve"}
        </button>
      </div>
      <ul>
        {porukeZaIspis.map(p =>
          <Poruka 
            key={p.id} 
            poruka={p} 
            promjenaVaznosti={ () => promjenaVaznostiPoruke(p.id)} />
        )}        
      </ul>
      <form onSubmit={novaPoruka}>
        <input value={unosPoruke} onChange={promjenaUnosa} />
        <button type='submit'>Spremi</button>
      </form>
    </div>
  )
}

export default App