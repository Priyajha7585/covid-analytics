import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput'
// import CountriesTable from '../components/StatesTable/StatesTable'
import { useState } from 'react'
import CountryTable from '../components/CountryTable/CountryTable'

const inter = Inter({ subsets: ['latin'] })
  
export default function Home({data}) {
  console.log(data)
  const [keyword, setKeyword] = useState("");
  const filteredCountries = data.slice(1).filter(country => 
    country.country.toLowerCase().includes(keyword)
    );
  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase())
  }

  return <Layout>
    {/* {console.log(data)} */}
      {/* <div className={styles.counts}>Found {countries.length} countries</div> */}
    <div className={styles.inputContainer}>
      <div className={styles.input}>
        <SearchInput placeholder="Filter by Country" value={keyword} onChange={e=>onInputChange(e)}/>
      </div>
    </div>
    
    <CountryTable data={filteredCountries} />
  </Layout>
}

export const getStaticProps = async() => {
  // const res = await fetch('https://restcountries.com/v2/all');
  // const res = await fetch('https://data.covid19india.org/data.json');
  const res =await fetch('https://disease.sh/v3/covid-19/countries')
  const data = await res.json();
  // console.log(data['statewise'])
  console.log(data)
  return{
    props:{
      data,
    }
  }
}
