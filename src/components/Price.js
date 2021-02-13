import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { itemData } from './../data/data'
import classes from './price.module.css'
import { Button, Space, Input } from 'antd';
import SelectedProduct from './SelectedProduct';
import AllProductPage from './AllProduct';

const { Search } = Input;

function Price() {
  const [product, setProduct] = useState(null)
  const [rate, setRate] = useState(2.6)
  const [inputValue, setValue] = useState('')
  const [shown, setShown] = useState(true)
  const [showUSD, setShowUSD] = useState(false)

  const showAll = () => {
    shown ? setShown(false) : setShown(true)
  }

  const chengeInput = (e) => {
    setValue(e.currentTarget.value)
    inputValue.length === 1 ? setProduct(null) : console.log()
  }

  const clearValue = () => {
    setShown(false)
    setProduct(null)
    setValue('')
  }

  const exchange = () => {
    showUSD ? setShowUSD(false) : setShowUSD(true)
  }

  const findProduct = () => {
    if (inputValue === 'exchange') {
      exchange()
    } else
      if (inputValue) {
        setShown(false)
        const reg = new RegExp(inputValue, "i")
        const filt = itemData.filter(item => {
          return reg.exec(item.discription)
        })
        setProduct(filt)
      }

  }



  useEffect(() => {
    axios.get('https://www.nbrb.by/API/ExRates/Rates/145').then(resolve => {
      setRate(resolve.data.Cur_OfficialRate)
    }).catch(() => {
      console.log('error')
    })
  }, [])

  return (
    rate ?
      <div className={classes.allWrapper}>
        <div className={classes.headWrapp}>
          <div className={classes.headerHighLine}>
            <div>Jewel</div>
            <div>Курс НБРБ: {rate}</div>
          </div>
          <h4>Прайс Картриджи</h4>
        </div>
        <div className={classes.findInput}>
          <Space>
            <Search value={inputValue} placeholder='найди меня скорее...' onChange={chengeInput} onSearch={findProduct} size={'middle'} className={classes.findInputSpace}/>
          </Space>
        </div>
        <div className={classes.buttonWrapper}>
          <Button onClick={() => {
            clearValue()
          }} className={classes.button}>Clear</Button>
          <Button onClick={() => {
            showAll()
          }} className={classes.button}>{shown ? 'Hide all' : 'Show all'}</Button>
          {/* <Button onClick={() => {

          }} className={classes.button}>{showUSD ? 'Exchange to BYN' : 'Exchange to USD'}</Button> */}
        </div>


        <div className={classes.headerWrapp}>
          <div className={classes.model}>Model Cartridge</div>
          <div className={classes.priceWrapp}>
            <div className={classes.priceItem}>Retail</div>
            <div className={classes.priceItem}>Opt</div>
          </div>
        </div>


        {shown ? <AllProductPage itemData={itemData} rate={rate} showUSD={showUSD} /> :
          <SelectedProduct product={product} rate={rate} showUSD={showUSD} />}

        <div className={classes.headWrapp}>
          <div className={classes.headerHighLine}>
            <div><a href='https://boxopt.by/' target="blank">boxopt.by</a></div>
            <div>+375 29 358 81 81</div>
          </div>
        </div>

      </div> : <div>waiting...</div>
  );
}

export default Price;
