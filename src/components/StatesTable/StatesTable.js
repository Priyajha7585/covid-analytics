import styles from './StatesTable.module.css'
import {IoIosArrowDown} from 'react-icons/io'
import {IoIosArrowUp} from 'react-icons/io'
import { useState } from 'react';
import Link from 'next/link';

const orderBy = (data, value, direction) => {
    if(direction === 'asc')
    {
        if(value=="state")
        {
            return [...data].sort((a,b) => a[value] > b[value] ? 1 : -1);
        }
        else{
            return [...data].sort((a,b) => parseInt(a[value]) > parseInt(b[value]) ? 1 : -1);
        }
    }
    if(direction==="desc")
    {
        if(value=="state")
        {
            return [...data].sort((a,b) => a[value] > b[value] ? -1 : 1);
        }
        else{
            return [...data].sort((a,b) => parseInt(a[value]) > parseInt(b[value]) ? -1 : 1);
        }
    }
    return data;
}

const SortArrow = ({direction}) =>
{
    if(!direction)
    {
        return <></>;
    }
    if(direction==="desc")
    {
        return <div className={styles.heading_arrow}><IoIosArrowDown color='inherit'/></div>
    }
    else{
        return <div className={styles.heading_arrow}><IoIosArrowUp color='inherit'/></div>
    }
}

const StatesTable = ({data}) => {
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();
    const orderByData = orderBy(data, value, direction);
    const switchDirection = () => {
        if(!direction)
        {
            setDirection('desc');
        }
        else if(direction==='desc')
        {
            setDirection('asc')
        }
        else{
            setDirection(null)
        }
    }
    const setValueAndDirection = (value) => {
        switchDirection();
        setValue(value);
    }
    return <div>
        <div className={styles.heading}>
            <div className={styles.heading_flag}>
                
            </div>
            <button className={styles.heading_name} onClick={()=>setValueAndDirection("state")}>
                <div>State Name</div>
                {value==="state" && <SortArrow direction={direction} />}
            </button>
            <button className={styles.heading_population} onClick={()=>setValueAndDirection("active")}>
                <div>Active Cases</div>
                {value==="active" && <SortArrow direction={direction} />}
            </button>
            <button className={styles.heading_area} onClick={()=>setValueAndDirection("confirmed")}>
                <div>Confirmed</div>
                {value==="confirmed" && <SortArrow direction={direction} />}
            </button>
            <button className={styles.heading_gini} onClick={()=>setValueAndDirection("deaths")}>
                <div>Deaths</div>
                {value==="deaths" && <SortArrow direction={direction} />}
            </button>
            <button className={styles.heading_gini} onClick={()=>setValueAndDirection("recovered")}>
                <div>Recovered</div>
                {value==="recovered" && <SortArrow direction={direction} />}
            </button>
        </div>
        {orderByData.map((state)=>
        
            <Link href={`/state/${state.state}`} key={state.state}>
        <div className={styles.row}>
                {/* <div className={styles.flag}>
                    <img src={state.flag} alt={state.name} />
                </div> */}
                <div className={styles.name}>{state.state}</div>
                <div className={styles.population}>{state.active}</div>
                <div className={styles.area}>{state.confirmed}</div>
                <div className={styles.area}>{state.deaths}</div>
                <div className={styles.gini}>{state.recovered}</div>
        </div>
            </Link>
        )}
    </div>
}

export default StatesTable;