import clock from 'clock'
import document from 'document'
import { standardHandler, azmHandler } from './handlers'

const handlers

//********************************************************************************************* Start-up *****

;(function() {       //initialisation IIFE
  console.log(`before ${typeof azmHandler()}`)
  const timeHandler = azmHandler()
console.log(`after ${timeHandler}`)
  const energyHandler = standardHandler('calories')
  const stepsHandler = standardHandler('steps')
  const distHandler = standardHandler('distance')
  const floorsHandler = standardHandler('elevationGain')
  handlers = [energyHandler, stepsHandler, distHandler, floorsHandler, timeHandler]

  clock.granularity = 'seconds'
  clock.ontick =  e => onTick(e.date)
})()

//********************************************************************************************** Running *****

function onTick(now) {

  handlers.forEach(handler => {
    console.log(`${handler.stats.adjusted} ${handler.stats.goal} ${handler.stats.progress}`)
  })
}
