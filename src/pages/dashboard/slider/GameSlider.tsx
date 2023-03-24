import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Fade } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"

interface Game {
  _id?: number
  name?: string
  image: string
}

const zoomOutProperties = {
  duration: 1000,
  transitionDuration: 1000,
  infinite: true,
  indicators: false,
  scale: 0.4,
  arrows: false,
  pauseOnHover: false
};

const no_image = '/images/noImage.jpg'

const GameSlider = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [games, setGames] = useState<Game[]>([{
    image: no_image
  }])

  useEffect(() => {
    setIsLoading(true)
    axios
      .get('/game')
      .then((resp) => {
        setGames(resp.data.data)
        setIsLoading(false)
      })
      .catch(error => console.log(error.message))
  }, [])

  return (
    <div>
      {isLoading ?
        <div className="position-absolute top-50 start-50 spinner-border text-primary " />
        :
        <Fade {...zoomOutProperties}>
          {games.map((game, index) => (
            <div className="each-fade " key={index}>
              <img src={game.image} className='img-dash' />
              <h2 className='text-center'>{game.name}</h2>
            </div>
          ))}
        </Fade>
      }
    </div>

  )
}

export default GameSlider