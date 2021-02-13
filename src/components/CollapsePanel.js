import React from 'react'
import classes from './price.module.css'
import { Collapse } from 'antd';


const { Panel } = Collapse;



function CollapsePanel(props) {


          return (
            <div className={classes.price} key={props.item.id}>
              <Collapse>
                <span>
                  <span>{props.showUSD ? (props.item.priceUSD / 1.07 ).toFixed(2) + '$': (props.item.priceUSD * props.rate / 1.07).toFixed(2)}</span>
                  <span>{props.showUSD ? (props.item.priceUSD).toFixed(2) + '$' : (props.item.priceUSD * props.rate).toFixed(2)}</span>
                </span>
                <Panel header={props.item.model} key={props.item.id}>
                  <p>{props.item.discription}</p>
                </Panel>
              </Collapse>
            </div>
          )
}
export default CollapsePanel;
