import React from 'react'

const Poruka = ({poruka, promjenaVaznosti, brisiPoruku}) => {
  const oznaka = poruka.vazno
  ? 'označi kao nevažno' : 'označi kao važno'
 
  return (
    <li>
      {poruka.sadrzaj}
      <button onClick={promjenaVaznosti}>{oznaka}</button>
      <button onClick={brisiPoruku}>Briši</button>
    </li>
  )
 }
 

export default Poruka