import styles from './CountryTable.module.css'
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

const CountryTable = ({data}) => {
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
            <button className={styles.heading_name} onClick={()=>setValueAndDirection("country")}>
                <div>Country Name</div>
                {value==="country" && <SortArrow direction={direction} />}
            </button>
            <button className={styles.heading_population} onClick={()=>setValueAndDirection("active")}>
                <div>Active Cases</div>
                {value==="active" && <SortArrow direction={direction} />}
            </button>
            <button className={styles.heading_area} onClick={()=>setValueAndDirection("cases")}>
                <div>Confirmed</div>
                {value==="cases" && <SortArrow direction={direction} />}
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
        {orderByData.map((country)=>
        
            <Link href={`/country/${country.country}`} key={country.country}>
        <div className={styles.row}>
                <div className={styles.flag}>
                    <img src={country.countryInfo.flag} alt={country.country} />
                </div>
                <div className={styles.name}>{country.country}</div>
                <div className={styles.population}>{country.active}</div>
                <div className={styles.area}>{country.cases}</div>
                <div className={styles.area}>{country.deaths}</div>
                <div className={styles.gini}>{country.recovered}</div>
        </div>
            </Link>
        )}
    </div>
}

export default CountryTable;