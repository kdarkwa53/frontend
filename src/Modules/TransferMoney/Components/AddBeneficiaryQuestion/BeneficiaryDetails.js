/* eslint-disable react-hooks/exhaustive-deps */



import { Select} from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom"
import { chunks } from '../../../../helpers/utils';
import BeneficiaryLayoutRoute from './BeneficiaryRoute';


const BeneficiaryDetails = (props) => {

    const beneQuestions = useSelector((state) => state.transfer?.filteredRules)
    const type = props?.location?.state?.type
    let { path } = useRouteMatch();
    const allQuestions = chunks(beneQuestions?.rules)
    var pages = []

    for (let val of allQuestions) {
        pages.push(val)
    }

    console.log("pages: ", pages)
    
    const totalPages = pages.length
    return (
        <Switch>
            {
                // eslint-disable-next-line array-callback-return
                

                pages.map((questions, i)=>{
                    if(i === 0){
                        
                        return(
                            <Route key={i} exact path={path}>
                                <BeneficiaryLayoutRoute pageNum={i+1} totalPages={totalPages} questions={questions} type={type} />
                            </Route>  
                        )
                        
                    }
                    else{
                        return(
                            <Route key={i} path={`${path}/${i}`}>
                                <BeneficiaryLayoutRoute pageNum={i+1} totalPages={totalPages} questions={questions} />
                            </Route> 
                        )
                        
                    }
                    
                })
            }
           

        </Switch>
    )
};

export default BeneficiaryDetails