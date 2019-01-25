export function setRefreshToken(rToken) {
    return {
      type: 'setRefreshToken',
      payload: rToken
    }
  }

  export function setAccessToken(aToken) {
    return {
      type: 'setAccessToken',
      payload: aToken
    }
  }

  export function setSpaceOccupier(occupier) {
    return {
      type: 'setSpaceOccupier',
      payload: occupier
    }
  }

  export function setSchedule(schedule) {
    return {
      type: 'setSchedule',
      payload: schedule
    }
  }

  export function setAssignments(assignments) {
    return {
      type: 'setAssignments',
      payload: assignments
    }
  }

  export function setTests(tests) {
    return {
      type: 'setTests',
      payload: tests
    }
  }

  export function setCourses(courses) {
    return {
      type: 'setCourses',
      payload: courses
    }
  }