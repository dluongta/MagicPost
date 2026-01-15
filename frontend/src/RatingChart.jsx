import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
}
from 'recharts';

const RATING_BANDS = [
  { y1: 0,    y2: 1200, fill: '#CCCCCC', label: 'Newbie' },      // Xám
  { y1: 1200, y2: 1400, fill: '#77FF77', label: 'Pupil' },       // Xanh lá
  { y1: 1400, y2: 1600, fill: '#77DDFF', label: 'Specialist' },  // Xanh ngọc
  { y1: 1600, y2: 1900, fill: '#AAAAFF', label: 'Expert' },      // Xanh dương
  { y1: 1900, y2: 2100, fill: '#FF88FF', label: 'CM' },          // Tím
  { y1: 2100, y2: 2300, fill: '#FFCC88', label: 'Master' },      // Cam nhạt
  { y1: 2300, y2: 2400, fill: '#FFBB55', label: 'IM' },          // Cam đậm
  { y1: 2400, y2: 2600, fill: '#FF7777', label: 'GM' },          // Đỏ
  { y1: 2600, y2: 3000, fill: '#FF3333', label: 'IGM' },         // Đỏ đậm
  { y1: 3000, y2: 4000, fill: '#AA0000', label: 'LGM' },         // Đỏ đen
];

const generateData = () => {
  const data = [];
  let rating = 1500;
  for (let year = 2010; year <= 2026; year++) {
    for (let i = 0; i < 6; i++) {
      rating += Math.floor(Math.random() * 100) - 30; 
      if (rating > 3800) rating = 3800; 
      
      data.push({
        date: new Date(year, i * 2, 1).getTime(), 
        rating: rating,
        contestName: `Codeforces Round #${year * 10 + i}`
      });
    }
  }
  return data;
};

const data = generateData();

const formatXAxis = (tickItem) => {
  const date = new Date(tickItem);
  return date.getFullYear();
};

const RatingChart = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f0f0f0' }}>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
        <select style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option>Only rated</option>
          <option>All submissions</option>
        </select>
      </div>

      {/* Main Chart Container */}
      <div style={{ 
        border: '1px solid #999', 
        backgroundColor: '#fff', 
        padding: '10px 10px 0 0',
        position: 'relative',
        height: '500px'
      }}>
        
        <div style={{
          position: 'absolute',
          top: 18,
          right: 10,
          zIndex: 10,
          backgroundColor: 'rgba(255,255,255,0.8)',
          border: '1px solid #ccc',
          padding: '2px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '12px'
        }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#FFD700' }}></div>
          <span>dluongta</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#ccc" />

            {RATING_BANDS.map((band, index) => (
              <ReferenceArea
                key={index}
                y1={band.y1}
                y2={band.y2}
                fill={band.fill}
                stroke="none"
                ifOverflow="extendDomain"
              />
            ))}

            <XAxis 
              dataKey="date" 
              type="number" 
              domain={['dataMin', 'dataMax']} 
              tickFormatter={formatXAxis}
              tickCount={10}
              tick={{ fontSize: 12 }}
            />

            <YAxis 
              domain={[1200, 4000]} 
              ticks={[1200, 1400, 1600, 1900, 2100, 2300, 2400, 2600, 3000]}
              tick={{ fontSize: 11 }}
            />

            <Tooltip 
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />

            <Line
              type="monotone" 
              dataKey="rating"
              stroke="#FFD700" 
              strokeWidth={2}
              dot={{ stroke: '#FFD700', strokeWidth: 1, fill: 'white', r: 3 }} // Chấm tròn trắng viền vàng
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RatingChart;