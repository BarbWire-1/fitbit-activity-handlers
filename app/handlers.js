import { goals, today } from 'user-activity'

// This file is based on code written by BarbWire-1: https://github.com/BarbWire-1

const baseHandler = activityName => {
  // Virtual base class for all activity handlers. It should not be instantiated directly.
  // The returned object contains properties common to ALL activity types.
  // Properties that differ between activity types must be implemented in sub-classed objects; those properties will be called by this object.
  const obj = {}

  Object.defineProperty(obj, 'stats', {
    get: function() {
      const myAdjusted = obj.adjusted   // calls property in sub-classed object
      const myGoal = obj.goal           // calls property in sub-classed object
      let myProgress = myAdjusted / myGoal
      if (myProgress > 1) myProgress = 1
      return {adjusted:myAdjusted, goal:myGoal, progress:myProgress}
    }
  })

  return obj
}

export const standardHandler = activityName => {
  // Returns a subclassed object using baseHandler as the base, with over-ridden properties to access the API for 'standard' types such as calories.
  const obj = baseHandler()   // create a base-class object

  obj.goal = goals[activityName]  // we could make this read-only

  Object.defineProperty(obj, 'adjusted', {
    get: function() {
      return today.adjusted[activityName]
    }
  })

  return obj
}

export const azmHandler = () => {
  // Returns a subclassed object using baseHandler as the base, with over-ridden properties to implement AZM's idiosyncracies.
  const obj = baseHandler()   // create a base-class object

  obj.goal = goals['activeZoneMinutes'].total  // we could make this read-only

  Object.defineProperty(obj, 'adjusted', {
    get: function() {
      return today.adjusted['activeZoneMinutes'].total
    }
  })

  return obj
}

export const hourlyStepsHandler = () => {
  // Returns a subclassed object using baseHandler as the base, with over-ridden properties to implement stepsThisHour idiosyncracies.
  const obj = baseHandler()   // create a base-class object

  obj.goal = 250  // we could make this read-only

  Object.defineProperty(obj, 'adjusted', {
    get: function() { // stepsThisHour()
      return 125    // usually not, actually
    }
  })

  return obj
}

// TODO 3 provide each instance with a <text> el