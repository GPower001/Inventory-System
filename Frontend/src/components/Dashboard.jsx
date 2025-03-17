import React, {useState, useEffect} from 'react'
import './dashboard.css'
import Cards from './Cards';
import Reports from './Reports';
import RecentSales from './RecentSales';
import TopSelling from './TopSelling';
import RecentActivities from './RecentActivities';
import BudgetReport from './BudgetReport';


function Dashboard() {
    const [cards, setCards] = useState([])

    const fetchData = () => {
        fetch('http://localhost:5000/cards')
            .then(res => res.json())
            .then(data => {
                setCards(data);
            })
            .catch(e => console.log(e.message));
    };

    useEffect(() =>{
        fetchData();
    }, []);
     
  return (
    <section className='dashboard section'>
        <div className="row">
            <div className="col-lg-8">
                <div className="row">
                    {
                        cards && cards.length>0 && 
                        cards.map(card=><Cards key={card._id} card={card}/>)
                    }
                    <div className='col-12'>
                        <Reports/>
                    </div>
                    <div className='col-12'>
                        <RecentSales/>
                    </div>
                    <div className='col-12'>
                        <TopSelling/>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <RecentActivities/>
                <BudgetReport/>
            </div>
        </div>
    </section>
  )
}

export default Dashboard
