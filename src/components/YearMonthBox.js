/**
 * 左侧存放年月组建的盒子
 */
import React from 'react'
import {render} from 'react-dom'
import styled from 'styled-components'

import Year from './Year'
import Month from './Month'
import {dateUtil} from '../utils/DateUtil'

const Root = styled.div`
    width:20%;
    display:flex;
    flex-direction:column;
`

class YearMonthBox extends React.Component{

    render(){
        return (
            <Root>
                    <Year/>
                    <Month/>
            </Root>
        )
    }
}

export default YearMonthBox