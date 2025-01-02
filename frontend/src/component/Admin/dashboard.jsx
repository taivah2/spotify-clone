import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Nav from './Nav';
import ReactEcharts from 'echarts-for-react';
import './Dashboard.css'
const dashboard = () => {
  const lineChartOptions = {
    title: {
      text: 'Revenue'  ,
      textStyle: {
        color: 'white',  
        fontSize: 20,     
        fontWeight: 'bold', 
      },
    },

    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Album Sales', 'Expenses'],
      top: '5%',
      textStyle: {
        color: '#white',
        fontSize: 14,    
      },
    },
    grid: {
      left: '1%',
      right: '5%',
      bottom: '5%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        color: 'white',   
        fontSize: 12,       
      },
      data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'fri', 'Sat'],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'white',  
        fontSize: 12,      
      },
    },
    series: [
      {
        name: 'Album Sales',
        type: 'line',
        stack: 'Total',
        data: [5000, 15000, 13000, 10000, 27960, 45892, 36540],
        lineStyle: {
          color: '#e74c3c', 
          width: 3,        
        },
        itemStyle: {
          color: '#e74c3c',  
        },
      },
      {
        name: 'Expenses',
        type: 'line',
        stack: 'Total',
        data: [6000, 64805, 23645, 32100, 78951, 49520, 62150],
        lineStyle: {
          color: '#2ecc71',  // Line color for 'Expenses'
          width: 3,          // Line width
        },
        itemStyle: {
          color: '#2ecc71',  // Item color for 'Expenses'
        },
      }
    ],
  };
  return (
    <div>
      <Nav/>
      {/* Content */}
      <div className='wrapper-dashboard'>
        <h5 className='name-over'>Overview</h5>
        <div className='total-over'>
          <div className='totalSong'>
            <img className='img-wrapper' src='/song.png' />
            <h1 className='h1-wrapper'>12,500K</h1>
            <h3 className='h3-wrapper'>Total Songs</h3>
          </div>
          <div className='totalArtist'>
            <img className='img-wrapper' src='/artist.png' />
            <h1 className='h1-wrapper' style={{ color: "cornflowerblue" }}>8,850</h1>
            <h3 className='h3-wrapper'>Total Artists</h3>
          </div>
          <div className='totalTrack'>
            <img className='img-wrapper' src='/track.png' />
            <h1 className='h1-wrapper' style={{ color: "darkseagreen" }}>4,183K</h1>
            <h3 className='h3-wrapper'>Total Tracks</h3>
          </div>
          <div className='totalAlbum'>
            <img className='img-wrapper' src='/album.png' />
            <h1 className='h1-wrapper' style={{ color: "skyblue" }}>8,451K</h1>
            <h3 className='h3-wrapper'>Total Albums</h3>
          </div>
        </div>
        {/*Chart */}
        <div className="chart-container">
          <ReactEcharts option={lineChartOptions} style={{ height: '400px', width: '170vh' }} />
        </div>
      </div>
    </div>

  )
}

export default dashboard
