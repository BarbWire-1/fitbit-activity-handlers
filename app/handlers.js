import { goals, today } from 'user-activity'

export const handler = (activityName) =>{
  const obj = {}

  Object.defineProperty(obj, 'goal', {
    get: function() {
      return goals[activityName]
    }
  })

  Object.defineProperty(obj, 'adjusted', {
    get: function() {
      return today.adjusted[activityName]
    }
  })

  Object.defineProperty(obj, 'stats', {
    get: function() {
      const myAdjusted = obj.adjusted
      const myGoal = obj.goal
      let myProgress = myAdjusted / myGoal
      if (myProgress > 1) myProgress = 1
      return {adjusted:myAdjusted, goal:myGoal, progress:myProgress}
    }
  })

  return obj
}