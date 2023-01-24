import Layout from "@/src/components/Layout/Layout";
import { useEffect, useState } from "react";
import styles from './Country.module.css';
import covid from './Covid-Analytics.gif'
import Image from "next/image";

const getCountry = async(id) => {
    const res = await fetch(`https://disease.sh/v3/covid-19/countries/${id}`);
    // const res = await fetch(`https://data.covid19india.org/data.json`);
    const country = await res.json();
    // const obj = state['statewise'].find(o=>o.state===id)
    // console.log(state['statewise'])
    return country;
}

const Country = ({country}) => {

    return (
        <Layout title={country.country}>
            {/* {state.state}
            {console.log(state)} */}
            {/* {console.log(country)} */}
            <div className={styles.container}>
                <div className={styles.container_left}>
                    <div className={styles.overview_panel}>
                        <img src={country.countryInfo.flag} alt={country.name}/>
                        {/* <Image src={country.countryInfo.flag} alt={country.country} quality={70} style={{height:"100%", width:"100%"}}/> */}
                        <h1  className={styles.overview_name}>{country.country}</h1>
                    </div>
                </div>

                <div className={styles.container_right}>
                    <div className={styles.details_panel}>
                        <h4 className={styles.details_panel_heading}>Details</h4>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Active</div>
                            <div className={styles.details_panel_value}>{country.active}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Confirmed</div>
                            <div className={styles.details_panel_value}>{country.cases}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Recovered</div>
                            <div className={styles.details_panel_value}>{country.recovered}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Deaths</div>
                            <div className={styles.details_panel_value}>{country.deaths}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Critical</div>
                            <div className={styles.details_panel_value}>{country.critical}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Tests</div>
                            <div className={styles.details_panel_value}>{country.tests}</div>
                        </div>
                        {/* <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Recovered</div>
                            <div className={styles.details_panel_value}>{country.deltarecovered}</div>
                        </div> */}
                        <div className={styles.details_panel_borders}>
                            <div className={styles.details_panel_label}>Population</div>
                            <div className={styles.details_panel_value}>{country.population}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Country;

export const getServerSideProps = async({params}) => {
    // console.log("Country id page")
    // console.log(params)
    const res = await fetch(`https://disease.sh/v3/covid-19/countries/${params.id}`);
    const country = await res.json();
    // console.log(country)
    return {
        props:{
            country
        }
    }
}