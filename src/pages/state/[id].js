import Layout from "@/src/components/Layout/Layout";
import { useEffect, useState } from "react";
import styles from './State.module.css';
import covid from './Covid-Analytics.gif'
import Image from "next/image";

const getState = async(id) => {
    // const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);
    const res = await fetch(`https://data.covid19india.org/data.json`);
    const state = await res.json();
    const obj = state['statewise'].find(o=>o.state===id)
    // console.log(state['statewise'])
    return obj;
}

const State = ({state}) => {

    return (
        <Layout title={state.name}>
            {/* {state.state}
            {console.log(state)} */}
            <div className={styles.container}>
                <div className={styles.container_left}>
                    <div className={styles.overview_panel}>
                        <Image src={covid} alt={state.state} quality={70} style={{height:"100%", width:"100%"}}/>
                        <h1  className={styles.overview_name}>{state.state}</h1>
                    </div>
                </div>

                <div className={styles.container_right}>
                    <div className={styles.details_panel}>
                        <h4 className={styles.details_panel_heading}>Details</h4>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Active</div>
                            <div className={styles.details_panel_value}>{state.active}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Confirmed</div>
                            <div className={styles.details_panel_value}>{state.confirmed}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Recovered</div>
                            <div className={styles.details_panel_value}>{state.recovered}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Deaths</div>
                            <div className={styles.details_panel_value}>{state.deaths}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Delta Confirmed</div>
                            <div className={styles.details_panel_value}>{state.deltaconfirmed}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Delta Deaths</div>
                            <div className={styles.details_panel_value}>{state.deltadeaths}</div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Delta Recovered</div>
                            <div className={styles.details_panel_value}>{state.deltarecovered}</div>
                        </div>
                        <div className={styles.details_panel_borders}>
                            <div className={styles.details_panel_label}>Last Updated Time</div>
                            <div className={styles.details_panel_value}>{state.lastupdatedtime}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default State;

export const getServerSideProps = async({params}) => {
    console.log("Country id page")
    console.log(params)
    // const res = await fetch(`https://restcountries.com/v2/name/${params.id}`);
    const state = await getState(params.id);
    // console.log(country)
    return {
        props:{
            state:state
        }
    }
}