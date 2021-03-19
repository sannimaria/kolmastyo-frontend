
import './App.css';
import {useState,useEffect} from 'react';

//front-end yhteys
const URL = "https://localhost/kolmastyo/index.php";

function App() {

  const [tasks,setTasks] = useState([]);
  const [item, setItem] = useState('');

  useEffect(() => {
    let status = 0;
    fetch(URL + 'kanta.php')
    .then(res => {
      status = parseInt(res.status);
      return res.json();
    })
    .then(
      (res) => {
        if (status === 200) {
          setTasks(res);
        } else {
          alert(res.error)
        }
      },(error) => {
        alert('Häiriö järjestelmässä, yritä kohta uudelleen!');
      }
    )
  }, [])

  function save(e) {
    e.preventDefault();
    let status = 0;
    fetch(URL + 'create.php',{
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        description: item
      })
    })
    .then(res => {
      status = parseInt(res.status);
      return res.json()
    })
    .then(
      (res) => {
        if (status === 200) {
          setTasks(tasks => [...tasks,res]);
          setItem('');
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert('Häiriö järjestelmässä, yritä kohta uudelleen!')
      }
    )
  }

  return (
   <div className="container">
     <h3>Shopping list</h3>

     {/* Tuotteet ja kpl-määrä */}
     <form onSubmit={save}>
       <label>New item</label>
       <input value={item} onChange={e => setItem(e.target.value)} />
       <input value={item} onChange={e => setItem(e.target.value)} />
       <button>Add</button>
     </form>

      {/* Lista */}
     <ol>
       {tasks.map(item => (
         <li key={item.id}>{item.description}</li>
       ))}
     </ol>
   </div>
  );
}

export default App;
