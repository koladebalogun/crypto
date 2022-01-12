import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import Loader from './Loader';

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => { //Simplified has been passed as props from the homepage
    const count = simplified ? 10 : 100//count variable that will show a specific number eg: if we are in a simplified view, show 10 else 100 and the count variable will be passed to useGetCryptosQuery
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);//changed the name of the data to (cryptoslist)
    const [ cryptos, setCryptos ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('');

    // console.log(cryptos)

    useEffect(() => { //For search
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

        setCryptos(filteredData);

    }, [cryptosList, searchTerm])


    if(isFetching) return <Loader /> ;

    return ( 
        <>
            {!simplified && (
                <div className='search-crypto'>
                    <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
            )}
            <Row gutter={[32,32]} className='crypto-card-container'>
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card 
                                title={`${currency.rank}.${currency.name}`} 
                                extra={<img className='crypto-image' src={currency.iconUrl} />}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
     );
}
 
export default Cryptocurrencies;