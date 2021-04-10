import clock from 'clock'
import document from 'document'
import { standardHandler, azmHandler, hourlyStepsHandler } from './handlers'

const handlers

//********************************************************************************************* Start-up *****

;(function() {       //initialisation IIFE
  console.log(`before ${typeof azmHandler()}`)
  const myEnergyHandler = standardHandler('calories')
  const myStepsHandler = standardHandler('steps')
  const myDistHandler = standardHandler('distance')
  const myFloorsHandler = standardHandler('elevationGain')
  const myAzmHandler = azmHandler()
  const myHourlyStepsHandler = hourlyStepsHandler()
  handlers = [myEnergyHandler, myStepsHandler, myDistHandler, myFloorsHandler, myAzmHandler, myHourlyStepsHandler]

  clock.granularity = 'seconds'
  clock.ontick =  e => onTick(e.date)
})()

//********************************************************************************************** Running *****

function onTick(now) {

  handlers.forEach(handler => {
    console.log(`${handler.stats.adjusted} ${handler.stats.goal} ${handler.stats.progress}`)
  })
}
