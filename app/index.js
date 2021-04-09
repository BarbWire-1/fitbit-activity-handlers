import clock from 'clock'
import document from 'document'
import { handler } from './handlers'

const handlers

//********************************************************************************************* Start-up *****

;(function() {       //initialisation IIFE
  const energyHandler = handler('calories')
  const stepsHandler = handler('steps')
  handlers = [energyHandler, stepsHandler]

  clock.granularity = 'seconds'
  clock.ontick =  e => onTick(e.date)
})()

//********************************************************************************************** Running *****

function onTick(now) {

  handlers.forEach(handler => {
    console.log(`${handler.stats.progress}`)
  })
}
