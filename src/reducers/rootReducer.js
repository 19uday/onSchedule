import update from 'react-addons-update';

const initialState = {
    appUser:"",
    isloggedin: false,
    refreshToken: "",
    accessToken: "",
    spaceOccupier: 'calendar',
    schedule: [],
    assignments: [],
    tests: [],
}

const simpleReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'changeAppUser':
        return { ...state, appUser: action.payload}

        case 'loggedin':
        return { ...state, isloggedin: action.payload}

        case 'setRefreshToken':
        return { ...state, refreshToken: action.payload}

        case 'setAccessToken':
        return { ...state, accessToken: action.payload, isloggedin: true}

        case 'setSpaceOccupier':
        return { ...state, spaceOccupier: action.payload}

        case 'setSchedule':
        return { ...state, schedule: action.payload}

        case 'setAssignments':
        return { ...state, assignments: action.payload}

        case 'setTests':
        return { ...state, tests: action.payload}

        default:
        return state
      }
     }

export default simpleReducer;