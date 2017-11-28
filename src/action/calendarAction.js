import {actionType} from './R'
import {dateUtil} from '../utils/DateUtil'

const get35DaysDate = (startMillis)=>{
    let data = []
    for(let i=0;i<35;i++){
        let date = dateUtil.getDateByMilliseconds(startMillis+dateUtil.MILLISECOND*i)
        let month = date.getMonth()+1;
        let month2 = month >= 10?month:('0'+month);
        let daynum = date.getDate();
        let daynum2 = daynum >= 10?daynum:('0'+daynum);
        data.push(
            {
                //几号
                dayNumber:month2+'-'+daynum2,
                //是否周末
                weekable:date.getDay() ===0 ||date.getDay() ===6,
                //日子类型，某个节日，工作日，或者周末
                dayType:dateUtil.getFestival(month,daynum)
            }
        );
    }

    return data;
} 

export default {
    //选中某年时
    select_calendar_year:(year)=>dispatch=>{
        // let date1Millis = dateUtil.getMillisecondsByDateFormat(time);
        // let date = dateUtil.getDateByMilliseconds(date1Millis);
        // let daycount = date.getDay();
        // //得到开始时间的时间戳
        // let startMillis = date1Millis-dateUtil.MILLISECOND*daycount
        // let data35 = get35DaysDate(startMillis);
        dispatch(
            {
                type:actionType.CALENDAR_SELECT_YEAR,
                data:year
            }
        )
    },
    //选中某月时
    select_calendar_month:(month)=>(dispatch,getState)=>{
        // let time = getState().calendar.year+'-'+month+'-'+'01'+' 00:00:00'
        // let date1Millis = dateUtil.getMillisecondsByDateFormat(time);
        // let date = dateUtil.getDateByMilliseconds(date1Millis);
        // let daycount = date.getDay();
        // let startMillis = date1Millis-dateUtil.MILLISECOND*daycount
        // let data35 = get35DaysDate(startMillis);
        // console.log(data35)
        dispatch({
            type:actionType.CALENDAR_SELECT_MONTH,
            data:month
        }
        )

    }

}