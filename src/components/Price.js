import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { itemData } from './../data/data'
import classes from './price.module.css'
import { Button } from 'antd';
import { Input } from 'antd';
import { Collapse } from 'antd';
import logo from './../img/logo.jpg'


const { Panel } = Collapse;

function Price() {
  const [allDataProduct, setAllDataProduct] = useState(itemData)
  const [product, setProduct] = useState(null)
  const [rate, setRate] = useState(0)
  const [inputValue, setValue] = useState('')

  const chengeInput = (e) => {
    setValue(e.currentTarget.value)
    inputValue.length === 1 ? setProduct(null) : console.log()
  }

  const clearValue = () => {
    setProduct(null)
    setValue('')
  }

  const findProduct = () => {
    const reg = new RegExp(inputValue, "i")
    const filt = allDataProduct.filter(item => {
      return reg.exec(item.discription)
    })
    setProduct(filt)
  }


  useEffect(() => {
    axios.get('https://www.nbrb.by/API/ExRates/Rates/145').then(resolve => {
      setRate(resolve.data.Cur_OfficialRate)
    })
  })

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

     
          <Input value={inputValue} placeholder='найди меня скорее...' onChange={chengeInput} onKeyPress={(e) => { e.key === 'Enter' && findProduct() }} className={classes.findInput} />
          <Button onClick={() => {
            findProduct()
          }} className={classes.button} >Find</Button>
          <Button onClick={() => {
            clearValue()
          }} className={classes.button}>Clear</Button>
   

        {!product ? <div></div> :
          <div className={classes.headerWrapp}>
            <div className={classes.model}>Model Cartridge</div>
            <div className={classes.priceWrapp}>
              <div className={classes.priceItem}>Retail</div>
              <div className={classes.priceItem}>Opt</div>
            </div>
          </div>
        }
        {!product ? <div className={classes.startPage}>
          <img src={logo} />
        </div> :
          product.map(item => {
            return (
              <div className={classes.price}>
                <Collapse>
                  <span>{(item.priceUSD * rate).toFixed(2)}</span>
                  <span>{(item.priceUSD * rate * 1.2).toFixed(2)}</span>
                  <Panel header={item.model} key={item.id}>
                    <p>{item.discription}</p>
                  </Panel>
                </Collapse>
              </div>
            )
          })}

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
