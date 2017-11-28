import {actionType} from '../action/R'

const initState = {
    year:new Date().getFullYear(),
    month:new Date().getMonth()+1,
    day:new Date().getDate(),
    data35:null,

}

export default function(state=initState,action){
    switch (action.type) {
        case actionType.CALENDAR_SELECT_MONTH:
            return {
                ...state,
                month:action.data
            }
        case actionType.CALENDAR_SELECT_YEAR:
            return{
                ...state,
                year:action.data
            }
        default :
            return state
    }
}


