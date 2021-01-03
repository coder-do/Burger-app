import React from 'react';
import BurgerIngedinent from './BurgerIngredinent/BurgerIngedinent';
import './Burger.sass';

const Burger = (props) => {
    let transform = Object.keys(props.ingredinents)
          .map(igKey => {
              return [...Array(props.ingredinents[igKey])]
                .map((item, i) => {
                    return <BurgerIngedinent key={igKey + i} type={igKey} />
                });
          })
          .reduce((arr, el) => {
              return arr.concat(el);
          }, []);
    if(transform.length === 0) {
        transform = <p className='add'>Please add an ingredient</p>
    }
    return (
        <div className='burger'>
            <BurgerIngedinent type='BreadTop'/>
                {transform}
            <BurgerIngedinent type='BreadBottom'/>
        </div>
    );
}

export default Burger;
