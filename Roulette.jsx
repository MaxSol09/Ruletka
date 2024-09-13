import React, { useState, useEffect } from 'react';



const Roulette = () => {
    const [items, setItems] = useState([])
    const [result, setResult] = useState(null)

    const rouletteItems = [
      { color: 'red', rating: 1 },
      { color: 'yellow', rating: 2 },
      { color: 'green', rating: 3 },
      { color: 'blue', rating: 4 },
      { color: 'grey', rating: 5 },
      { color: 'black', rating: 6 },
      { color: 'purple', rating: 7 },
  ];

    const getRandomItem = () => {
      const total = rouletteItems.reduce((sum, item) => sum + item.rating * 2, 0)
      const randomItem = Math.floor(Math.random() * total)
      
      let sum = 0
    
      for (let item of rouletteItems) {
          sum += item.rating * 2
          if (randomItem < sum) {
              return item
          }
      }
    };

    const start = (spinTime) => {
        setItems([])

        const interval = setInterval(() => {
            setItems(prevItems => [...prevItems, getRandomItem()])
        }, 100)

        setTimeout(() => {
            clearInterval(interval)
            setItems(prevItems => [...prevItems, getRandomItem()])
        }, spinTime)
    }

    const getMiddleItem = (arr) => {
        if (arr.length === 0) return
        const middleIndex = Math.floor(arr.length / 2)
        return arr[middleIndex].color
    }

    useEffect(() => {
        setResult(getMiddleItem(items))
    }, [items])

    
    return (
        <div className='flex flex-col items-center justify-center min-h-screen space-y-3'>
            <h1 className='text-2xl'>Рулетка</h1>
            <div className='relative overflow-hidden w-[500px] rounded-lg border-2'> 
                <div className='absolute inset-y-0 left-1/2 transform -translate-x-1/2 bg-gray-600 w-1 z-10' />
                <div className='flex justify-center items-center relative'>
                    {(items.length > 5 ? items : rouletteItems).map((item, index) => (
                        <div className='flex justify-center items-center rounded-lg m-[5px] transition-custom flex-wrap p-[40px]' key={index} style={{
                            backgroundColor: item.color,
                        }}>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={() => start(5000)} className='py-1 px-4 text-xl text-white-200 bg-green-200'>Start</button>
            {items.length > 5 && <div>Тебе выпал: {result}</div>}
        </div>
    )
}

export default Roulette