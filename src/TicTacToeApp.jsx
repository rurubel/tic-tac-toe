import { useEffect, useState } from 'react'

const boardStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '4px',
    width: '300px',
    height: '300px',
}

const tileStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    background: '#eee',
    cursor: 'pointer',
    border: "2px solid gray",
}

// o, x 타일 스타일 추가
const oStyle = {
    color: "white",
    background: "black",
}

const xStyle = {
    color: "black",
    background: "white",
}

function Tile({ index, type, onTileClick }) {
    // 기본 타일 스타일과 함께 필요한 경우 o, x 스타일 적용
    return <button style={{
        ...tileStyle,
        ...(type === null ? {} : (type === 'o' ? oStyle : xStyle))
    }} onClick={() => onTileClick(index)}>{type ?? "-"}</button>
}

function checkWinner(tiles) {
    for (let i = 0; i < 9; i += 3) {
        if (tiles[i] !== null && tiles[i] === tiles[i + 1] && tiles[i] === tiles[i + 2]) {
            return tiles[i]
        }
    }
    for (let i = 0; i < 3; i++) {
        if (tiles[i] !== null && tiles[i] === tiles[i + 3] && tiles[i] === tiles[i + 6]) {
            return tiles[i]
        }
    }
    if (tiles[0] !== null && tiles[0] === tiles[4] && tiles[0] === tiles[8]) {
        return tiles[0]
    }
    if (tiles[2] !== null && tiles[2] === tiles[4] && tiles[2] === tiles[6]) {
        return tiles[2]
    }
    return null
}

function TicTacToeApp() {
    const [tiles, setTiles] = useState(Array(9).fill(null))
    const [currentTurn, setCurrentTurn] = useState('o')
    const [winner, setWinner] = useState(null)
    
    useEffect(() => {
        const result = checkWinner(tiles)
        if (result) {
            setWinner(result)
        } else {
            if (tiles.every(tile => tile !== null)) {
                setWinner('draw')
            }
        }
    }, [tiles])
    
    const changeTurn = () => {
        setCurrentTurn(currentTurn => currentTurn === 'o' ? 'x' : 'o')
    }
    
    const onTileClick = (index) => {
        if (tiles[index] === null && winner === null) {
            setTiles(tiles => {
                const newTiles = [...tiles]
                newTiles[index] = currentTurn
                return newTiles
            })
            changeTurn()
        }
    }
    
    return <div>
        <h1>현재 차례: {currentTurn}</h1>
        <div style={boardStyle}>
            {
                tiles.map((tile, index) => {
                    return <Tile key={index} index={index} type={tile} onTileClick={onTileClick} />
                })
            }
        </div>
        {winner && <div>
            {
                winner === 'draw' ? <h1>비겼습니다!</h1> : <h1>Winner: {winner}</h1>
            }
            <button onClick={() => {
                setTiles(Array(9).fill(null))
                setWinner(null)
                setCurrentTurn('o')
            }}>다시하기</button>
        </div>}
    </div>
}

export default TicTacToeApp