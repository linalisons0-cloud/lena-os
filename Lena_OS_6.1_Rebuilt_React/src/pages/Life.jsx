import {useState} from 'react';
import Card from '../components/Card.jsx';
import {load,save,todayKey} from '../storage.js';

export default function Life(){
  const [tab,setTab]=useState('nutrition');
  const [foods,setFoods]=useState(load('foods-'+todayKey(),[]));
  const [food,setFood]=useState({name:'',cal:'',p:'',f:'',c:''});
  const [reading,setReading]=useState(load('reading',[]));
  const [book,setBook]=useState('');
  const [minutes,setMinutes]=useState(10);
  const [profile,setProfile]=useState(load('nutrition-profile',{height:167,weight:58,age:25,activity:1.375,goal:0}));

  const bmr=10*profile.weight+6.25*profile.height-5*profile.age-161;
  const calories=Math.round(bmr*profile.activity*(1+Number(profile.goal)));
  const protein=Math.round(profile.weight*1.8);
  const fat=Math.round(profile.weight*.9);
  const carbs=Math.max(0,Math.round((calories-protein*4-fat*9)/4));
  const totals=foods.reduce((a,x)=>({cal:a.cal+x.cal,p:a.p+x.p,f:a.f+x.f,c:a.c+x.c}),{cal:0,p:0,f:0,c:0});

  const updateProfile=(k,v)=>{const next={...profile,[k]:Number(v)};setProfile(next);save('nutrition-profile',next)};
  const addFood=()=>{
    if(!food.name)return;
    const next=[{id:Date.now(),name:food.name,cal:+food.cal||0,p:+food.p||0,f:+food.f||0,c:+food.c||0},...foods];
    setFoods(next);save('foods-'+todayKey(),next);setFood({name:'',cal:'',p:'',f:'',c:''});
  };
  const addReading=()=>{
    if(!book)return;
    const next=[{id:Date.now(),date:todayKey(),book,minutes:+minutes},...reading];
    setReading(next);save('reading',next);setBook('');
  };

  return <main>
    <Card className="hero"><p className="eyebrow">ЖИЗНЬ</p><h1>Питание и чтение ♡</h1><p>Те самые функции из 6.1 — в новой архитектуре.</p></Card>
    <div className="tabs">
      <button className={tab==='nutrition'?'active':''} onClick={()=>setTab('nutrition')}>Питание</button>
      <button className={tab==='reading'?'active':''} onClick={()=>setTab('reading')}>Чтение</button>
      <button className={tab==='ai'?'active':''} onClick={()=>setTab('ai')}>Лена AI</button>
    </div>

    {tab==='nutrition' && <>
      <Card title="Расчёт КБЖУ">
        <div className="grid2">
          <label>Рост<input type="number" value={profile.height} onChange={e=>updateProfile('height',e.target.value)}/></label>
          <label>Вес<input type="number" value={profile.weight} onChange={e=>updateProfile('weight',e.target.value)}/></label>
          <label>Возраст<input type="number" value={profile.age} onChange={e=>updateProfile('age',e.target.value)}/></label>
          <label>Активность<select value={profile.activity} onChange={e=>updateProfile('activity',e.target.value)}><option value="1.2">Низкая</option><option value="1.375">1–3 тренировки</option><option value="1.55">3–5 тренировок</option></select></label>
        </div>
        <div className="macros">
          <b>{calories}<small>ккал</small></b><b>{protein}<small>белки</small></b><b>{fat}<small>жиры</small></b><b>{carbs}<small>углеводы</small></b>
        </div>
      </Card>
      <Card title="Сегодня">
        <div className="calories"><strong>{Math.round(totals.cal)}</strong><span>из {calories} ккал · осталось {Math.max(0,calories-totals.cal)}</span></div>
        <div className="progress"><i style={{width:`${Math.min(100,totals.cal/calories*100)}%`}}/></div>
        <div className="macros mini"><b>{Math.round(totals.p)}<small>Б</small></b><b>{Math.round(totals.f)}<small>Ж</small></b><b>{Math.round(totals.c)}<small>У</small></b></div>
      </Card>
      <Card title="Добавить еду">
        <input placeholder="Название" value={food.name} onChange={e=>setFood({...food,name:e.target.value})}/>
        <div className="grid4">
          <input placeholder="ккал" type="number" value={food.cal} onChange={e=>setFood({...food,cal:e.target.value})}/>
          <input placeholder="Б" type="number" value={food.p} onChange={e=>setFood({...food,p:e.target.value})}/>
          <input placeholder="Ж" type="number" value={food.f} onChange={e=>setFood({...food,f:e.target.value})}/>
          <input placeholder="У" type="number" value={food.c} onChange={e=>setFood({...food,c:e.target.value})}/>
        </div>
        <button className="primary" onClick={addFood}>Добавить</button>
        {foods.map(x=><div className="entry" key={x.id}><b>{x.name}</b><span>{x.cal} ккал · Б {x.p} · Ж {x.f} · У {x.c}</span></div>)}
      </Card>
    </>}

    {tab==='reading' && <>
      <Card title="Чтение">
        <input value={book} onChange={e=>setBook(e.target.value)} placeholder="Название книги"/>
        <label>Минут<input type="number" value={minutes} onChange={e=>setMinutes(e.target.value)}/></label>
        <button className="primary" onClick={addReading}>Сохранить чтение</button>
      </Card>
      <Card title="История">{reading.length?reading.map(x=><div className="entry" key={x.id}><b>{x.book}</b><span>{x.minutes} мин · {x.date}</span></div>):<p className="muted">Записей пока нет.</p>}</Card>
    </>}

    {tab==='ai' && <Card title="Лена AI">
      <p className="insight">Я анализирую только те данные, которые ты сохраняешь внутри Lena OS. Сейчас вижу: {foods.length} записей питания сегодня, {reading.length} записей чтения и {load('workouts',[]).length} тренировок всего.</p>
      <p className="muted">Облачную нейросеть подключим отдельно, когда появится безопасный сервер и API.</p>
    </Card>}
  </main>
}
