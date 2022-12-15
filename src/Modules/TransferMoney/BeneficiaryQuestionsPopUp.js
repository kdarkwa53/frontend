


import { Button, Col, Form, Input, Modal, Row } from "antd"
import MainStyles from "../../Shared/Components/Menu/Menu.module.css"
import Styles from "../TransferMoney/TransferMoney.module.css"

import { XIcon } from "../../Shared/Components/JavIcons";
import JavContentTitle from "../../Shared/Components/JavContentTitle";
import { useDispatch, useSelector } from "react-redux";
import { addBeneValues, validateIBAN } from "./duck/action";
import { useHistory } from "react-router";
import { useState } from "react";
import { chunks } from "../../helpers/utils";
import SwipeableViews from "react-swipeable-views";
import BeneficiaryLayoutRoute from "./Components/AddBeneficiaryQuestion/BeneficiaryRoute";
import BeneficiaryLayoutRoute2 from "./Components/AddBeneficiaryQuestion/BeneficiaryRoute2";



const BeneficiaryQuestionsPopUp = ({ isVisible, setVisible, type}) => {

    const [indexValue, setIndexValue] = useState(0)

    const prevSlide = () => {
        let newIndex = indexValue
        newIndex = newIndex - 1

        setIndexValue(newIndex)
    }


   

    const handleCancel = () => {
        setVisible(false);
    };

    const beneQuestions = useSelector((state) => state.transfer?.filteredRules)
    const allQuestions = chunks(beneQuestions?.rules)
    var pages = []

    for (let val of allQuestions) {
        pages.push(val)
    }

    
    const totalPages = pages.length


    return (
        <>

            <Modal open={isVisible} onCancel={handleCancel}
                footer={false}
                centered
                closeIcon={
                    <div className="circle-close">
                        <XIcon width="1em" height="1em" />
                    </div>
                }
                bodyStyle={
                    {
                        padding: 0,
                        border: "16px 16px 0 0"
                    }
                }

                width="1000px"
            >
                <div className={MainStyles.jav_modal_header}>
                    <div className={MainStyles.jav_modal_secTitle}>Beneficiary Information</div>
                </div>

               <SwipeableViews
               axis='x'
               index={indexValue}
               width="1000px"
               >

                {
                    pages.map((questions, i)=>{
                    
                        if(i === 0){
                            
                            return(
                                    <BeneficiaryLayoutRoute2 pageNum={i+1} setClose={setVisible} totalPages={totalPages} questions={questions} setIndexValue={setIndexValue} indexValue={indexValue} type={type}  />
                            )
                            
                        }
                        else{
                            return(
                                    <BeneficiaryLayoutRoute2 pageNum={i+1} setClose={setVisible}  totalPages={totalPages} setIndexValue={setIndexValue} indexValue={indexValue} questions={questions} />
                            )
                            
                        }
                        
                    })
                }
               </SwipeableViews>

            </Modal>
        </>

    )

}


export default BeneficiaryQuestionsPopUp