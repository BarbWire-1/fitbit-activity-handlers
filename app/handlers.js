import document from 'document'
import { goals, today } from 'user-activity'

// This file is based on code written by BarbWire-1: https://github.com/BarbWire-1

const baseHandler = activityName => {
  // Returns an 'abstract base class' object for all 'real' activity handlers;
  // ie, the returned object contains properties common to ALL activity types.
  // Objects of this type cannot be used directly because they don't contain all necessary properties.
  // Properties that differ between activity types must be implemented in sub-classed objects; those properties will be called by properties in this object.
  const obj = {}

  const el = document.getElementById(activityName)

  Object.defineProperty(obj, 'stats', {
    // Returns all activity statistics.
    // It's inefficient to calculate and return stuff that won't be used every time (eg, goal). However...
    get: function() {
      const myAdjusted = obj.adjusted         // calls property in sub-classed object
      let myProgress = myAdjusted / obj.goal  // obj.goal is obtained from sub-classed object
      if (myProgress > 1) myProgress = 1
      return {adjusted:myAdjusted, goal:obj.goal, progress:myProgress}
    }
  })

  obj.update = () => {
    // Change size of <rect> based on activity progress.
    el.width = obj.stats.progress * 100
  }

  return obj
}

export const standardHandler = activityName => {
  // Returns a subclassed object using baseHandler as the base, with added properties to access the API for 'standard' activity types such as calories.
  const obj = baseHandler(activityName)   // create a base-class object

  // We determine the goal and store it, so we don't have to determine it every time it's needed.
  // Accessing obj.goal is about 100 times quicker than accessing goals[activityName].
  // obj.goal can be accessed from properties defined in the 'base class' (baseHandler).
  obj.goal = goals[activityName]  // we could make this read-only using a getter

  Object.defineProperty(obj, 'adjusted', {
    // This property can be accessed from properties defined in the 'base class' (baseHandler).
    get: function() {
      return today.adjusted[activityName]
    }
  })

  return obj
}

export const azmHandler = () => {
  // Returns a subclassed object using baseHandler as the base, with added properties to implement AZM's idiosyncracies.
  const obj = baseHandler('activeZoneMinutes')   // create a base-class object

  // We determine the goal and store it, so we don't have to determine it every time it's needed.
  // Accessing obj.goal is about 100 times quicker than accessing goals[activityName].
  // obj.goal can be accessed from properties defined in the 'base class' (baseHandler).
  obj.goal = goals['activeZoneMinutes'].total  // we could make this read-only using a getter

  Object.defineProperty(obj, 'adjusted', {
    // This property can be accessed from properties defined in the 'base class' (baseHandler).
    get: function() {
      return today.adjusted['activeZoneMinutes'].total
    }
  })

  return obj
}

export const hourlyStepsHandler = () => {
  // Returns a subclassed object using baseHandler as the base, with added properties to implement stepsThisHour idiosyncracies.
  const obj = baseHandler('hourlySteps')   // create a base-class object

  // obj.goal can be accessed from properties defined in the 'base class' (baseHandler).
  obj.goal = 250  // we could make this read-only using a getter

  Object.defineProperty(obj, 'adjusted', {
    // This property can be accessed from properties defined in the 'base class' (baseHandler).
    get: function() { // stepsThisHour()
      return 125    // usually not, actually
    }
  })

  return obj
}