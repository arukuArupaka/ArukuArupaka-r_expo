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
}

export default mapState;