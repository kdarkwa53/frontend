import { normalize, schema } from "normalizr";
import { Select } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDropdownListFromAPI } from "../Modules/TransferMoney/duck/action";

const {Option} = Select

export const normalizeApplicationsData = (originalData) => {
    const application = new schema.Entity("applications");

    const applications = new schema.Array(application)

    const normalizedData = normalize(originalData, applications);

    return normalizedData;
};


export const unCamelCase = (s) =>{
    s = s.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    return s.split(/(?=[A-Z])/).join(' ');
}


export const createRules = (val)=>{
    val = filterValueSet(val)
    let rules = []
    rules.push({
        required: val?.isRequired,
        message: val?.errorMessage
    })
    if (val?.validationRules) {
        val?.validationRules.map((rule => (
            rules.push(
                {
                    pattern: rule?.regEx,
                    message: rule?.errorMessage
                }
            )
        )))
    }
    return rules
}

export const ShowOptions = (val)=>{
    val = filterValueSet(val)
    let newValueSet = val?.valueSet

    Object.values(newValueSet).map((option) => {
        const fields = Object.entries(option)

        return (
            <Option key={fields[0][1]} value={fields[0][1]}>{fields[1][1]}</Option>
        )
    })
}

export const ShowAPIOption = ({val})=>{
    
    console.log('value: ', val)
    // const [items, setItems] = useState('')
    // const dispatch = useDispatch()

    // try {
    //     dispatch(getDropdownListFromAPI(val.links[0]?.javolinRoute)).then((res) => {
    //         console.log('res: ', val.links[0])
    //         setItems(res)
    //     })

    // } catch (err) {

    // }
    // const _items = items ? items : []

    // _items?.map((option) => {
    //     const fields = Object.entries(option)

    //     return (
    //         <Option value={fields[0][1]}>{fields[1][1]}</Option>
    //     )
    // })
    return(
        < Option  > New </Option >
    )
        
}

export const statusColor = (status) => {
    switch (status) {
        case "INCOMPLETE":
            return "red"
        case "APPLY_FOR_PRE_APPROVAL":
            return "yellow"
        case "PASSED":
            return "blue"
        case "APPROVE":
            return "lime"
        case "PRE_APPROVE":
            return "volcano"
        case "DECLINE_PRE_APPROVAL":
            return "red"
        case "APPLY_FOR_APPROVAL":
            return "green"
        default:
            return "magenta";
        // DECLINE_PRE_APPROVAL	APPLY_FOR_APPROVAL APPLY_FOR_APPROVAL 

    }
}

export const filterValueSet = (data)=>{
    let newValueSet = {}
    let valueSet = data?.valueSet
    
    // eslint-disable-next-line array-callback-return
    valueSet.map((value)=>{
        let entries = Object.entries(value)
        const newLocal = [entries[0][1]];
        newValueSet[newLocal] = {
            ...value
        }
    })

    return {
        ...data,
        valueSet: newValueSet
    }
}

export const getRulesDefaultValues = (data) => {
   const newData = Object.values(data)
   let defaultValues = {}
   // eslint-disable-next-line array-callback-return
   newData.map((item)=>{
       if (item?.defaultValue)
        defaultValues[item.id] = item?.defaultValue
   })
    return defaultValues
}

export const fileterRules = (data, filt)=>{
    const newDate  = Object.values(data)
    const result = newDate.filter(d => !filt.includes(d.id));
    return result
}


export const customDatFormat = (date)=>{
    let time = new Date(date).toLocaleTimeString()
    let date_ = new Date(date).toLocaleDateString()

    return `${date_} ${time}`
}
// creates an array id for sub json object
export const formatRegulatoryQuestions = (data)=>{
    let res = []
    
    data?.map((item)=>{
        return(
            res.push(
                {
                    ...item,
                    id: ['regulatory', item.id]
                }
            ) 
            
        )
    })

    return res
}

export const formatRegResults = (data)=>{
    const res = []
    Object.entries(data).map((d)=>{
        return(
            res.push(
                {
                    "key": d[0],
                    "value": d[1]
                }
            )
        )
    })

    return res
}

export function* chunks(l) {
    for (let i = 0; i < l?.length; i = i + 5) {
        yield l.slice(i, i + 5)
    }
}

export const tagColor = (msg) => {
    switch (msg) {
        case "new!":
            return "lime"
        case "coming soon!":
            return "volcano"
        case "Bientôt disponible":
            return "volcano"
        case "nouvelle":
            return "lime"
        default:
            return "magenta";
    }
}

export const statusTagColor = (msg) => {
    switch (msg) {
        case "SUCCESS":
            return "lime"
        case "PENDING":
            return "yellow"
        case "FAILED":
            return "volcano"
        default:
            return "magenta";
    }
}

export const  removeByKey = (myObj, deleteKey) =>{
    delete myObj[deleteKey]

    return myObj
  }

export const spiltErrors = (sample) => {
    let message = "";
    if (sample) {
        Object.values(sample).map((e) => {
            return e.forEach((element) => {
                message += `${element}\n,`;
            });
        });
    } else {
        message = "Something went wrong";
    }

    return message;
};

export const sortListByDate = (data) => {
    const sorted = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    return sorted
}

export const currencyFormat = (val)=>{
    return Intl.NumberFormat().format(val)
}
export const generateID = () => {
    return Math.floor(Math.random() * 1000);
};


export const isEmpty = (obj) => {
    if (!obj) return true
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const normalizeIdData = (data)=>{
    let formattedData = {}

    Object.values(data).forEach(item => {
        formattedData[item.id] = {
            ...item
        }
    });
   


    return formattedData
}
export const normalizeOneIdData = (data)=>{

    return {
        [data.id]:{
            ...data
        }
    }
}
export const normalizeIdArrayData = (data) => {
    let formattedData = {}

    data.forEach((item) => {
        formattedData[item.id] = {
            ...item
        }
    })


    return formattedData
}

export const arrayToObjectByID= (data) => {
    let formattedData = {}

    data.map((item) => {

        return(
            formattedData[item.id] = {
                ...item
            }
        )
        
    })


    return formattedData
}


export const _getFee = () => {
    return new Promise((res, rej) => {
        setTimeout(() => res({fee:0.2}), 250)
    })
}
export const modules = {
    JAVOLIN_TO_JAVOLIN_TRANSFER: 'JAVOLIN_TO_JAVOLIN_TRANSFER',
    PURCHASE_AIRTIME:'PURCHASE_AIRTIME',
    JAVOLIN_TOP_UP:'JAVOLIN_TOP_UP',
    SEND_MOMO: 'SEND_MOMO'
}



