import classes from './price.module.css'
import { Collapse } from 'antd';
import logo from './../img/logo.jpg'
import CollapsePanel from './CollapsePanel';


const { Panel } = Collapse;

function SelectedProduct (props) {

  return (
      <div className={classes.allWrapper}>
        {!props.product ? <div className={classes.startPage}>
          <img src={logo} />
        </div> :
          props.product.map(item => {
            return (
              <CollapsePanel item={item} rate={props.rate} showUSD={props.showUSD}/>
            )
          })}
      </div>
  );
}

export default SelectedProduct;
