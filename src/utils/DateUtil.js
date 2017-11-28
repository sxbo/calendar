
export const dateUtil = {

    //根据时间字符串得到时间戳
    getMillisecondsByDateFormat:(dateFormat)=>{
        let milliseconds = Date.parse(dateFormat.replace(/-/g,"/"));
        return milliseconds;
    },
    //根据时间戳得到Date对象
    getDateByMilliseconds:(milliseconds)=>{
        let date = new Date();
        date.setTime(milliseconds)
        return date;
    },
    //根据月份和号获取节日,暂不考虑阳历节日
    getFestival:(month,day)=>{
        const festivals = new Map([
            ['0101','元旦'],
            ['0214',"情人节"],
            ['0308',"妇女节"],
            ['0312',"植树节"],
            ['0405',"清明节"],
            ['0501',"劳动节"],
            ['0505',"端午节"],
            ['0601',"儿童节"],
            ['0701',"建党"],
            ['0801',"建军"],
            ['0909',"重阳节"],
            ['0910',"教师节"],
            ['1001',"国庆节"],
            ['1124',"感恩节"],
            ['1224',"平安夜"]
        ])
        let monthstr = month >=10?month.toString():('0'+month)
        let dayStr = day >= 10?day.toString():('0'+day)
        let key = monthstr + dayStr;
        let value = festivals.get(key)
        if(value){
            return value
        }else{
            value = "工作日"
        }
        
        return value
    },
    //一天毫秒数
    MILLISECOND: 1*24*60*60*1000,


    
}


