import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import InfiniteCalendar from './src/index'

var badges = {"20160612":2, "20160621":5};
var today = new Date();
var minDate = new Date(2014,0,1);
var nextweek = new Date(2016,5,29);

render(<InfiniteCalendar badges={badges} selectedDate={today} selectedDateEnd={nextweek} minDate={minDate} />,
  document.getElementById('root')
)
