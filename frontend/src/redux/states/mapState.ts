type mapUserObject = {
    isLocationShare:boolean,
    userName:string,
    userUUID:string,
    friends:Array<object>,
    mapShowFriends:Array<object>,
    locationSharingFriends:Array<object>,
    QRUUID:string
}

type mapState={
    mapUserObject:mapUserObject
    mapSearchWord:string,
    campusData:object
    campusBuildingData:object
}

export default mapState;