import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery } from '../services/cryptoApi';
import Loader from './Loader';


const { Text, Title } = Typography;
const { Option } = Select

const CryptoDetails = () => {
   //To know the crypto details we are looking at, we'll need the coin id
   const { coinId } = useParams(); // use params takes the Id in the url and allows it to be used as a variable.
   const [ timePeriod, setTimePeriod ] = useState('7d');
   const { data, isFetching } = useGetCryptoDetailsQuery(coinId); //passing the id of the card we want to get more details on

   const cryptoDetails = data?.data?.coin;

   console.log(data)



   if (isFetching) return <Loader />

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  //getting the stats in an array format so it can easily be mapped over
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];


    return ( 
        <Col className='coin-detail-container'>
           <Col className='coin-heading-container'>
               <Title level={2} className='coin-name'>
                  {cryptoDetails.name} ({cryptoDetails.symbol}) Price   {/*slug means alternative name for that srypto*/}
               </Title>
               <p>
                  {cryptoDetails.name} live price in US dollars.
                  View value statistics, market cap and supply.
               </p>
           </Col>
           <Select 
            defaultValue="7d" 
            className="select-timeperiod" 
            placeholder="Select Timeperiod" 
            onChange={(value) => setTimePeriod(value)}
           >
            {time.map((date) => <Option key={date}>{date}</Option>)}
           </Select>
           <Col className="stats-container">
              <Col className="coin-value-statistics">
                  <Col className="coin-value-statistics-heading">
                     <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
                     <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                  </Col>
                  {/* Mapping over the statistics gotten from the api fetch */}
                  {stats.map(({ icon, title, value }) => (
                     <Col className="coin-stats">
                        <Col className="coin-stats-name">
                           <Text>{icon}</Text>
                           <Text>{title}</Text>
                        </Col>
                        <Text className="stats">{value}</Text>
                   </Col>
                  ))}
              </Col>
              <Col className="other-stats-info">
                  <Col className="coin-value-statistics-heading">
                     <Title level={3} className="coin-details-heading">Other Statistics</Title>
                     <p>An overview showing the statistics of all cryptocurrencies</p>
                  </Col>
                  {/* Mapping over the statistics gotten from the api fetch */}
                  {genericStats.map(({ icon, title, value }) => (
                     <Col className="coin-stats">
                        <Col className="coin-stats-name">
                           <Text>{icon}</Text>
                           <Text>{title}</Text>
                        </Col>
                        <Text className="stats">{value}</Text>
                   </Col>
                  ))}
              </Col>
           </Col>
           <Col className='coin-desc-link'>
              <Row className="coin-desc">
                  <Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Title>
                  {/* The description is in raw html format so it will be parsed with htmlreact parser */}
                  {HTMLReactParser(cryptoDetails.description)}
              </Row>
              <Col className="coin-links">
                  <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
                  {cryptoDetails.links?.map((link) => (
                     <Row className="coin-link" key={link.name}>
                        <Title level={5} className="link-name">{link.type}</Title>
                        <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                     </Row>
                  ))}
              </Col>
           </Col>
        </Col>
     );
}
 
export default CryptoDetails;