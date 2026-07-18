const items = [
  ['home','🏠','Главная'],
  ['glow','✨','Glow Up'],
  ['fitness','💪','Фитнес'],
  ['health','🩺','Здоровье'],
  ['life','♡','Жизнь']
];
export default function Nav({page,setPage}) {
  return <nav className="nav">
    {items.map(([id,icon,label]) =>
      <button key={id} className={page===id?'active':''} onClick={()=>setPage(id)}>
        <span>{icon}</span>{label}
      </button>
    )}
  </nav>
}
